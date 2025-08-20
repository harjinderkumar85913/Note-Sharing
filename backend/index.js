const express = require("express")
const app = express()

const port = 4001;
const seeder = require("./Config/seeder")
seeder.adminseeder()
const config = require("./Config/db")
const cors = require("cors")
app.use(cors())
app.use(express.static(__dirname+("/public/")))

const path = require("path");
app.get("/view-pdf/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "public", "materials", filename);
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "inline; filename=" + filename);
  res.sendFile(filePath);
});

const route = require("./Routes/apiRoutes")
app.use(express.json({limit:"50 mb"}))
app.use(express.urlencoded({extended:false}))
app.use("/api",route);


app.listen(port,() =>{
    console.log("My app is ruuning on port "+ " "+ port)
})