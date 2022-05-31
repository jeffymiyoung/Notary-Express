const express = require('express');

// Route connections
const htmlRoutes = require("./routes/htmlRoutes")
const apiRoutes = require('./routes/apiRoutes');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));

// Use routes
app.use('/api', apiRoutes);
app.use("/", htmlRoutes);

// Start server after DB connection
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});