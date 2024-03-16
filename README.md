# MERN-CRUD-Demo

This project documents how to create a CRUD demo from 0 with MERN stack

### Back end

1. Init back end, create a file called "backend"and run

```shell
npm init -y
```

2. create a main server file called `"server.js"`. 
   
   modify the `package.json`, add a new field `"type": "module"`, 
   
   and a new field under `"script"`,  `"dev":"nodemon server.js"`

```javascript
  "type": "module",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "nodemon server.js"
  },
```

1. then install all module needed

```shell
npm install nodemon express body-parser dotenv mongoose 
```

if need authentication

```shell
npm install cors jwt bcryptjs
```

4. create `.env` file and `.gitignore` file:

```
.env
/node_modules
```

5. run the server

```shell
npm run dev
```

6. build the hello world get api

```javascript
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("{ message: 'Hello World' }");
});

// always at the end
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
```

7. Create and connect to MongoDB

go to www.mongodb.com

register -> new project -> deploy ->set username and passord -> connect -> driver -> copy the URI

put the URI into `.env` like :

```
MONGO_URI = "your URI"
```

8. Create a function in` lib/connectToDB.js`



```jsx
import mongoose from "mongoose";

let isConnected = false;
// export this function
export const connectToDB = async () => {
  if (isConnected) {
    console.log("=> using existing database connection");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "sitemate",
    });
    isConnected = true;
    console.log("=> new database connection");
  } catch (error) {
    console.log("=> error connecting to database:", error);
  }
};


```

9. import this function in server.js and run `connectToDB()` at the beginning

10. once the connection is succssful, wirte a data model file in `/models/your_model_name.js `
    
    1. define a new mongoose Schema, field and type within it.
    
    2. define model with the Schema export it

```js
// for example
import mongoose from "mongoose";
const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
});

const Note = mongoose.model("Note", noteSchema);
// export this model
export { Note };


```

11. write CRUD code with app.get . post . put .fetch. delete, Go check the src for more detail

12. once finished all the function and tested them, put the asyn fuction in to `/controllers/notesController.js`
    
    then export and import them in the server.js, which gonna make them more  readable.

13. use cros() if request from different domain
    
    ```js
    app.use(cros())
    ```



### Front end

1. install and create React app

create a folder called "frontend", cd into it and run

```shell
npx create-react-app .
```

2. delete everything except index.js and App.js, and the import things in these two files. the content of App.js should looks like this now:

```js
function App() {
  return (
    <div className="App">
      hello world
    </div>
  );
}
export default App;
```

3. install axios and import it 

```shell
npm install --save axios
```
