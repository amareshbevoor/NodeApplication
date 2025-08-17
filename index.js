const express = require("express");
const app = express();
const PORT = 4000;
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const mongoose = require("mongoose");
//const userModel = require("./userModel");

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Welcome to Node JS");
});

mongoose
  .connect("mongodb://localhost:27017/userdb")
  .then(() => console.log("Mongodb connected.."))
  .catch((err) => console.log("Error: ", err));

//Schema

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("userModel", userSchema);

//Sending HTML to server
app.get("/users", async (req, res) => {
  // const user_html = `<h3>Users</h3><hr /><ul>${users
  //   .map((user) => `<li>${user.first_name} - ${user.last_name}</li>`)
  //   .join("")}</ul>`;
  const usersfromDb = await userModel.find({});
  console.log("usersfromDb : ", usersfromDb);
  const user_html = `<h3>Users</h3><hr /><ul>${usersfromDb
    .map((user) => `<li>${user.first_name} - ${user.last_name}</li>`)
    .join("")}</ul>`;

  res.send(user_html);
});

// Get all users as json
app.get("/api/users", async (req, res) => {
  //res.json(users);
  const usersData = await userModel.find({});
  return res.json(usersData);
});

//Add new user
app.post("/api/users", async (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.city
  ) {
    return res.status(400).json({ staus: "All fields are required.." });
  } else {
    const newUser = await userModel.create({
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email,
      gender: body.gender,
      city: body.city,
    });
    console.log("New User: ", newUser);
    return res.status(201).json({ status: "New user added successfully.." });
  }
  // Writing data to file start
  // users.push({ ...body, id: users.length + 1 });
  // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
  //   return res
  //     .status(201)
  //     .json({ staus: "New user created..", id: users.length });
  // });
  // Writing data to file end
});

app
  .route("/api/users/:id")
  .get(async (req, res) => {
    //Get singke user with id

    // const user_data = users.find((user) => user.id === Number(req.params.id));
    const userWithId = await userModel.findById(req.params.id);
    if (!userWithId)
      res.status(404).json({
        status: `The requested user with id: ${req.params.id} not found..`,
      });
    return res.json(userWithId);
  })
  .patch(async (req, res) => {
    //Update single user with id
    const userToUpdate = await userModel.findByIdAndUpdate(req.params.id, {
      city: req.params.city,
    });
    //console.log("Udpate the user with id");
  })
  .delete(async (req, res) => {
    //Delete single user with id
    // const users_after_delete = users.filter(
    //   (user) => user.id !== Number(req.params.id)
    // );
    // fs.writeFile(
    //   "./MOCK_DATA.json",
    //   JSON.stringify(users_after_delete),
    //   (err, data) => {
    //     return res.json({ staus: "Delete success", id: Number(req.params.id) });
    //   }
    // );

    const userToDelete = await userModel.findByIdAndDelete(req.params.id);
    return res.json({ status: `User with id ${req.params.id} has deleted.` });
  });

app.listen(PORT, (req, res) => {
  console.log(`Server is running on ${PORT}`);
});
