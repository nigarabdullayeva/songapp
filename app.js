const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Kamilla13",
    database: "top_songsDB"
});

connection.connect(err =>{
    if (err) throw err 
    console.log (`Connect on thread ${connection.threadId}`)
    initialPromts()
})

function initialPromts() {
    inquirer.prompt([
        {
            name: "action",
            message: "What do you want to do?",
            type: "list",
            choices: ["Artist search", "Multisearch", "Range Search", "Song search", "Exit"]
        }
    ]).then(answer => {
        switch(answer.action) {
            case "Artist search":
                artistSearch();
                break;
            case "Multisearch":
                multiSearch();
                break;
            case "Range Search":
                rangeSearch();
                break;
            case "Song search":
                songSearch();
                break;
        }

    })
}


function artistSearch(){
inquirer.prompt ([{
    message: "Which artist are you looking for?",
    name: "artist",
}]).then(answer =>{
    connection.query(`SELECT position, song, year FROM top5000 WHERE ?`,
    {artist: answer.artist},
    (err, results) => {
        if(err) throw err
        console.table(results)
        initialPromts()
    })
})
}

function multiSearch(){
    connection.query("SELECT artist, count(*) as countNum FROM top5000 GROUP BY artist HAVING countNum >1 ORDER BY countNum DESC",
    (err, results) =>{
        if (err) throw err
        console.table(results)
        initialPromts()
    })
 
}

function rangeSearch() {
  inquirer.prompt([
      {
          name:"beginning",
          type: "number",
          message: "starting position?"
      },
      {
        name:"end",
        type: "number",
        message: "ending position?"
    }
  ]).then(answers => {
      connection.query("SELECT position,song,artist,year FROM top5000 WHERE position BETWEEN ? AND ?",
      [answers.beginning, answers.end],
      (err, results) => {
        if(err) throw err
        console.table(results)
        initialPromts()
  })
})
}

function songSearch() {
   inquirer.prompt([
       {
           message: "Which song do you want to search?",
           name: "song"
       }
   ]).then(answer =>{
       connection.query(`SELECT position, artist, song, year FROM top5000 WHERE song LIKE "%${answer.song}%"`,
       (err, results) => {
        if(err) throw err
        console.table(results)
        initialPromts()
  })
   })
}