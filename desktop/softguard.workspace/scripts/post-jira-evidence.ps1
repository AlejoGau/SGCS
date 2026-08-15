param(
    [Parameter(Mandatory = $true)]
    [string]$PlanFile,

    [string]$BaseUrl = 'https://softguard.atlassian.net',

    [string]$CredentialsScript = (Join-Path $PSScriptRoot 'check-worklog-totals.ps1'),

    [string]$OutputFile,

    [switch]$SkipComments,
    [switch]$SkipAttachments,
    [switch]$ForceComment,
    [switch]$ContinueOnError,
    [switch]$DryRun
)

$ErrorActionPreference = 'Stop'
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

function Get-JiraCredentials {
    param(
        [string]$CredentialsScriptPath
    )

    if ($env:JIRA_EMAIL -and $env:JIRA_TOKEN) {
        return @{
            Email  = $env:JIRA_EMAIL
            Token  = $env:JIRA_TOKEN
            Source = 'environment'
        }
    }

    if (-not (Test-Path $CredentialsScriptPath)) {
        throw "Credentials script not found: $CredentialsScriptPath"
    }

    $raw = Get-Content $CredentialsScriptPath -Raw
    $email = [regex]::Match($raw, '\$email = "([^"]+)"').Groups[1].Value
    $token = [regex]::Match($raw, '\$token = "([^"]+)"').Groups[1].Value

    if (-not $email -or -not $token) {
        throw "Could not extract Jira credentials from: $CredentialsScriptPath"
    }

    return @{
        Email  = $email
        Token  = $token
        Source = $CredentialsScriptPath
    }
}

function New-JiraHeaders {
    param(
        [string]$Email,
        [string]$Token,
        [string]$ContentType = 'application/json; charset=utf-8'
    )

    $pair = "${Email}:${Token}"
    $b64 = [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes($pair))

    return @{
        Authorization = "Basic $b64"
        Accept        = 'application/json'
        'Content-Type' = $ContentType
    }
}

function Resolve-RelativePath {
    param(
        [string]$BaseDirectory,
        [string]$PathValue
    )

    if (-not $PathValue) {
        return $null
    }

    if ([System.IO.Path]::IsPathRooted($PathValue)) {
        return (Resolve-Path $PathValue).Path
    }

    return (Resolve-Path (Join-Path $BaseDirectory $PathValue)).Path
}

function Invoke-JiraJson {
    param(
        [string]$Uri,
        [string]$Method = 'GET',
        [hashtable]$Headers,
        [object]$BodyObject
    )

    if ($PSBoundParameters.ContainsKey('BodyObject')) {
        $json = $BodyObject | ConvertTo-Json -Depth 30 -Compress
        if ($script:DryRun -and $Method -ne 'GET') {
            return [pscustomobject]@{
                dryRun = $true
                uri    = $Uri
                method = $Method
                body   = $json
            }
        }

        $bytes = [System.Text.Encoding]::UTF8.GetBytes($json)
        return Invoke-RestMethod -Uri $Uri -Headers $Headers -Method $Method -Body $bytes
    }

    return Invoke-RestMethod -Uri $Uri -Headers $Headers -Method $Method
}

function Resolve-IssueId {
    param(
        [pscustomobject]$Item,
        [hashtable]$Headers,
        [string]$JiraBaseUrl
    )

    if ($Item.IssueId) {
        return [string]$Item.IssueId
    }

    if (-not $Item.IssueKey) {
        throw 'Each plan item must contain IssueId or IssueKey'
    }

    $search = Invoke-JiraJson -Uri "$JiraBaseUrl/rest/api/3/search/jql" -Method 'POST' -Headers $Headers -BodyObject @{
        jql        = "key = $($Item.IssueKey)"
        fields     = @('summary')
        maxResults = 1
    }

    if (-not $search.issues -or $search.issues.Count -eq 0) {
        throw "Issue not found by key: $($Item.IssueKey)"
    }

    return [string]$search.issues[0].id
}

function Get-ExistingMarkerComment {
    param(
        [string]$IssueId,
        [string]$MarkerText,
        [hashtable]$Headers,
        [string]$JiraBaseUrl
    )

    if (-not $MarkerText) {
        return $null
    }

    $response = Invoke-JiraJson -Uri "$JiraBaseUrl/rest/api/2/issue/$IssueId/comment?maxResults=100" -Headers $Headers
    foreach ($comment in @($response.comments)) {
        if (($comment.body -is [string]) -and $comment.body.Contains($MarkerText)) {
            return $comment
        }
    }

    return $null
}

function Get-CommentText {
    param(
        [pscustomobject]$Item,
        [string]$PlanDirectory
    )

    if ($Item.CommentText) {
        return [string]$Item.CommentText
    }

    if (-not $Item.CommentFile) {
        throw 'Plan item is missing CommentText or CommentFile'
    }

    $commentPath = Resolve-RelativePath -BaseDirectory $PlanDirectory -PathValue $Item.CommentFile
    return Get-Content $commentPath -Raw
}

function Add-PlainComment {
    param(
        [string]$IssueId,
        [string]$CommentText,
        [hashtable]$Headers,
        [string]$JiraBaseUrl
    )

    return Invoke-JiraJson -Uri "$JiraBaseUrl/rest/api/2/issue/$IssueId/comment" -Method 'POST' -Headers $Headers -BodyObject @{
        body = $CommentText
    }
}

function Add-Attachments {
    param(
        [string]$IssueId,
        [string[]]$AttachmentPaths,
        [hashtable]$Credentials,
        [string]$JiraBaseUrl,
        [string]$PlanDirectory
    )

    $results = @()

    foreach ($attachmentPath in $AttachmentPaths) {
        $resolvedPath = Resolve-RelativePath -BaseDirectory $PlanDirectory -PathValue $attachmentPath
        if (-not (Test-Path $resolvedPath)) {
            throw "Attachment file not found: $resolvedPath"
        }

        if ($script:DryRun) {
            $results += [pscustomobject]@{
                File       = [System.IO.Path]::GetFileName($resolvedPath)
                Status     = 'dry-run'
                HttpStatus = 0
                Content    = ''
                Error      = ''
            }
            continue
        }

        $tempFile = [System.IO.Path]::GetTempFileName()
        try {
            $httpCode = & curl.exe -sS -o $tempFile -w '%{http_code}' -u "$($Credentials.Email):$($Credentials.Token)" -H 'X-Atlassian-Token: no-check' -H 'Accept: application/json' -F "file=@$resolvedPath" "$JiraBaseUrl/rest/api/2/issue/$IssueId/attachments"
            $body = Get-Content $tempFile -Raw

            if ([int]$httpCode -ge 400) {
                throw "HTTP $httpCode :: $body"
            }

            $parsed = @()
            if ($body) {
                $parsed = @($body | ConvertFrom-Json)
            }

            if ($parsed.Count -eq 0) {
                $results += [pscustomobject]@{
                    File       = [System.IO.Path]::GetFileName($resolvedPath)
                    Status     = 'uploaded'
                    HttpStatus = [int]$httpCode
                    Content    = ''
                    Error      = ''
                }
                continue
            }

            foreach ($item in $parsed) {
                $results += [pscustomobject]@{
                    File       = $item.filename
                    Status     = 'uploaded'
                    HttpStatus = [int]$httpCode
                    Content    = $item.content
                    Error      = ''
                }
            }
        }
        finally {
            Remove-Item $tempFile -Force -ErrorAction SilentlyContinue
        }
    }

    return $results
}

$resolvedPlanPath = (Resolve-Path $PlanFile).Path
$planDirectory = Split-Path $resolvedPlanPath -Parent
$planRaw = Get-Content $resolvedPlanPath -Raw | ConvertFrom-Json
$plan = if ($planRaw -is [System.Array]) { $planRaw } else { @($planRaw) }
$credentials = Get-JiraCredentials -CredentialsScriptPath $CredentialsScript
$headers = New-JiraHeaders -Email $credentials.Email -Token $credentials.Token

if (-not $OutputFile) {
    $OutputFile = Join-Path $planDirectory 'jira-upload-results.json'
}

$results = @()

foreach ($item in $plan) {
    try {
        $issueId = Resolve-IssueId -Item $item -Headers $headers -JiraBaseUrl $BaseUrl
        $issueRef = if ($item.IssueKey) { [string]$item.IssueKey } else { $issueId }
        $existingComment = $null

        if (-not $ForceComment -and $item.MarkerText) {
            $existingComment = Get-ExistingMarkerComment -IssueId $issueId -MarkerText ([string]$item.MarkerText) -Headers $headers -JiraBaseUrl $BaseUrl
        }

        $commentStatus = 'skipped'
        $commentId = ''
        $attachmentStatus = 'skipped'
        $attachmentCount = 0
        $attachmentError = ''

        if ($existingComment) {
            $commentStatus = 'existing'
            $commentId = [string]$existingComment.id
        }
        elseif ($SkipComments -or $item.SkipComment) {
            $commentStatus = 'skipped'
        }
        else {
            $commentText = Get-CommentText -Item $item -PlanDirectory $planDirectory
            $commentResponse = Add-PlainComment -IssueId $issueId -CommentText $commentText -Headers $headers -JiraBaseUrl $BaseUrl
            $commentStatus = if ($DryRun) { 'dry-run' } else { 'created' }
            $commentId = if ($commentResponse.id) { [string]$commentResponse.id } else { '' }
        }

        $itemAttachments = @($item.Attachments)
        $shouldSkipAttachments = $SkipAttachments -or $item.SkipAttachments -or $itemAttachments.Count -eq 0
        if ($shouldSkipAttachments) {
            $attachmentStatus = if ($itemAttachments.Count -eq 0) { 'none' } else { 'skipped' }
        }
        else {
            try {
                $attachmentResults = Add-Attachments -IssueId $issueId -AttachmentPaths $itemAttachments -Credentials $credentials -JiraBaseUrl $BaseUrl -PlanDirectory $planDirectory
                $attachmentStatus = if ($DryRun) { 'dry-run' } else { 'uploaded' }
                $attachmentCount = @($attachmentResults).Count
            }
            catch {
                $attachmentStatus = 'error'
                $attachmentError = $_.Exception.Message
                if (-not $ContinueOnError) {
                    throw
                }
            }
        }

        $results += [pscustomobject]@{
            IssueKey         = $issueRef
            IssueId          = $issueId
            CommentStatus    = $commentStatus
            CommentId        = $commentId
            AttachmentStatus = $attachmentStatus
            AttachmentCount  = $attachmentCount
            AttachmentError  = $attachmentError
        }
    }
    catch {
        $results += [pscustomobject]@{
            IssueKey         = if ($item.IssueKey) { [string]$item.IssueKey } else { '' }
            IssueId          = if ($item.IssueId) { [string]$item.IssueId } else { '' }
            CommentStatus    = 'error'
            CommentId        = ''
            AttachmentStatus = 'error'
            AttachmentCount  = 0
            AttachmentError  = $_.Exception.Message
        }

        if (-not $ContinueOnError) {
            break
        }
    }
}

$results | ConvertTo-Json -Depth 10 | Set-Content -Path $OutputFile -Encoding UTF8
$results | Format-Table -AutoSize
Write-Host ('Saved Jira evidence summary to ' + $OutputFile)
