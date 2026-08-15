<#
.SYNOPSIS
    SoftGuard GCS UIApplication Manager - Manage remote Razor templates
.DESCRIPTION
    CLI tool for backup, restore, diff and publish of Razor templates
    hosted on gcs.softguard.com UIApplication2 system.
.EXAMPLE
    .\gcs-manager.ps1 list-apps
    .\gcs-manager.ps1 list-razors Administrator
    .\gcs-manager.ps1 backup Administrator
    .\gcs-manager.ps1 show AdministratorFormController
    .\gcs-manager.ps1 diff AdministratorFormController
    .\gcs-manager.ps1 publish AdministratorFormController    .\.\gcs-manager.ps1 publish .\backups\AdministratorSearch\Controller\MyRazor.js
    .\.\gcs-manager.ps1 publish-changed AdministratorSearch    .\gcs-manager.ps1 invalidate-cache Administrator
#>

param(
    [Parameter(Position=0)]
    [ValidateSet(
        'list-apps','list-razors','backup','backup-razor',
        'show','diff','edit','publish','publish-changed','invalidate-cache',
        'task-add','task-list','task-complete',
        'search','help'
    )]
    [string]$Command = 'help',

    [Parameter(Position=1)]
    [string]$Target,

    [Parameter(Position=2)]
    [string]$Arg2,

    [Parameter(Position=3)]
    [string]$Arg3,

    [switch]$Force,
    [switch]$Json
)

$ErrorActionPreference = 'Stop'

# -- Config ---------------------------------------------------------------
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ConfigPath = Join-Path $ScriptDir "gcs-config.json"

if (-not (Test-Path $ConfigPath)) {
    Write-Error "Config not found: $ConfigPath"
    return
}

$Config = Get-Content $ConfigPath -Raw | ConvertFrom-Json
$BaseUrl = $Config.baseUrl.TrimEnd('/')
$Token = $Config.token
$BackupDir = if ([System.IO.Path]::IsPathRooted($Config.backupDir)) { $Config.backupDir } else { Join-Path $ScriptDir $Config.backupDir }
$TasksDir = if ([System.IO.Path]::IsPathRooted($Config.tasksDir)) { $Config.tasksDir } else { Join-Path $ScriptDir $Config.tasksDir }

# -- API Helpers -----------------------------------------------------------
function Invoke-GcsApi {
    param(
        [string]$Endpoint,
        [string]$Method = 'GET',
        [object]$Body,
        [hashtable]$QueryParams = @{}
    )

    $sep = if ($Endpoint.Contains('?')) { '&' } else { '?' }
    $url = "$BaseUrl/$($Endpoint.TrimStart('/'))${sep}oauth_token=$Token"

    foreach ($k in $QueryParams.Keys) {
        $url += "&$k=$([System.Uri]::EscapeDataString($QueryParams[$k]))"
    }

    $params = @{
        Uri = $url
        Method = $Method
        ContentType = 'application/json; charset=utf-8'
        UseBasicParsing = $true
    }

    if ($Body) {
        $jsonBody = if ($Body -is [string]) { $Body } else { $Body | ConvertTo-Json -Depth 10 -Compress }
        $params.Body = [System.Text.Encoding]::UTF8.GetBytes($jsonBody)
    }

    $response = Invoke-RestMethod @params
    return $response
}

# -- App Cache -------------------------------------------------------------
$AppCachePath = Join-Path $ScriptDir ".app-cache.json"

function Get-AppList {
    param([switch]$Refresh)

    if (-not $Refresh -and (Test-Path $AppCachePath)) {
        $cache = Get-Content $AppCachePath -Raw | ConvertFrom-Json
        $age = (Get-Date) - [datetime]$cache.timestamp
        if ($age.TotalHours -lt 24) {
            return $cache.apps
        }
    }

    Write-Host "Fetching UIApplication list from GCS..." -ForegroundColor Cyan
    $result = Invoke-GcsApi "rest/search/UIApplicationByUserAccount" -QueryParams @{
        page = '1'; start = '0'; limit = '250'
    }

    $apps = $result.rows | Where-Object { $_.Name -and $_.Name -notmatch '^Nueva interfaz' }

    $cacheObj = @{
        timestamp = (Get-Date).ToString('o')
        apps = $apps
    }
    $cacheObj | ConvertTo-Json -Depth 3 | Set-Content $AppCachePath -Encoding UTF8

    return $apps
}

function Resolve-AppId {
    param([string]$NameOrId)

    $apps = Get-AppList
    $app = $apps | Where-Object { $_.Name -eq $NameOrId -or $_.Id -eq $NameOrId }
    if (-not $app) {
        Write-Error "App not found: '$NameOrId'. Use 'list-apps' to see available apps."
        return $null
    }
    return $app
}

# -- Razor Helpers ---------------------------------------------------------
function Get-AppRelations {
    param([string]$AppId)

    $result = Invoke-GcsApi "Rest/UiApplication/$AppId/relations" -QueryParams @{
        node = $AppId
        sort = '[{"property":"ObjectName","direction":"ASC"}]'
    }
    return $result
}

function Get-Razor {
    param([int]$RazorId)
    return Invoke-GcsApi "Rest/Razor/$RazorId"
}

function Get-RazorExtension {
    param([string]$RazorType, [string]$MimeType)
    switch ($RazorType) {
        'Controller' { return '.js' }
        'View'       { return '.js' }
        'Model'      { return '.js' }
        'Store'      { return '.js' }
        'Css'        { return '.css' }
        'Html'       { return '.html' }
        default {
            switch ($MimeType) {
                'application/javascript' { return '.js' }
                'text/css'               { return '.css' }
                'text/html'              { return '.html' }
                default                  { return '.txt' }
            }
        }
    }
}

function Get-BackupPath {
    param([string]$AppName, [string]$RazorType, [string]$RazorName, [string]$Extension)
    $typeDir = if ($RazorType) { $RazorType } else { '_other' }
    return (Join-Path (Join-Path (Join-Path $BackupDir $AppName) $typeDir) "$RazorName$Extension")
}

function Save-RazorToFile {
    param($Razor, [string]$AppName)

    $ext = Get-RazorExtension $Razor.RazorType $Razor.OutputMimeType
    $filePath = Get-BackupPath $AppName $Razor.RazorType $Razor.Name $ext

    $dir = Split-Path $filePath -Parent
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
    }

    $Razor.Razor | Set-Content -Path $filePath -Encoding UTF8 -NoNewline

    $meta = @{
        Id = $Razor.Id
        Name = $Razor.Name
        RazorType = $Razor.RazorType
        OutputMimeType = $Razor.OutputMimeType
        SmallComment = $Razor.SmallComment
        Version = $Razor.Version
        DateModified = $Razor.DateModified
        AppName = $AppName
        BackupDate = (Get-Date).ToString('o')
    }
    $metaPath = "$filePath.meta.json"
    $meta | ConvertTo-Json | Set-Content -Path $metaPath -Encoding UTF8

    return $filePath
}

# -- Index Management ------------------------------------------------------
function Save-AppIndex {
    param([string]$AppName, $Relations, $AppInfo)

    $indexDir = Join-Path $BackupDir $AppName
    if (-not (Test-Path $indexDir)) {
        New-Item -ItemType Directory -Path $indexDir -Force | Out-Null
    }

    $index = @{
        appId = $AppInfo.Id
        appName = $AppInfo.Name
        version = $AppInfo.Version
        backupDate = (Get-Date).ToString('o')
        razors = @($Relations | ForEach-Object {
            @{
                objectId = $_.ObjectId
                objectName = $_.ObjectName
                relationId = $_.RelationId
            }
        })
    }

    $indexPath = Join-Path $indexDir "_index.json"
    $index | ConvertTo-Json -Depth 3 | Set-Content $indexPath -Encoding UTF8
    return $index
}

# -- Commands --------------------------------------------------------------

function Cmd-ListApps {
    $apps = Get-AppList -Refresh:$Force

    if ($Json) {
        $apps | ConvertTo-Json -Depth 2
        return
    }

    Write-Host ""
    Write-Host "  UIApplications on GCS ($($apps.Count) apps)" -ForegroundColor Cyan
    Write-Host ""
    Write-Host ("  {0,-5} {1,-35} {2,-15} {3}" -f "ID", "Name", "Version", "Viewport") -ForegroundColor DarkGray
    Write-Host ("  {0,-5} {1,-35} {2,-15} {3}" -f "--", "----", "-------", "--------") -ForegroundColor DarkGray

    foreach ($app in $apps) {
        $color = if ($app.Name -eq 'Administrator' -or $app.Name -eq 'AdministratorSearch') { 'Yellow' } else { 'White' }
        Write-Host ("  {0,-5} {1,-35} {2,-15} {3}" -f $app.Id, $app.Name, $app.Version, $app.Viewport) -ForegroundColor $color
    }
    Write-Host ""
}

function Cmd-ListRazors {
    param([string]$AppName)

    if (-not $AppName) {
        Write-Error "Usage: gcs-manager.ps1 list-razors [AppName]"
        return
    }

    $app = Resolve-AppId $AppName
    if (-not $app) { return }

    $relations = Get-AppRelations $app.Id

    if ($Json) {
        $relations | ConvertTo-Json -Depth 2
        return
    }

    Write-Host ""
    Write-Host "  Razors for $($app.Name) (Id=$($app.Id)) -- $($relations.Count) items" -ForegroundColor Cyan
    Write-Host ""
    Write-Host ("  {0,-8} {1,-50} {2}" -f "ID", "Name", "Type") -ForegroundColor DarkGray
    Write-Host ("  {0,-8} {1,-50} {2}" -f "--", "----", "----") -ForegroundColor DarkGray

    foreach ($rel in $relations) {
        Write-Host ("  {0,-8} {1,-50} {2}" -f $rel.ObjectId, $rel.ObjectName, $rel.ObjectTypeName)
    }
    Write-Host ""
}

function Cmd-Backup {
    param([string]$AppName)

    if (-not $AppName) {
        Write-Error "Usage: gcs-manager.ps1 backup [AppName]"
        return
    }

    $app = Resolve-AppId $AppName
    if (-not $app) { return }

    $relations = Get-AppRelations $app.Id
    $total = $relations.Count
    $saved = 0
    $errors = 0

    Write-Host ""
    Write-Host "  Backing up $($app.Name) ($total razors)..." -ForegroundColor Cyan

    Save-AppIndex $app.Name $relations $app | Out-Null

    foreach ($rel in $relations) {
        $saved++
        $pct = [math]::Round(($saved / $total) * 100)
        Write-Progress -Activity "Backing up $($app.Name)" -Status "$saved/$total - $($rel.ObjectName)" -PercentComplete $pct

        try {
            $razor = Get-Razor $rel.ObjectId
            $filePath = Save-RazorToFile $razor $app.Name
            Write-Host "  [$saved/$total] $($razor.RazorType)/$($razor.Name)" -ForegroundColor DarkGray
        } catch {
            $errors++
            Write-Host "  [$saved/$total] ERROR: $($rel.ObjectName) - $($_.Exception.Message)" -ForegroundColor Red
        }
    }

    Write-Progress -Activity "Backing up $($app.Name)" -Completed

    Write-Host ""
    Write-Host "  Backup complete: $($saved - $errors) saved, $errors errors" -ForegroundColor Green
    Write-Host "  Location: $(Join-Path $BackupDir $app.Name)" -ForegroundColor DarkGray
    Write-Host ""
}

function Cmd-BackupRazor {
    param([string]$RazorName, [string]$AppName)

    if (-not $RazorName) {
        Write-Error "Usage: gcs-manager.ps1 backup-razor [RazorName] [AppName]"
        return
    }

    if (-not $AppName) {
        $hit = Find-RazorByName $RazorName
        if (-not $hit) { return }
        $AppName = $hit.AppName
        $razorId = $hit.ObjectId
    } else {
        $app = Resolve-AppId $AppName
        if (-not $app) { return }
        $relations = Get-AppRelations $app.Id
        $rel = $relations | Where-Object { $_.ObjectName -eq $RazorName }
        if (-not $rel) {
            Write-Error "Razor '$RazorName' not found in $AppName"
            return
        }
        $razorId = $rel.ObjectId
        $AppName = $app.Name
    }

    $razor = Get-Razor $razorId
    $filePath = Save-RazorToFile $razor $AppName
    Write-Host "  Saved: $filePath" -ForegroundColor Green
}

function Cmd-Show {
    param([string]$RazorName)

    if (-not $RazorName) {
        Write-Error "Usage: gcs-manager.ps1 show [RazorName|RazorId]"
        return
    }

    if ($RazorName -match '^\d+$') {
        $razor = Get-Razor ([int]$RazorName)
    } else {
        $hit = Find-RazorByName $RazorName
        if (-not $hit) { return }
        $razor = Get-Razor $hit.ObjectId
    }

    if ($Json) {
        $razor | Select-Object Id, Name, RazorType, OutputMimeType, SmallComment, Version, DateModified | ConvertTo-Json
        return
    }

    Write-Host ""
    Write-Host "  Razor: $($razor.Name) (Id=$($razor.Id))" -ForegroundColor Cyan
    Write-Host "  Type: $($razor.RazorType) | Mime: $($razor.OutputMimeType)" -ForegroundColor DarkGray
    Write-Host "  ----------------------------------------" -ForegroundColor DarkGray
    Write-Host $razor.Razor
}

function Cmd-Diff {
    param([string]$RazorName, [string]$AppName)

    if (-not $RazorName) {
        Write-Error "Usage: gcs-manager.ps1 diff [RazorName] [AppName]"
        return
    }

    $localFile = Find-LocalRazor $RazorName $AppName
    if (-not $localFile) {
        Write-Error "No local backup found for '$RazorName'. Run 'backup' first."
        return
    }

    $meta = Get-Content "$localFile.meta.json" -Raw | ConvertFrom-Json
    $razor = Get-Razor $meta.Id

    $localContent = [System.IO.File]::ReadAllText($localFile, [System.Text.Encoding]::UTF8)
    $remoteContent = $razor.Razor

    if ($localContent -eq $remoteContent) {
        Write-Host "  No differences: $RazorName" -ForegroundColor Green
        return
    }

    $tmpLocal = [System.IO.Path]::GetTempFileName()
    $tmpRemote = [System.IO.Path]::GetTempFileName()
    $localContent | Set-Content $tmpLocal -Encoding UTF8 -NoNewline
    $remoteContent | Set-Content $tmpRemote -Encoding UTF8 -NoNewline

    Write-Host ""
    Write-Host "  Differences in $RazorName (local vs remote):" -ForegroundColor Yellow
    Write-Host ""

    if (Get-Command code -ErrorAction SilentlyContinue) {
        & code --diff $tmpLocal $tmpRemote --wait
    } else {
        & fc.exe $tmpLocal $tmpRemote
    }

    Remove-Item $tmpLocal, $tmpRemote -ErrorAction SilentlyContinue
}

function Publish-RazorFile {
    param([string]$FilePath)

    $metaPath = "$FilePath.meta.json"
    if (-not (Test-Path $metaPath)) {
        Write-Host "  No meta.json found for: $FilePath" -ForegroundColor Red
        return $false
    }

    $meta = Get-Content $metaPath -Raw | ConvertFrom-Json
    $localContent = [System.IO.File]::ReadAllText($FilePath, [System.Text.Encoding]::UTF8)

    $remote = Get-Razor $meta.Id
    if ($localContent -eq $remote.Razor) {
        Write-Host "  No changes: $($meta.Name)" -ForegroundColor DarkGray
        return $false
    }

    if (-not $Force) {
        Write-Host ""
        Write-Host "  About to publish changes to: $($meta.Name) (Id=$($meta.Id))" -ForegroundColor Yellow
        Write-Host "  App: $($meta.AppName)" -ForegroundColor DarkGray
        $confirm = Read-Host "  Confirm? (y/N)"
        if ($confirm -ne 'y' -and $confirm -ne 'Y') {
            Write-Host "  Cancelled." -ForegroundColor Red
            return $false
        }
    }

    # Pre-publish backup of remote version
    $preBackupDir = Join-Path (Join-Path $BackupDir $meta.AppName) "_pre_publish"
    if (-not (Test-Path $preBackupDir)) {
        New-Item -ItemType Directory -Path $preBackupDir -Force | Out-Null
    }
    $timestamp = (Get-Date).ToString('yyyyMMdd_HHmmss')
    $preBackupFile = Join-Path $preBackupDir "$($meta.Name)_$timestamp.bak"
    $remote.Razor | Set-Content $preBackupFile -Encoding UTF8 -NoNewline
    Write-Host "  Pre-publish backup: $preBackupFile" -ForegroundColor DarkGray

    $body = @{
        Id = $meta.Id
        Name = $meta.Name
        Razor = $localContent
        RazorType = $meta.RazorType
        OutputMimeType = $meta.OutputMimeType
        SmallComment = $meta.SmallComment
        Version = $meta.Version
    }

    try {
        $result = Invoke-GcsApi "Rest/Razor/$($meta.Id)" -Method PUT -Body $body
        Write-Host "  Published: $($meta.Name) (Id=$($meta.Id))" -ForegroundColor Green

        $meta.DateModified = (Get-Date).ToString('o')
        $meta.BackupDate = (Get-Date).ToString('o')
        $meta | ConvertTo-Json | Set-Content $metaPath -Encoding UTF8
        return $true
    } catch {
        Write-Host "  PUBLISH FAILED: $($_.Exception.Message)" -ForegroundColor Red
        Write-Host "  Pre-publish backup available at: $preBackupFile" -ForegroundColor Yellow
        return $false
    }
}

function Cmd-Publish {
    param([string]$RazorName, [string]$AppName)

    if (-not $RazorName) {
        Write-Error "Usage: gcs-manager.ps1 publish [RazorName|FilePath] [AppName]"
        return
    }

    # If Target is a file path, publish directly from it
    if (Test-Path $RazorName) {
        $resolvedPath = (Resolve-Path $RazorName).Path
        if ($resolvedPath -match '\.meta\.json$') {
            $resolvedPath = $resolvedPath -replace '\.meta\.json$', ''
        }
        Publish-RazorFile $resolvedPath
        return
    }

    $localFile = Find-LocalRazor $RazorName $AppName
    if (-not $localFile) {
        Write-Error "No local backup found for '$RazorName'. Run 'backup' first."
        return
    }

    Publish-RazorFile $localFile
}

function Cmd-PublishChanged {
    param([string]$AppName)

    if (-not (Test-Path $BackupDir)) {
        Write-Error "No backups found. Run 'backup [AppName]' first."
        return
    }

    $searchBase = if ($AppName) { Join-Path $BackupDir $AppName } else { $BackupDir }
    if (-not (Test-Path $searchBase)) {
        Write-Error "No backups found for '$AppName'."
        return
    }

    Write-Host ""
    Write-Host "  Scanning for changes..." -ForegroundColor Cyan

    $files = Get-ChildItem -Path $searchBase -Recurse -File | Where-Object {
        $_.Extension -in '.js','.css','.html' -and
        $_.Name -notmatch '\.meta\.json$' -and
        $_.Directory.Name -ne '_pre_publish'
    }

    $changed = @()
    $checked = 0
    $total = $files.Count

    foreach ($file in $files) {
        $checked++
        $metaPath = "$($file.FullName).meta.json"
        if (-not (Test-Path $metaPath)) { continue }

        $meta = Get-Content $metaPath -Raw | ConvertFrom-Json
        $localContent = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)

        Write-Progress -Activity "Checking razors" -Status "$checked/$total - $($meta.Name)" -PercentComplete (($checked / $total) * 100)

        try {
            $remote = Get-Razor $meta.Id
            if ($localContent -ne $remote.Razor) {
                $changed += [PSCustomObject]@{
                    File = $file.FullName
                    Name = $meta.Name
                    App = $meta.AppName
                    Id = $meta.Id
                }
            }
        } catch {
            Write-Host "  Error checking $($meta.Name): $($_.Exception.Message)" -ForegroundColor Red
        }
    }

    Write-Progress -Activity "Checking razors" -Completed

    if ($changed.Count -eq 0) {
        Write-Host "  No changes found." -ForegroundColor Green
        Write-Host ""
        return
    }

    Write-Host ""
    Write-Host "  $($changed.Count) razor(s) with local changes:" -ForegroundColor Yellow
    Write-Host ""
    for ($i = 0; $i -lt $changed.Count; $i++) {
        Write-Host "    [$i] $($changed[$i].App)/$($changed[$i].Name) (Id=$($changed[$i].Id))" -ForegroundColor White
    }
    Write-Host ""

    if (-not $Force) {
        $confirm = Read-Host "  Publish all? (y/N)"
        if ($confirm -ne 'y' -and $confirm -ne 'Y') {
            Write-Host "  Cancelled." -ForegroundColor Red
            return
        }
    }

    $published = 0
    $errors = 0
    foreach ($item in $changed) {
        $result = Publish-RazorFile $item.File
        if ($result) { $published++ } else { $errors++ }
    }

    Write-Host ""
    Write-Host "  Done: $published published, $errors failed" -ForegroundColor $(if ($errors -gt 0) { 'Yellow' } else { 'Green' })
    Write-Host ""
}

function Cmd-InvalidateCache {
    param([string]$AppName)

    if (-not $AppName) {
        Write-Error "Usage: gcs-manager.ps1 invalidate-cache [AppName]"
        return
    }

    $app = Resolve-AppId $AppName
    if (-not $app) { return }

    $currentVersion = $app.Version
    $parts = $currentVersion.Trim() -split '\.'
    if ($parts.Count -ge 3) {
        $parts[-1] = [string]([int]$parts[-1] + 1)
        $newVersion = $parts -join '.'
    } else {
        $newVersion = "$($currentVersion.Trim()).1"
    }

    $body = @{
        Id = [int]$app.Id
        Name = $app.Name
        Description = $app.Description
        Icon = $app.Icon
        MenuName = $app.MenuName
        RazorTemplateId = [int]$app.RazorTemplateId
        SmallComment = $app.SmallComment
        Version = $newVersion
        Viewport = $app.Viewport
    }

    if (-not $Force) {
        Write-Host ""
        Write-Host "  Invalidate cache for: $($app.Name)" -ForegroundColor Yellow
        Write-Host "  Version: $currentVersion -> $newVersion" -ForegroundColor DarkGray
        $confirm = Read-Host "  Confirm? (y/N)"
        if ($confirm -ne 'y' -and $confirm -ne 'Y') {
            Write-Host "  Cancelled." -ForegroundColor Red
            return
        }
    }

    try {
        $result = Invoke-GcsApi "Rest/UiApplication/$($app.Id)" -Method PUT -Body $body
        Write-Host "  Cache invalidated: $($app.Name) v$currentVersion -> v$newVersion" -ForegroundColor Green
        Get-AppList -Refresh | Out-Null
    } catch {
        Write-Host "  FAILED: $($_.Exception.Message)" -ForegroundColor Red
    }
}

function Cmd-Search {
    param([string]$Query)

    if (-not $Query) {
        Write-Error "Usage: gcs-manager.ps1 search [query]"
        return
    }

    Write-Host ""
    Write-Host "  Searching local backups for '$Query'..." -ForegroundColor Cyan
    Write-Host ""

    if (-not (Test-Path $BackupDir)) {
        Write-Error "No backups found. Run 'backup [AppName]' first."
        return
    }

    $files = Get-ChildItem -Path $BackupDir -Recurse -Include *.js,*.css,*.html -File
    $matchResults = @()

    foreach ($file in $files) {
        if ($file.Name -match '\.meta\.json$') { continue }
        $content = Get-Content $file -Raw -ErrorAction SilentlyContinue
        if ($content -and $content -match [regex]::Escape($Query)) {
            $lineMatches = (Get-Content $file | Select-String -Pattern ([regex]::Escape($Query)) -SimpleMatch)
            foreach ($m in $lineMatches) {
                $trimmed = $m.Line.Trim()
                $display = $trimmed.Substring(0, [Math]::Min(100, $trimmed.Length))
                $matchResults += [PSCustomObject]@{
                    File = $file.FullName.Replace($BackupDir, '').TrimStart('\')
                    Line = $m.LineNumber
                    Text = $display
                }
            }
        }
    }

    if ($matchResults.Count -eq 0) {
        Write-Host "  No matches found." -ForegroundColor Yellow
        return
    }

    Write-Host "  $($matchResults.Count) match(es) found:" -ForegroundColor Green
    Write-Host ""
    foreach ($m in $matchResults) {
        Write-Host "  $($m.File):$($m.Line)" -ForegroundColor White
        Write-Host "    $($m.Text)" -ForegroundColor DarkGray
    }
    Write-Host ""
}

# -- Task Tracking ---------------------------------------------------------

function Cmd-TaskAdd {
    param([string]$Description, [string]$AppName)

    if (-not $Description) {
        Write-Error "Usage: gcs-manager.ps1 task-add [description] [AppName]"
        return
    }

    if (-not (Test-Path $TasksDir)) {
        New-Item -ItemType Directory -Path $TasksDir -Force | Out-Null
    }

    $existingTasks = Get-ChildItem -Path $TasksDir -Filter "task-*.json" -ErrorAction SilentlyContinue
    $nextId = if ($existingTasks) {
        $maxId = ($existingTasks.Name | ForEach-Object { if ($_ -match 'task-(\d+)\.json') { [int]$Matches[1] } } | Measure-Object -Maximum).Maximum
        $maxId + 1
    } else { 1 }

    $task = @{
        id = $nextId
        description = $Description
        app = if ($AppName) { $AppName } else { "" }
        status = "pending"
        razorsModified = @()
        createdAt = (Get-Date).ToString('o')
        completedAt = $null
        notes = ""
    }

    $taskFile = Join-Path $TasksDir "task-$($nextId.ToString('000')).json"
    $task | ConvertTo-Json -Depth 3 | Set-Content $taskFile -Encoding UTF8

    Write-Host "  Task #$nextId created: $Description" -ForegroundColor Green
}

function Cmd-TaskList {
    if (-not (Test-Path $TasksDir)) {
        Write-Host ""
        Write-Host "  No tasks found." -ForegroundColor Yellow
        Write-Host ""
        return
    }

    $taskFiles = Get-ChildItem -Path $TasksDir -Filter "task-*.json" | Sort-Object Name
    if ($taskFiles.Count -eq 0) {
        Write-Host ""
        Write-Host "  No tasks found." -ForegroundColor Yellow
        Write-Host ""
        return
    }

    Write-Host ""
    Write-Host "  Tasks ($($taskFiles.Count)):" -ForegroundColor Cyan
    Write-Host ""

    foreach ($tf in $taskFiles) {
        $t = Get-Content $tf.FullName -Raw | ConvertFrom-Json
        $icon = switch ($t.status) {
            'pending'     { '[  ]' }
            'in-progress' { '[>>]' }
            'completed'   { '[OK]' }
            default       { '[??]' }
        }
        $color = switch ($t.status) {
            'pending'     { 'White' }
            'in-progress' { 'Yellow' }
            'completed'   { 'Green' }
            default       { 'DarkGray' }
        }

        $appLabel = if ($t.app) { " ($($t.app))" } else { "" }
        $razorCount = if ($t.razorsModified.Count -gt 0) { " [$($t.razorsModified.Count) razors]" } else { "" }
        Write-Host "  $icon #$($t.id) $($t.description)$appLabel$razorCount" -ForegroundColor $color
    }
    Write-Host ""
}

function Cmd-TaskComplete {
    param([string]$TaskId)

    if (-not $TaskId) {
        Write-Error "Usage: gcs-manager.ps1 task-complete [taskId]"
        return
    }

    $taskFile = Join-Path $TasksDir "task-$($TaskId.PadLeft(3,'0')).json"
    if (-not (Test-Path $taskFile)) {
        Write-Error "Task #$TaskId not found"
        return
    }

    $task = Get-Content $taskFile -Raw | ConvertFrom-Json
    $task.status = "completed"
    $task.completedAt = (Get-Date).ToString('o')
    $task | ConvertTo-Json -Depth 3 | Set-Content $taskFile -Encoding UTF8

    Write-Host "  Task #$TaskId completed: $($task.description)" -ForegroundColor Green
}

# -- Utilities -------------------------------------------------------------

function Find-RazorByName {
    param([string]$Name)

    $indexFiles = Get-ChildItem -Path $BackupDir -Recurse -Filter "_index.json" -ErrorAction SilentlyContinue
    foreach ($indexFile in $indexFiles) {
        $index = Get-Content $indexFile.FullName -Raw | ConvertFrom-Json
        $found = $index.razors | Where-Object { $_.objectName -eq $Name }
        if ($found) {
            return [PSCustomObject]@{
                ObjectId = $found.objectId
                ObjectName = $found.objectName
                AppName = $index.appName
                AppId = $index.appId
            }
        }
    }

    Write-Host "  Searching GCS for '$Name'..." -ForegroundColor DarkGray
    $apps = Get-AppList
    foreach ($a in $apps) {
        try {
            $relations = Get-AppRelations $a.Id
            $found = $relations | Where-Object { $_.ObjectName -eq $Name }
            if ($found) {
                return [PSCustomObject]@{
                    ObjectId = $found.ObjectId
                    ObjectName = $found.ObjectName
                    AppName = $a.Name
                    AppId = $a.Id
                }
            }
        } catch { continue }
    }

    Write-Error "Razor '$Name' not found in any app"
    return $null
}

function Find-LocalRazor {
    param([string]$Name, [string]$AppName)

    $searchBase = if ($AppName) { Join-Path $BackupDir $AppName } else { $BackupDir }
    if (-not (Test-Path $searchBase)) { return $null }

    $files = Get-ChildItem -Path $searchBase -Recurse -File | Where-Object {
        $_.BaseName -eq $Name -and $_.Extension -ne '.json'
    }

    if ($files.Count -eq 0) { return $null }
    if ($files.Count -eq 1) { return $files[0].FullName }

    Write-Host "  Multiple matches:" -ForegroundColor Yellow
    for ($i = 0; $i -lt $files.Count; $i++) {
        Write-Host "    [$i] $($files[$i].FullName.Replace($BackupDir, ''))" -ForegroundColor White
    }
    $choice = Read-Host "  Select (0-$($files.Count - 1))"
    return $files[[int]$choice].FullName
}

function Cmd-Edit {
    param([string]$RazorName, [string]$AppName)

    if (-not $RazorName) {
        Write-Error "Usage: gcs-manager.ps1 edit [RazorName] [AppName]"
        return
    }

    $localFile = Find-LocalRazor $RazorName $AppName
    if (-not $localFile) {
        Write-Host "  No local copy. Downloading from GCS..." -ForegroundColor Yellow
        Cmd-BackupRazor $RazorName $AppName
        $localFile = Find-LocalRazor $RazorName $AppName
    }

    if ($localFile -and (Get-Command code -ErrorAction SilentlyContinue)) {
        & code $localFile
        Write-Host "  Opened in VS Code: $localFile" -ForegroundColor Green
    } elseif ($localFile) {
        Write-Host "  File: $localFile" -ForegroundColor Green
    }
}

# -- Help ------------------------------------------------------------------

function Cmd-Help {
    $helpText = @'

  GCS UIApplication Manager
  =========================

  BROWSE
    list-apps                     List all UIApplications
    list-razors [App]             List Razor templates in an app
    show [RazorName|Id]           Display Razor content
    search [query]                Search text in local backups

  BACKUP / RESTORE
    backup [App]                  Download all Razors for an app
    backup-razor [Name] [App]     Download a single Razor

  EDIT / PUBLISH
    edit [Name] [App]             Open Razor in VS Code (downloads if needed)
    diff [Name] [App]             Compare local vs remote
    publish [Name|Path] [App]     Upload local changes to GCS
    publish-changed [App]         Find & publish all modified razors
    invalidate-cache [App]        Bump app version to clear cache

  TASKS
    task-add [desc] [App]         Create a new task
    task-list                     List all tasks
    task-complete [id]            Mark task as done

  OPTIONS
    -Force                        Skip confirmation prompts
    -Json                         Output as JSON

  EXAMPLES
    .\gcs-manager.ps1 backup Administrator
    .\gcs-manager.ps1 edit AdministratorFormController Administrator
    .\gcs-manager.ps1 publish AdministratorFormController
    .\gcs-manager.ps1 invalidate-cache Administrator

'@
    Write-Host $helpText -ForegroundColor White
}

# -- Main Router -----------------------------------------------------------
switch ($Command) {
    'list-apps'         { Cmd-ListApps }
    'list-razors'       { Cmd-ListRazors $Target }
    'backup'            { Cmd-Backup $Target }
    'backup-razor'      { Cmd-BackupRazor $Target $Arg2 }
    'show'              { Cmd-Show $Target }
    'diff'              { Cmd-Diff $Target $Arg2 }
    'edit'              { Cmd-Edit $Target $Arg2 }
    'publish'           { Cmd-Publish $Target $Arg2 }
    'publish-changed'   { Cmd-PublishChanged $Target }
    'invalidate-cache'  { Cmd-InvalidateCache $Target }
    'search'            { Cmd-Search $Target }
    'task-add'          { Cmd-TaskAdd $Target $Arg2 }
    'task-list'         { Cmd-TaskList }
    'task-complete'     { Cmd-TaskComplete $Target }
    'help'              { Cmd-Help }
    default             { Cmd-Help }
}
