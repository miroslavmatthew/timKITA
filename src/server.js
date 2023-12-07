import express from "express";
import path from "path";
import bodyParser from "body-parser";
import routes from "./controllers/routes.js";

const app = express();

const staticPathPublic = path.resolve("public");

app.set("view engine", "ejs");
app.use(express.static(staticPathPublic));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", routes);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`>> Server is running on http://localhost:${port}`);
});