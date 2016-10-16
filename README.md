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
 1.`http://localhost:8080/`  just displays a message that API is working


 2.`http://localhost:8080/api/memberinfo` This returns a json object of members info
   
   *Request Header:* `Authorization : JWT (Token) as the value`.  
   *Response:*:
   ```json
   {
     "success": true,
     "msg": "Welcome in the member area William!",
     "firstName": "John",
     "lastName": "Doe",
     "email": "doe@umd.edu"
   }
   ```
   
   
###Post Requests
  1 `http://localhost:8080/api/signup` This method creates new user.
  
  *Request Body Example* (Required Values)
  ```
        firstName: 'john',
        lastName: 'doe',
        password: 'pass',
        email: 'doe@umd.edu'
  ```
  *Response Example* (On success)
  ```json
  {
  "success": true,
  "msg": "Successful created new user."
  }
  ```
  
  2 `http://localhost:8080/api/authenticate` This method authenticates a user and returns a token 
  *Request Headers*(Required)
  ```
   email: 'doe@umd.edu'
   passord: `pass`
  ```
  
  *Request Response* (On success) Note: TOken is usually longer
  ```json
  {
  "success": true,
  "token": "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJf"
  }
  ```

##Todo
There are many things in the backlog 

1. Figure out Efficient modeling for Calendar & shifts.
2. Add CRUD methods for shifts

  
       
   
    



