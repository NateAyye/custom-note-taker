const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + 'public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
