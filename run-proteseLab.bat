@echo off
REM ======================================================
REM ProteseLab - Script de execução para Windows
REM ======================================================

REM 1. Instala dependências do projeto
echo Instalando dependências...
npm install
IF %ERRORLEVEL% NEQ 0 (
    echo Erro ao instalar dependencias.
    pause
    exit /b %ERRORLEVEL%
)

REM 2. Inicia o servidor de desenvolvimento do Vite
echo Iniciando servidor de desenvolvimento...
npm run dev
IF %ERRORLEVEL% NEQ 0 (
    echo Erro ao iniciar o servidor.
    pause
    exit /b %ERRORLEVEL%
)

REM 3. Mantém a janela aberta
pause
