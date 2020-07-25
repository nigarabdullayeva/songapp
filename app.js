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
            case "Finding by artist":
                artistSearch();
                break;
            case "Multi searching":
                multiSearch();
                break;
            case "Rnge search":
                rangeSearch();
                break;
            case "Song search":
                songSearch();
                break;
        }

    })
}


function artistSearch(){
 console.log("Searching artist...")
}

function multiSearch(){
  console.log ("Multisearch....")
}

function rangeSearch() {
  console.log ("reach search....")
}

function songSearch() {
    console.log ("Searching song....")
}