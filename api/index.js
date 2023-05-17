const express = require("express");
const app = express();
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const User = require("./models/User");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");
const Place = require("./models/Place");

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "ohmymy";

app.use(express.json()); //json parse karava mate
app.use(cookieParser()); //express ma cokkie read karava mate aa jaruri 6e
// console.log(__dirname+'/uploads');
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(
  cors({
    //cors ni error no ave etale
    credentials: true,
    origin: "http://localhost:5173",
  })
);

mongoose.connect(process.env.MONGOURL);

app.get("/test", (req, res) => {
  res.json("Test ok");
});

//Register
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (e) {
    console.log(e);
    res.status(422).json(e);
  }
});

//login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email: email });

  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign(
        { email: userDoc.email, id: userDoc._id },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res
            .cookie("token", token, {
              expires: new Date(Date.now() + 86400000),
              httpOnly: true,
            })
            .json(userDoc);
        }
      );
    } else {
      res.status(422).json("Password not ok");
    }
  } else {
    res.json("not found");
  }
});

//Show profile
app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { name, email, _id } = await User.findById(userData.id);
      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

//upload photos by link
app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = "Photo" + Date.now() + ".jpg";
  await imageDownloader.image({
    url: link,
    dest: __dirname + "\\uploads\\" + newName, //__dirname tame je directory ma 6e teno path ape
  });
  res.json(newName);
});

//Upload photos from devices
const photosMiddleware = multer({ dest: "uploads/" });
app.post("/upload", photosMiddleware.array("photos", 100), (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace("uploads\\", ""));
  }
  res.json(uploadedFiles);
});

// Form submited
app.post("/places", (req, res) => {
  const { token } = req.cookies;
  const {
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await Place.create({
      owner: userData.id,
      title,
      address,
      photos:addedPhotos,
      descreption:description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    });
    res.json(placeDoc)
  });
});


app.get("/places",(req,res)=>{
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const {id} = userData;
    res.json(await Place.find({owner:id}));
  });
})

app.get("/places/:id",async(req,res)=>{
  const {id} = req.params;
  res.json(await Place.findById(id));  
})

app.listen(4000);
