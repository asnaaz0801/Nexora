$buildDir = "C:\Users\Lenono\AppData\Local\Temp\nexora_modules"
if (Test-Path $buildDir) {
    Remove-Item -Recurse -Force $buildDir
}
New-Item -ItemType Directory -Path $buildDir -Force
Copy-Item "package.json" -Destination $buildDir

Set-Location $buildDir
Write-Host "Installing dependencies in $buildDir..."
npm install --legacy-peer-deps --no-audit --no-fund

Set-Location "G:\My Drive\3rd Year\NexoraWeb"
if (Test-Path "node_modules") {
    Remove-Item -Recurse -Force "node_modules"
}

Write-Host "Creating NTFS junction for node_modules..."
cmd /c "mklink /J node_modules C:\Users\Lenono\AppData\Local\Temp\nexora_modules\node_modules"
Write-Host "Setup complete!"
