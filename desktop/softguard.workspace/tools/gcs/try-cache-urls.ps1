$token = '58EDFE43-67AA-41ED-95AE-E0E392D7311F'

$urls = @(
    "https://gcs.softguard.com/Cache/InvalidateAll?oauth_token=$token",
    "https://gcs.softguard.com/cache/invalidateall?oauth_token=$token",
    "https://gcs.softguard.com/api/Cache/InvalidateAll?oauth_token=$token",
    "https://gcs.softguard.com/Rest/Cache/InvalidateAll?oauth_token=$token",
    "https://gcs.softguard.com/UIApplication/Cache/InvalidateAll?oauth_token=$token"
)

foreach ($url in $urls) {
    try {
        $resp = Invoke-WebRequest -Uri $url -UseBasicParsing -ErrorAction Stop
        Write-Host "OK [$($resp.StatusCode)] $url"
        break
    } catch {
        $code = $_.Exception.Response.StatusCode
        Write-Host "FAIL [$code] $url"
    }
}

# Also try the Razor REST endpoint to see if we can update Version
Write-Host ""
Write-Host "=== Trying REST Razor endpoint ==="
try {
    $r = Invoke-WebRequest -Uri "https://gcs.softguard.com/Rest/Razor/8359?oauth_token=$token" -UseBasicParsing
    Write-Host "Razor REST: $($r.StatusCode) Len=$($r.Content.Length)"
    Write-Host $r.Content.Substring(0, [Math]::Min(200, $r.Content.Length))
} catch {
    Write-Host "Razor REST Error: $($_.Exception.Message)"
}
