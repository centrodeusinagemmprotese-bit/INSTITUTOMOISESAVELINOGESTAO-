@echo off
echo Rodando backend...
cd backend
npm install
start cmd /k "npm run dev"

cd ..
echo Rodando frontend...
cd frontend
npm install
start cmd /k "npm run dev"

pause
