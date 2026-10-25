@echo off
cd /d "%~dp0"
echo Iniciando o servidor do Protocolo Zero...
start "" http://127.0.0.1:5173
call npx vite --host 127.0.0.1
pause
