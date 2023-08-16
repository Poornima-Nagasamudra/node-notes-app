const express = require("express");
const router = express.Router()

const userController = require("../app/controllers/UsersController");
const tokenGeneration = require("../app/middlewares/tokengeneration");
const { authentication, authorizeUser} = require("../app/middlewares/authentication")
const notesController = require("../app/controllers/NotesController")

router.post("/api/users/register", userController.register);
router.post("/api/users/login", tokenGeneration, userController.login);
router.get("/api/users/account", authentication, userController.account);
router.get("/api/users", authentication, authorizeUser, userController.list);

router.get("/api/users/notes", authentication, notesController.list)
router.post("/api/users/notes", authentication, notesController.create)
router.get("/api/users/notes/:id", authentication, notesController.show)
router.put("/api/users/notes/:id", authentication, notesController.update)
router.delete("/api/users/notes/:id", authentication, notesController.destroy)

module.exports = router;
