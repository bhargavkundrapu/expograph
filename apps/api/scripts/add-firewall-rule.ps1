# Add Windows Firewall rule for PostgreSQL (port 5432)
# Run as Administrator: powershell -ExecutionPolicy Bypass -File scripts/add-firewall-rule.ps1

Write-Host "Adding Windows Firewall rule for PostgreSQL (port 5432)..." -ForegroundColor Yellow

$ruleName = "PostgreSQL-Outbound-5432"

# Check if rule already exists
$existing = netsh advfirewall firewall show rule name=$ruleName 2>$null
if ($existing) {
    Write-Host "Rule already exists. Removing old rule..." -ForegroundColor Yellow
    netsh advfirewall firewall delete rule name=$ruleName | Out-Null
}

# Add outbound rule for PostgreSQL
netsh advfirewall firewall add rule name=$ruleName dir=out action=allow protocol=TCP localport=5432 enable=yes profile=any | Out-Null

if ($LASTEXITCODE -eq 0) {
    Write-Host "Firewall rule added successfully!" -ForegroundColor Green
    Write-Host "Now try: node scripts/test-connection.js" -ForegroundColor Cyan
} else {
    Write-Host "Failed to add firewall rule. Run PowerShell as Administrator." -ForegroundColor Red
    Write-Host "Right-click PowerShell and Run as Administrator, then run this script again." -ForegroundColor Yellow
}
