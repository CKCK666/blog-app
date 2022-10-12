import express from "express";
const router =express.Router()
import multer from "multer"



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
  
  const upload = multer({ storage: storage });
  
//upload route
  router.post("/", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
  });


  export default router