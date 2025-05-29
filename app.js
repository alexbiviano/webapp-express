const express = require ('express')
const mysql = require('mysql2')
const app = express()
const port = 3000

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'db_movie'
}) 

db.connect((err) => {  
    if (err) {  
        console.error('Error while connecting to mySQL ' + err.stack);  
        return;  
    }  
    console.log('Connected to mySQL ' + db.threadId);  
});  

app.get('/', (req, res) => {  
    res.send('Hello World!');  
});  

app.get('/movies', (req, res) => {  
    db.query('SELECT * FROM movies', (err, results) => {  
        if (err) {  
            return res.status(500).send(err);  
        }  
        res.json(results);    
    });  
});  

 
app.get('/movies/:id', (req, res) => {  
    const movieId = req.params.id;  


    db.query('SELECT * FROM movies WHERE id = ?', [movieId], (err, movieResults) => {  
        if (err) {  
            return res.status(500).send(err);  
        }  
        if (movieResults.length === 0) {  
            return res.status(404).send('Film non trovato');  
        }  

        db.query('SELECT * FROM reviews WHERE movie_id = ?', [movieId], (err, reviewResults) => {  
            if (err) {  
                return res.status(500).send(err);  
            }  
            res.json({  
                movie: movieResults[0],  
                reviews: reviewResults  
            });  
        });  
    });  
});  

app.listen(PORT, () => {  
    console.log(`Server is running on http://localhost:${PORT}`);  
});  