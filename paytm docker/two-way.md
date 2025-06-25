# two way to run this full stack project

## 1. run with docker compose file 
- so for that you need docker-compose.yml file locally to your vs code you can get this file from github 
- run this command to pull the front and back image from docker-hub and run it locally 
- docker-compose up -d
- for stop the contaner
- docker-compose down -v
- in this you can use it or not use the mongo image it depand upon MONGO_URL if it is locally connect with monog then you need this db server for mongo url like this (mongodb://db:27017/paytm) and if you put your atlus mongo url the in this case you don't nedd mongo image because you connect with your atlus so accourding to this you decide

## 2. run with direct front and back image in same network
-for create network
- docker network create my-custom-network

 - docker run -d --name frontend --network paytm-network -p 5173:5173 dhirukumar/paytm-frontend:v1
 -  docker run -d --name backend --network paytm-network -p 3000:3000 dhirukumar/paytm-backend:v4 
 -in backend v4 because inside .env mongo atlus url is present so that why you dont need any mongo image
