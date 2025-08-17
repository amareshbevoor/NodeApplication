const express = require("express");
const app = express();
const PORT = 4000;
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const { json } = require("stream/consumers");

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Welcome to Node JS");
});

//Sending HTML to server
app.get("/users", (req, res) => {
  const user_html = `<h3>Users</h3><hr /><ul>${users
    .map((user) => `<li>${user.first_name} - ${user.last_name}</li>`)
    .join("")}</ul>`;

  res.send(user_html);
});

// Get all users as json
app.get("/api/users", (req, res) => {
  res.json(users);
});

//Add new user
app.post("/api/users", (req, res) => {
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ staus: "success", id: users.length });
  });
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    //Get singke user with id
    const user_data = users.find((user) => user.id === Number(req.params.id));
    res.json(user_data);
  })
  .put((req, res) => {
    //Update single user with id
    console.log("Udpate the user with id");
  })
  .delete((req, res) => {
    //Delete single user with id
    const users_after_delete = users.filter(
      (user) => user.id !== Number(req.params.id)
    );

    fs.writeFile(
      "./MOCK_DATA.json",
      JSON.stringify(users_after_delete),
      (err, data) => {
        return res.json({ staus: "Delete success", id: Number(req.params.id) });
      }
    );
  });

app.listen(PORT, (req, res) => {
  console.log(`Server is running on ${PORT}`);
});
