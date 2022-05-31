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

// Export for External
module.exports = router;