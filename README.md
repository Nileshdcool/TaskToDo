# TaskToDo
This app is resposible for creating daily tasks and marking them as completed once done.

# How to Start

cd API
dotnet run

cd..

cd client-app

npm install

npm run dev

## Commands

dotnet watch --no-hot-reload
dotnet new -l

docker-compose build
docker-compose up

## Entity Framework Commands 

dotnet ef migrations add InitialCreate -s API -p Persistence
dotnet ef database
dotnet ef database update -s API -p Persistence