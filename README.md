# WhenWeWorkRestAPI
The rest API for the scheduler project
##INSTALLATION GUIDE
1. Fork repo as personal repo
2. Clone the fork to local repository
3. run ``` npm install ```

##Run Project
Note: Have an instance of mongo db running
Run the server.js file by using ```node server.js ``` command

##Recomended tools
 1.  [Mongo DB Compass](https://www.mongodb.com/download-center?jmp=nav#compass):  Nice GUI application for managing Mongo
 2.  [Postman](https://www.getpostman.com/) Great tool for API Testing

##Current API Methods

###Schedule methods
 1.`http://localhost:8080/addAvailability` This route allows a user to add availability(Post Method)
   
   *Request Header:* `Authorization : JWT (Token) as the value`
   
   *Request Body:*(Add one shift at a time) 
   ```json
   {
    "day": 5,
    "start":{
     	 "hrs": 11,
     	 "mins": 30
     },
     "end":{
     	 "hrs": 14,
     	 "mins": 30
    }
   }
   ```
   *Response:* (On success Days as objects wit Array of shifts) Hrs: 11, mins: 30 means 11:30 and a 24 hr format
   ```json
   {
  "success": true,
  "msg": "Availability added"
  }
   ```
  
  2.`http://localhost:8080/addAvailability` (This route responds with all tem shifts set by user)
    
    *Request Header:* `Authorization : JWT (Token) as the value`
    
     *Request Body:*(Add one shift at a time) 
       ```json
      {
       "sunday": [],
       "monday": [
         {
           "start": {
             "hrs": 11,
             "mins": 30
           },
           "end": {
             "hrs": 11,
             "mins": 30
           },
           "day": 2
         },
         {
           "start": {
             "hrs": 11,
             "mins": 30
           },
           "end": {
             "hrs": 11,
             "mins": 30
           },
           "day": 2
         },
         {
           "start": {
             "mins": 30,
             "hrs": 11
           },
           "end": {
             "mins": 30,
             "hrs": 11
           },
           "day": 2
         },
         {
           "start": {
             "hrs": 11,
             "mins": 30
           },
           "end": {
             "hrs": 11,
             "mins": 30
           },
           "day": 2
         }
       ],
       "tuesday": [],
       "wednesday": [],
       "thursday": [
         {
           "start": {
             "mins": 30,
             "hrs": 11
           },
           "end": {
             "mins": 30,
             "hrs": 11
           },
           "day": 5
         },
         {
           "start": {
             "hrs": 11,
             "mins": 30
           },
           "end": {
             "hrs": 11,
             "mins": 30
           },
           "day": 5
         }
       ],
       "friday": [],
       "saturday": []
      }
       ```
    

###Get requests
 1.`http://localhost:8080/`  just displays a message that API is working


 2.`http://localhost:8080/api/memberinfo` This returns a json object of members info
   
   *Request Header:* `Authorization : JWT (Token) as the value`.  
   *Response:*:
   ```json
   {
     "success": true,
     "msg": "Welcome in the member area Ken",
     "firstName": "Ken",
     "lastName": "Bone",
     "email": "kbone@umd.edu"
   }
   ```
   
   
###Post Requests
  1 `http://localhost:8080/api/signup` This method creates new user.
  
  *Request Body Example* (Required Values)
  ```
    firstName: 'Ken',
    lastName: 'Bone',
    password: 'pass',
    email: 'kbone@umd.edu'
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
   email: 'kbone@umd.edu'
   passord: `pass`
  ```
  
  *Request Response* (On success) Note: Token is usually longer
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

  
       
   
    



