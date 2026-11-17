@echo off
rem Abre a apresentacao em tela cheia no Microsoft Edge (funciona sem internet).
set "ARQ=%~dp0index.html"
set "EDGE=%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe"
if not exist "%EDGE%" set "EDGE=%ProgramFiles%\Microsoft\Edge\Application\msedge.exe"
if exist "%EDGE%" (
  start "" "%EDGE%" --start-fullscreen --new-window "%ARQ%"
) else (
  start "" "%ARQ%"
)
