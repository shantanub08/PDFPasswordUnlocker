@echo off
setlocal enabledelayedexpansion

if "%~1"=="" (
  echo Drag and drop one or more PDF files onto this script.
  echo Press any key to exit.
  pause >nul
  exit /b 1
)

where qpdf >nul 2>&1
if errorlevel 1 (
  echo qpdf.exe not found in PATH.
  echo Press any key to exit.
  pause >nul
  exit /b 1
)

set /p PASSWORD=Enter PDF password: 

for %%F in (%*) do (
  set "input=%%~fF"
  set "dir=%%~dpF"
  set "name=%%~nF"
  set "ext=%%~xF"
  set "outfile=!dir!!name!_unlocked!ext!"

  echo.
  echo Decrypting: "%%~fF"
  qpdf --password=!PASSWORD! --decrypt "%%~fF" "!outfile!"
  if errorlevel 1 (
    echo FAILED: "%%~fF"
  ) else (
    echo OK: "!outfile!"
  )
)

echo.
echo All done. Press any key to exit.
pause >nul
endlocal
