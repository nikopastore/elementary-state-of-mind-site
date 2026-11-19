$ErrorActionPreference = "Stop"
Set-Location -LiteralPath $PSScriptRoot
$runtime = Join-Path $PSScriptRoot ".venv\Scripts\python.exe"
if (!(Test-Path -LiteralPath $runtime)) {
    py -3 -m venv .venv
    if ($LASTEXITCODE -ne 0) { throw "Python 3.11 or later is required." }
}
& $runtime -m pip install --disable-pip-version-check -r requirements.txt
if ($LASTEXITCODE -ne 0) { throw "Dashboard dependencies could not be installed." }
& $runtime -m streamlit run app.py --server.address 127.0.0.1 --server.port 8765 --browser.gatherUsageStats false
