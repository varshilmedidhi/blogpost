const express = require('express');
const app = express();
const port = 3000;
const bodyParser=require("body-parser");
// Data storage (replace with a database later)
let posts = []; 

app.set('view engine', 'ejs'); 
app.use(express.urlencoded({ extended: true })); // Body parsing for forms
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true})); 

// Routes
app.get('/', (req, res) => {
    res.render('home', { posts});
});

app.get('/new', (req, res) => {
    res.render('new');
});

app.post('/new', (req, res) => {
    const newPost = {
        title: req.body.title,
        content: req.body.content,
    };
    posts.push(newPost);
    res.redirect('/');
});

// **Corrected Edit Routes**
app.post('/posts/:index/edit', (req, res) => {
    const index = req.params.index;
    const post = posts[index];
    if (!post) {
        return res.status(404).send('Post not found');
    }
    res.render('edit', { post, index });
});

app.post('/posts/:index/modified', (req, res) => {
    const index = req.params.index;
    if (index >= 0 && index < posts.length) {
                posts[index] = {    
            title: req.body.title,
            content: req.body.content,
        };
    }
    res.redirect('/');
});

app.post('/delete/:index', (req, res) => {
    const index = req.params.index;
    posts.splice(index, 1);
    res.redirect('/');
});


app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
