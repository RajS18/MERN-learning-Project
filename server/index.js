import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import postsRoutes from './routes/posts.js'
const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
//Returns middleware that only parses json and only looks at requests where the Content-Type
//header matches the type option.
//limit: Controls the maximum request body size. If this is a number,
//then the value specifies the number of bytes; if it is a string, the value is passed to
//the bytes library for parsing. Defaults to '100kb'.
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
//Returns middleware that only parses urlencoded bodies and only looks at requests where the
//Content-Type header matches the type option
//This is to setup bodyParser to easily sent big POST requests.



app.use('/posts',postsRoutes);
const connection =
  "mongodb+srv://mernmastery:mernmastery123@cluster0.pecn3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
//This is where database cluster is running.
const port = process.env.port || 5000;
mongoose
  .connect(connection, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(port, () => console.log(`Server running on port: ${port}`))
  )
  .catch(error => console.log(`error message: ${error.message}`));

//mongoose.set("useFindAndModify", false); //avoids getting warning related to mongoose on console.
