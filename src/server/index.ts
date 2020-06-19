import express from "express";
import path from "path";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static(path.join(__dirname, 'client')));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
  console.log('Connect with \x1b[36m%s\x1b[0m', `http://localhost:${PORT}/`);
});