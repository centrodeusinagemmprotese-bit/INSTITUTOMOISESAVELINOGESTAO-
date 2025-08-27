@echo off
echo Instalando dependencias...
npm install
IF %ERRORLEVEL% NEQ 0 (
    echo Erro ao instalar dependencias.
    pause
    exit /b %ERRORLEVEL%
)

echo Iniciando servidor de desenvolvimento...
npm run dev
IF %ERRORLEVEL% NEQ 0 (
    echo Erro ao iniciar o servidor.
    pause
    exit /b %ERRORLEVEL%
)

pause
