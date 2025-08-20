const Router = require("express").Router()
const courseController = require("../Server/Courses/courseController")
const subjectController = require("../Server/Subjects/subjectController")
const customerController = require("../Server/Customer/customerController")
const materailController = require("../Server/Material/materialController")
const playlistController = require("../Server/Playlist/playlistController")
const requestController = require("../Server/Request/requestController")
const queryController = require("../Server/Query/queryController")
const userController = require("../Server/User/userController")
const ratingController = require("../Server/Rating/ratingController")
const flashCardController  = require("../Server/FlashCard/flashCardController") 
const  multer = require("multer")

const courseStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/courses')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  const courseUpload = multer({ storage: courseStorage })

  //courses

  
  Router.post("/course/getall",courseController.getall)
  Router.post("/course/getsingle",courseController.getsingle)
  Router.post("/course/delete",courseController.deleteData)
  
  

  //subjects disk storage
  const subjectStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/subjects')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  const subjectUpload = multer({ storage: subjectStorage })

  //subject

Router.post("/subject/getall",subjectController.getall)
Router.post("/subject/getsingle",subjectController.getsingle)
Router.post("/subject/delete",subjectController.deleteData)



//material disk storage
const materialStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/materials')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const materialUpload = multer({ storage: materialStorage })

//material

Router.post("/material/getall",materailController.getall)

Router.post("/material/getsingle",materailController.getsingle)

Router.post("/material/updateaccesslevel",materailController.updateAccessLevel)


//playlist disk storage
const playlistStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/playlists')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const playlistUpload = multer({ storage: playlistStorage })

//playlist


Router.post("/playlist/getall",playlistController.getall)
Router.post("/playlist/getsingle",playlistController.getsingle)



//request


Router.post("/request/getall",requestController.getall)
Router.post("/request/getsingle",requestController.getsingle)


//query

Router.post("/query/add",queryController.add)
Router.post("/query/getall",queryController.getall)


 //customer disk storage
 const customerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/customers')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const customerUpload = multer({ storage: customerStorage })


// customer
Router.post("/customer/register",customerUpload.single("customerImage"),customerController.register)
Router.post("/customer/getall",customerController.getall)
Router.post("/customer/getsingle",customerController.getsingle)

//user
Router.post("/user/login",userController.login)


//Rating

Router.post("/rating/getall",ratingController.getall)


//flash card

Router.post("/flashcard/getall",flashCardController.getall)
Router.post("/flashcard/getsingle",flashCardController.getsingle)


Router.use(require("../Config/middleware"))

//course
Router.post("/course/add",courseUpload.single("courseImage"),courseController.add)
Router.post("/course/update",courseUpload.single("courseImage"),courseController.updateData)
Router.post("/course/updatestatus",courseController.updateStatus)

//subject

Router.post("/subject/add",subjectUpload.single("subjectImage"),subjectController.add)
Router.post("/subject/update",subjectUpload.single("subjectImage"),subjectController.updateData)
Router.post("/subject/updatestatus",subjectController.updateStatus)

//material
Router.post("/material/add",materialUpload.single("materialFile"),materailController.add)
Router.post("/material/delete",materailController.deleteData)
Router.post("/material/update",materialUpload.single("materialFile"),materailController.updateData)
Router.post("/material/updatestatus",materailController.updateStatus)
Router.post("/material/updaterequest",materailController.updateRequestStatus)

//playlist
Router.post("/playlist/add",playlistController.add)
Router.post("/playlist/delete",playlistController.deleteData)
Router.post("/playlist/update",playlistController.updateData)
Router.post("/playlist/updatestatus",playlistController.updateStatus)

//request
Router.post("/request/add",requestController.add)
Router.post("/request/update",requestController.updateData)
Router.post("/request/updatestatus",requestController.updateStatus)

//customer
Router.post("/customer/update",customerUpload.single("customerImage"),customerController.updateData)
Router.post("/customer/updatestatus",customerController.updateStatus)

//user
Router.post("/user/updatestatus",userController.updateStatus)
Router.post("/user/changepassword",userController.changePassword)

//rating
Router.post("/rating/add",ratingController.add)

//flashcard
Router.post("/flashcard/add",flashCardController.add)
Router.post("/flashcard/delete",flashCardController.deleteData)
Router.post("/flashcard/update",flashCardController.updateData)
module.exports = Router;