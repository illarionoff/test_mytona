const jsonServer = require("json-server");
var path = require("path");
const fs = require("fs");
var express = require("express");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const multer = require("multer");
server.use(middlewares);

// Multer config
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});
function fileFilter(req, file, cb) {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Wrong file type"));
  }
}
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10
  },
  fileFilter: fileFilter
});

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

server.use("/uploads", express.static("uploads"));

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
server.use(upload.single("projectImage"), (req, res, next) => {
  if (req.method === "POST") {
    if (req.file) {
      req.body.imagePath = req.file.path;
    } else {
      req.body.imagePath = "uploads/defult.png";
    }
    req.body.createdAt = Date.now();
  }

  if (req.method === "DELETE") {
    if (req.query.imagePath && req.query.imagePath !== "uploads/defult.png") {
      fs.unlink(req.query.imagePath, function(err) {
        if (err) throw err;
        // if no error, file has been deleted successfully
        console.log("File deleted!");
      });
    }
  }

  if (req.method === "PATCH") {
    if (req.file) {
      req.body.imagePath = req.file.path;
      if (req.body.oldImage !== "uploads/defult.png") {
        fs.unlink(req.body.oldImage, function(err) {
          if (err) throw err;
          // if no error, file has been deleted successfully
          console.log("File deleted!");
        });
      }
    } else if (req.body.oldImage !== "uploads/defult.png") {
      req.body.imagePath = req.body.oldImage;
    } else {
      req.body.imagePath = "uploads/defult.png";
    }
    req.body.createdAt = Date.now();
  }
  // Continue to JSON Server router
  next();
});

// Use default router
server.use(router);
server.listen(5000, () => {
  console.log("JSON Server is running");
});
