#!/bin/bash
echo "Rodando backend..."
cd backend
npm install
npm run dev &

cd ../frontend
echo "Rodando frontend..."
npm install
npm run dev