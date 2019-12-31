This is an Nodejs app currently using for API
 
 **FrontEnd: - EJS ,
 Backend: - Nodejs v12 , 
 DB: MongoDb**

###### LOCAL ENVIRONMENT SETUP:-- 
i) You Need have a Internet Connection enabled In Order 
get mongodb database access

ii) Install all dependency 
 `npm install`

iii) Run Node Server
 `npm start`
 
###### Docker Deployment Supported :-

   Please fellow bellow instruction to deploy in docker, all 
   instruction given for unix or linux system   
     
   i) Run your docker Socket via this command : - 
       
     # listen using the default unix socket, and on 1 specific IP 
       
       sudo dockerd -H unix:///var/run/docker.sock -H tcp://192.168.59.106 
 
  ii) Then Run docker-compose.yml file 
    
            kubectl apply -f Docker-compose.yml
            
   
   
   mongo URl:-   mongodb://localhost:27018  
   Node URL:-  localhost:8080