$c = Get-Content 'D:\projects\softguard\desktop\softguard.workspace\tools\gcs\preview-test-output.html' -Raw
Write-Host "Length: $($c.Length)"
Write-Host "Contains 'observaciones': $($c.Contains('observaciones'))"
Write-Host "Contains 'informacionExtra': $($c.Contains('informacionExtra'))"
Write-Host "Contains 'ACCOUNTLIST': $($c.Contains('ACCOUNTLIST'))"
Write-Host "Contains 'InterpolateTemplate': $($c.Contains('InterpolateTemplate'))"
Write-Host "---LAST 500 chars---"
$last500 = $c.Substring([Math]::Max(0, $c.Length - 500))
Write-Host $last500
