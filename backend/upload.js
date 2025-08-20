const multer = require('multer');
const {
  courseStorage,
  subjectStorage,
} = require("./cloudinaryStorage"); // adjust path as needed

const courseUpload = multer({ storage: courseStorage });
const subjectUpload = multer({ storage: subjectStorage });
// Add more like materialUpload, etc.

module.exports = { courseUpload, subjectUpload };
