const express = require("express");
const router = express.Router();
const User = require("../models/user");
const {
  getAllUsers,
  getUserWithId,
  updateUserWithId,
  deleteUserWithId,
  createNewUser,
} = require("../controllers/user");

// get all users and send as html
// router.get("/", async (req, res) => {
//   // const user_html = `<h3>Users</h3><hr /><ul>${users
//   //   .map((user) => `<li>${user.first_name} - ${user.last_name}</li>`)
//   //   .join("")}</ul>`;
//   const usersfromDb = await User.find({});
//   console.log("usersfromDb : ", usersfromDb);
//   const user_html = `<h3>Users</h3><hr /><ul>${usersfromDb
//     .map(
//       (user) => `<li>${user.first_name} - ${user.last_name} = ${user.city}</li>`
//     )
//     .join("")}</ul>`;

//   res.send(user_html);
// });

// Get all users from db as json
router.route("/").get(getAllUsers).post(createNewUser);

router
  .route("/:id")
  .get(getUserWithId)
  .patch(updateUserWithId)
  .delete(deleteUserWithId);

module.exports = router;
