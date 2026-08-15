$token = '58EDFE43-67AA-41ED-95AE-E0E392D7311F'

# First, check what's cached
Write-Host "=== Checking cached items ==="
try {
    $cacheResp = Invoke-WebRequest -Uri "https://gcs.softguard.com/Cache?oauth_token=$token" -UseBasicParsing
    Write-Host "Cache Index Status: $($cacheResp.StatusCode)"
    Write-Host "Cache Index Length: $($cacheResp.Content.Length)"
    # Show first 500 chars
    Write-Host $cacheResp.Content.Substring(0, [Math]::Min(500, $cacheResp.Content.Length))
} catch {
    Write-Host "Cache Index Error: $($_.Exception.Message)"
}

Write-Host ""
Write-Host "=== Invalidating all cache ==="
try {
    $invResp = Invoke-WebRequest -Uri "https://gcs.softguard.com/Cache/InvalidateAll?oauth_token=$token" -UseBasicParsing
    Write-Host "InvalidateAll Status: $($invResp.StatusCode)"
    Write-Host "InvalidateAll Length: $($invResp.Content.Length)"
    Write-Host $invResp.Content.Substring(0, [Math]::Min(500, $invResp.Content.Length))
} catch {
    Write-Host "InvalidateAll Error: $($_.Exception.Message)"
}

Write-Host ""
Write-Host "=== Testing preview mode after invalidation ==="
$url = "https://gcs.softguard.com/handler/ComprobantePdfMG?preview=true&orgId=14&oauth_token=$token"
try {
    $resp = Invoke-WebRequest -Uri $url -UseBasicParsing
    Write-Host "Preview Status: $($resp.StatusCode)"
    Write-Host "Preview Length: $($resp.Content.Length)"
    if ($resp.Content.Contains('VISTA PREVIA')) {
        Write-Host "PREVIEW BANNER: FOUND!"
    } else {
        Write-Host "PREVIEW BANNER: NOT FOUND"
    }
    if ($resp.Content.Contains('CLIENTE EJEMPLO')) {
        Write-Host "DUMMY CLIENT: FOUND!"
    } else {
        Write-Host "DUMMY CLIENT: NOT FOUND"
    }
    if ($resp.Content.Contains('observaciones')) {
        Write-Host "observaciones reference: FOUND"
    } else {
        Write-Host "observaciones: NOT FOUND"
    }
    # Save output
    $resp.Content | Out-File "D:\projects\softguard\desktop\softguard.workspace\tools\gcs\preview-test-after-invalidation.html" -Encoding UTF8
    Write-Host "Output saved to preview-test-after-invalidation.html"
} catch {
    Write-Host "Preview Error: $($_.Exception.Message)"
}
