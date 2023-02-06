const multer = require("multer");
const express = require("express");
const hbs = require("hbs");
const folder = require("./readFiles");

const app = express();
const upload = multer({ dest: "files" });

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "files");
  },

  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

app.set("view engine", "hbs");
app.use(express.static(__dirname));
app.use(multer({ storage: storageConfig }).single("filedata"));

hbs.registerPartials(__dirname + "/views/partial");

app.get("/", function (request, response) {
  let links = folder.getFiles("./files/");
  response.render("index", {
    title: "Main page",
    description: "Output of stored data",
    links: links,
  });
});

app.get("/upload", function (request, response) {
  response.render("upload", {
    title: "Upload",
    buttonName: "Upload file",
  });
});

app.post(
  "/upload",
  upload.single("filedata"),
  function (request, response, next) {
    let filedata = request.file;
    if (!filedata) res.send("Error upload file");
    else
      response.render("upload", {
        title: "Upload",
        buttonName: "Upload file",
      });
  }
);

app.listen(3000, function () {
  console.log("Server running on port 3000");
});
