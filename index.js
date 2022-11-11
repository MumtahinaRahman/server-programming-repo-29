const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const port = 3000;

app.use(fileUpload());

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/upload', (req, res) => {
    // Get the file that was set to our field named "image"
    const { image } = req.files;

    // If no image submitted, exit
    if (!image) return res.sendStatus(400);

    // Move the uploaded image to our upload folder
    image.mv(__dirname + '/uploaded/' + image.name);

    res.sendStatus(200);
    res.send("the image has been uploaded.");
    res.send("now check the uploaded directory.");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.use(express.static(__dirname+'/uploaded'));
app.get('/upload', function (req, res) {
  res.sendFile(__dirname + '/public/slide.html');
})

// app.post('/upload', (req, res) => {
//     // We'll handle the image upload here
// });

