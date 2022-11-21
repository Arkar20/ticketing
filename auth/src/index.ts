import express from "express";
const app = express();

app.use(express.json());

app.get("/api/user/currentuser", (req, res) => {
  return res.send("Current User");
});

app.listen(3000, () => {
  console.log("running in port 3000!");
});
