var express = require("express");
var formidable = require("express-formidable");
var fs = require("fs");

var app = express();

app.use(express.static("public"));
app.use(formidable());

// USANDO FS.READFILE:
// fs.readFile(__dirname + "/data/posts.json", function(error, file) {
//   file = JSON.parse(file);
//   console.log(file);
// });

// USANDO FS.WRITEFILE:
// fs.writeFile('ruta', 'lo que quiero gravar', function (error){
// if (error){
//   handle error
// }
// })

app.post("/create-post", function(req, res) {
  var blogpost = req.fields.blogpost
  fs.readFile(__dirname + "/data/posts.json", function(error, file) {
    var posts = JSON.parse(file);
    posts[Date.now()] = blogpost;
    var postsString = JSON.stringify(posts);
    fs.writeFile(__dirname + "/data/posts.json", postsString, function(error) {
      if (error) {
        console.log(error);
      }
    });
  });
});

// app.post("/create-post", async function(req, res) {
//   var blogpost = req.fields.blogpost;
//   var posts = await fs.readFile(__dirname + "/data/posts.json", async function(
//     error,
//     file
//   ) {
//     var posts = JSON.parse(file);
//     posts[Date.now()] = blogpost;
//     return JSON.stringify(posts);
//   });

//   fs.writeFile(__dirname + "/data/posts.json", posts, function(error) {
//     if (error) {
//       console.log(error);
//     }
//   });
// });

app.post("/create-post", function(req, res) {
  var blogpost = req.fields.blogpost;
  fs.readFile(__dirname + "/data/posts.json", function(error, file) {
    var posts = JSON.parse(file);
    posts[Date.now()] = blogpost;
    var postsString = JSON.stringify(posts);
    fs.writeFile(__dirname + "/data/posts.json", postsString, function(error) {
      if (error) {
        console.log(error);
      }
    });
  });
});

app.get("/get-posts", function(req, res) {
  fs.readFile(__dirname + "/data/posts.json", function(error, file) {
    var posts = JSON.parse(file);
    res.send(JSON.stringify(posts));
  });
});

// app.get("/", function(req, res) {
//   res.send("<h1>Hola Chicas</h1>");
// });

// app.get("/chocolate", function(req, res) {
//   res.send("<h1>Humm!!! Chocolate</h1>");
// });

app.listen(3000, function() {
  console.log("Servidor operante!");
});
