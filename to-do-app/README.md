**Todo App**

This is a simple web application built with Node.js which allows you to create a todo list.  
You can add a new item by typing it in or delete an item by clicking on it.


**Setup**
```
$ git clone https://github.com/BasileKoko/Node.js.git
$ cd to-do-app
$ npm install
```
**To run program**
```
$ node app.js
$ open http://localhost:3000
```

**To run test**
```
$ npm test
```

**User Stories**
```
As a user
So  that I can have a place to list my todo
I would like to access the todo website
```

```
As a user
So that I can record my todo
I would like to be able to add a todo
```

```
As a user
So that I can clear completed todo
I would like to delete todo from my list
```
Modules used for this project:

```javascript
"dependencies": {
  "body-parser": "^1.17.1",
  "dotenv": "^4.0.0",
  "ejs": "^2.5.6",
  "express": "^4.15.2",
  "mongoose": "^4.9.2"
},
"devDependencies": {
  "chai": "^3.5.0",
  "expect": "^1.20.2",
  "mocha": "^3.2.0",
  "zombie": "^5.0.5"
}
```
I am using Mlab Sandbox as database.  
https://mlab.com/plans/
