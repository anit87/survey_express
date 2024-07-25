const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'Survey_UI', 'dist')));

// Send index.html file for any requests to the root URL
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'Survey_UI', 'dist', 'index.html'));
});

// Start the server on port 3000
const PORT = process.env.PORT || 4002;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
