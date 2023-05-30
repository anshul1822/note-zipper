const express = require('express');
const router = express.Router();

const {getNotes, createNotes, getNotesById, updateNoteById, deleteNoteById} = require("../controllers/noteControllers");
const {protect} = require("../middlewares/authMiddleware");

router.route('/').get(protect, getNotes);
router.route('/create').post(protect, createNotes);
router.route('/:id').get(getNotesById).put(protect, updateNoteById).delete(protect, deleteNoteById);


module.exports = router;