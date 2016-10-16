# WhenWeWorkRestAPI
The rest API for the scheduler project
##INSTALLATION GUIDE
1. Fork repo as personal repo
2. Clone the fork to local repository
3. run ``` npm install ```

##Run Project
Note: Have an instance of mongo db running
Run the server.js file by using ```node server.js ``` command

##Current API Methods
###Get requests
 `http://localhost:8080/`  just displays a message that API is working


 `http://localhost:8080/api/memberinfo` This returns a json object of members info
   It requires an Artherization header key with a JWT (Token) as the value.  
   Response
   ```json
   {
     "success": true,
     "msg": "Welcome in the member area William!",
     "firstName": "John",
     "lastName": "Doe",
     "email": "doe@umd.edu"
   }
   ```
   
   
    



