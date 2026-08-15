$token = '58EDFE43-67AA-41ED-95AE-E0E392D7311F'

# Get current Razor via REST
Write-Host "=== Getting current Razor via REST ==="
$getResp = Invoke-RestMethod -Uri "https://gcs.softguard.com/Rest/Razor/8359?oauth_token=$token" -Method GET
Write-Host "Id: $($getResp.Id)"
Write-Host "Name: $($getResp.Name)"
Write-Host "Razor length: $($getResp.Razor.Length)"
Write-Host "OutputMimeType: $($getResp.OutputMimeType)"

# Try to update it via REST PUT (same content, just to trigger save hooks)
Write-Host ""
Write-Host "=== Saving Razor via REST PUT ==="
$body = @{
    Id = 8359
    Name = "ComprobantePdfMG"
    Razor = $getResp.Razor
    OutputMimeType = "text/html"
} | ConvertTo-Json -Depth 5

try {
    $putResp = Invoke-RestMethod -Uri "https://gcs.softguard.com/Rest/Razor/8359?oauth_token=$token" -Method PUT -ContentType "application/json" -Body $body
    Write-Host "PUT result: $($putResp | ConvertTo-Json -Depth 2 | Select-Object -First 5)"
    Write-Host "PUT successful"
} catch {
    Write-Host "PUT error: $($_.Exception.Message)"
    if ($_.Exception.Response) {
        $stream = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($stream)
        $errBody = $reader.ReadToEnd()
        Write-Host "Error body: $($errBody.Substring(0, [Math]::Min(500, $errBody.Length)))"
    }
}

# Wait a moment and test preview
Write-Host ""
Write-Host "=== Testing preview after REST PUT ==="
$resp = Invoke-WebRequest -Uri "https://gcs.softguard.com/handler/ComprobantePdfMG?preview=true&orgId=14&oauth_token=$token" -UseBasicParsing
Write-Host "Status: $($resp.StatusCode)"
Write-Host "Length: $($resp.Content.Length)"
if ($resp.Content.Contains('VISTA PREVIA')) { Write-Host "PREVIEW BANNER: FOUND!" } else { Write-Host "PREVIEW BANNER: NOT FOUND" }
if ($resp.Content.Contains('CLIENTE EJEMPLO')) { Write-Host "DUMMY CLIENT: FOUND!" } else { Write-Host "DUMMY CLIENT: NOT FOUND" }
