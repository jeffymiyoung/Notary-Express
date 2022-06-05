// Declarations
const fs = require('fs');
const util = require('util');
const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);
const router = require('express').Router();

var noteContents;

// GET all notes
router.get('/notes', function (req, res) {
    readFileAsync('db/db.json', 'utf8').then(function (data) {
        noteContents = JSON.parse(data)
        res.json(noteContents);
    });
});

// POST new note
router.post('/notes', function (req, res) {
    let newNote = req.body;
    let lastId = 0;
    if (noteContents.length !== 0) {
        lastId = noteContents[noteContents.length -1]["id"];
    }
    let newId = lastId + 1;
    newNote["id"] = newId;
    noteContents.push(newNote);
    writeFileAsync("db/db.json", JSON.stringify(noteContents)).then(function () {
        console.log("Note has been updated!");
    });
    res.json(newNote);
});

// DELETE note
router.delete('/notes/:id', function (req, res) {
    let chosenId = parseInt(req.params.id);
    for (let i = 0; i < noteContents.length; i++) {
        if (chosenId === noteContents[i].id) {
            noteContents.splice(i, 1);
            let noteJSON = JSON.stringify(noteContents, null, 2);
            writeFileAsync('db/db.json', noteJSON).then(function () {
                console.log("Note has been deleted!");
            });
        }
    }
    res.json(noteContents);
});

// Export for External
module.exports = router;