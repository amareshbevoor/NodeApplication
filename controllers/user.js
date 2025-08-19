const User = require("../models/user");

async function getAllUsers(req, res) {
  const usersData = await User.find({});
  return res.json(usersData);
}

async function getUserWithId(req, res) {
  const userWithId = await User.findById(req.params.id);
  if (!userWithId)
    res.status(404).json({
      status: `The requested user with id: ${req.params.id} not found..`,
    });
  return res.json(userWithId);
}

async function updateUserWithId(req, res) {
  const userToUpdate = await User.findByIdAndUpdate(req.params.id, {
    city: req.body.city,
  });
  return res.json({
    status: `User with id ${req.params.id} has been updated.`,
  });
}

async function deleteUserWithId(req, res) {
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

  const userToDelete = await User.findByIdAndDelete(req.params.id);
  return res.json({ status: `User with id ${req.params.id} has deleted.` });
}

async function createNewUser(req, res) {
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
    const newUser = await User.create({
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
}

module.exports = {
  getAllUsers,
  getUserWithId,
  updateUserWithId,
  deleteUserWithId,
  createNewUser,
};
