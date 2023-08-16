const Notes = require("../Models/Notes");
const notesController = {};

const listNotes = (id, role) => {
  if (role == "admin") {
    return Notes.find();
  } else {
    return Notes.find({ userId: id });
  }
};

notesController.list = (req, res) => {
  const { _id, role } = req.user;
  listNotes(_id, role)
    .then((notes) => {
      res.json(notes);
    })
    .catch((err) => {
      res.json(err);
    });
};

notesController.create = (req, res) => {
  const body = req.body;
  body.userId = req.user._id;
  //const note = new Notes(body);
  //note.userId = req.user._id;
  Notes.create(body)
    .then((notes) => {
      res.json(notes);
    })
    .catch((err) => {
      res.json(err);
    });
};

notesController.update = (req, res) => {
  const body = req.body;
  const id = req.params.id;
  Notes.findOneAndUpdate({ _id: id, userId: req.user._id }, body, {
    new: true,
    runValidators: true,
  })
    .then((notes) => {
      res.json(notes);
    })
    .catch((err) => {
      res.json(err);
    });
};

const removeItem = (id, userId, role) => {
  if (role == "admin") {
    return Notes.findByIdAndDelete(id);
  } else {
    return Notes.findOneAndDelete({ _id: id, userId: userId });
  }
};

notesController.destroy = (req, res) => {
  const { _id, role } = req.user;
  const id = req.params.id;
  removeItem(id, _id, role)
    .then((notes) => {
      res.json(notes);
    })
    .catch((err) => {
      res.json(err);
    });
};

notesController.show = (req, res) => {
  const id = req.params.id;
  Notes.findOne({ _id: id, userId: req.user._id })
    .then((note) => {
      res.json(note);
    })
    .catch((err) => {
      res.json(err);
    });
};
module.exports = notesController;
