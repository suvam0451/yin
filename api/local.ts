import express from "express"
import dotenv from 'dotenv';
import cors from 'cors';
import UserService from "./services/user.service";
import TestService from "./services/test.service";

dotenv.config()

const app = express()
const port = 4000;

// Middleware
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get("/user/gallery", async (req, res) => {
  const resp = await UserService.getGallery(req.body);
  res.statusCode = resp.statusCode

  if(resp.body) {
    res.json(JSON.parse(resp.body))
  }
})

app.post("/test/image-upload", async(req, res) => {
  const resp = await TestService.uploadImage(req.body);

  res.statusCode = resp.statusCode

  if(resp.body) {
    res.json(JSON.parse(resp.body))
  }
})

app.listen(port);
console.log("Listening to port: " + port)
