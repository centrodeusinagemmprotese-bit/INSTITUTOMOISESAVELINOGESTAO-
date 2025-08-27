#!/bin/bash
echo "Instalando dependências..."
npm install || { echo "Erro ao instalar dependências"; exit 1; }

echo "Iniciando servidor de desenvolvimento..."
npm run dev || { echo "Erro ao iniciar o servidor"; exit 1; }

echo "Servidor iniciado. Pressione Ctrl+C para parar."
read -p "Pressione Enter para sair..."
