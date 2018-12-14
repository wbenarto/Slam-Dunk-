var express = require("express");
var app = express();
var path = require("path");

var PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var characters = [{
    routeName: "hanamichi",
    name: "Sakuragi Hanamichi",
    school: "Shohoku",
    position: "Power Forward",
    move: "SLAM DUNK"
}, {
    routeName: "rukawa",
    name: "Kaede Rukawa",
    school: "Shohoku",
    position: "Shooting Guard",
    move: "Cut through defenders"
}, {
    routeName: "akagi",
    name: "Akagi",
    school: "Shohoku",
    position: "Center",
    move: "Shot Blocker"
}, {
    routeName: "sendoh",
    name: "Akira Sendoh",
    school: "Ryonan",
    position: "Shooting Guard",
    move: "All star Offensive weapon"
}, {
    routeName: "maki",
    name: "Shinichi Maki",
    school: "Kainan",
    position: "Point Guard",
    move: "Fake your eyes out"
}];

app.get("/", function(req,res) {
    res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/add", function(req,res){
    res.sendFile(path.join(__dirname, "add.html"));
});

app.get("/api/characters", function(req,res){
    return res.json(characters);
});

app.get("/api/characters/:char", function(req,res) {
    var chosen = req.params.char;
    console.log(chosen);

    for (var i = 0; i < characters.length; i++) {
        if(chosen === characters[i].routeName) {
            return res.json(characters[i]);
        }
    }

    return res.json(false);
});

app.post('/api/characters', function(req,res){
    var newcharacter = req.body;

    newcharacter.routeName = newcharacter.name.replace(/|s+/g, "").toLowerCase();

    console.log(newcharacter);

    characters.push(newcharacter);

    res.json(newcharacter);
})



app.listen(PORT, function(){
    console.log("We LIVE BAYBEEE");
})