@echo off
cd /d "%~dp0"
echo Iniciando o servidor do Protocolo Zero Defesa na porta 5174...
start "" http://127.0.0.1:5174
call npx vite --port 5174 --host 127.0.0.1
pause
