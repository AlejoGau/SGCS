$token = '58EDFE43-67AA-41ED-95AE-E0E392D7311F'
$url = "https://gcs.softguard.com/handler/ComprobantePdfMG?preview=true&orgId=14&oauth_token=$token"

# Test preview mode
$resp = Invoke-WebRequest -Uri $url -UseBasicParsing
Write-Host "Status: $($resp.StatusCode)"
Write-Host "Length: $($resp.Content.Length)"

# Check for preview banner
if ($resp.Content -match 'VISTA PREVIA') {
    Write-Host "PREVIEW BANNER: FOUND"
} else {
    Write-Host "PREVIEW BANNER: NOT FOUND"
}

# Check for dummy client
if ($resp.Content -match 'CLIENTE EJEMPLO') {
    Write-Host "DUMMY CLIENT: FOUND"
} else {
    Write-Host "DUMMY CLIENT: NOT FOUND"
}

# Check for InterpolateTemplate function
if ($resp.Content -match 'InterpolateTemplate') {
    Write-Host "InterpolateTemplate reference: FOUND IN OUTPUT (compilation error?)"
} else {
    Write-Host "InterpolateTemplate: not in output (good)"
}

# Check for "isPreview" or "preview" in content
if ($resp.Content -match 'BuildInterpolation') {
    Write-Host "BuildInterpolation: FOUND IN OUTPUT (compilation error?)"
}

# Save to file for inspection
$resp.Content | Out-File "D:\projects\softguard\desktop\softguard.workspace\tools\gcs\preview-test-output.html" -Encoding UTF8
Write-Host "Output saved to preview-test-output.html"
Write-Host ""
Write-Host "First 500 chars:"
Write-Host $resp.Content.Substring(0, [Math]::Min(500, $resp.Content.Length))
