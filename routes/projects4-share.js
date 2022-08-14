require("firebase-functions/lib/logger/compat");
const {format} = require('util');
//const multer = require("multer");
const router = require("express").Router();
const bodyParser = require("body-parser");
const {Storage} = require("@google-cloud/storage"); //JUST using Storage throws error, worked when using {Storage}
const Multer = require('multer');


router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
  
const cloudStorage = new Storage();

const bucketName = "test_pkt_test";
const bucket = cloudStorage.bucket(bucketName);
 
// Multer is required to process file uploads and make them available via
// req.files.
const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
  },
});


//upload a new project with image, where image upload code is part of the route handler function itself. No external function calls..
router.post("/newproject", multer.single('file'), async (req, res, next) => {
  console.log("Inside new project - with image..");
  console.log(req);
  
  var fileName="";
  var uploadedImageUrl;
 
  //Creating a random filename based on current time..
 fileName = helper.getHash(helper.getTimestampInSeconds())+ ".png"; //TODO - change it to millisecond for generating file name - to be more secured.
 
 //bucket to which we will store the image..
 const bucketName = "project_images_klo";
  
 //To call the function to upload the image file and get its url.. 
  uploadedImageUrl = await uploadImage(req,bucketName, fileName, false, next ).then(result => uploadedImageUrl=result);
 
  //Create a project and set its name as what is coming in body, and image url just received in above step..
  var newProject ={};
  newProject.name = req.body.name;
  newProject.imageUrl= uploadedImageUrl;

  //Return the project object..
  return res.send(newProject);

  
});   

/* 
This function is called to upload image to google cloud storage..
If the image upload was successful, it returns the image url */
async function uploadImage(req, bucketName, fileName, ifReplace, next){
  
  const bucket = cloudStorage.bucket(bucketName);
  const blob = bucket.file(fileName);
  const blobStream = blob.createWriteStream();
  var publicUrl;
  var isUploadSuccess = false;
  blobStream.on("error", (err) => {
    isUploadSuccess = false;
    console.log("Image upload failed..");
    //next(err);
  });
  blobStream.on("finish", () => {

    isUploadSuccess = true;
    console.log("Image upload successful..");

    // The public URL can be used to directly access the file via HTTP.
    //publicUrl = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
    //res.status(200).json({ publicUrl });
  });
  blobStream.end(req.file.buffer);
  //console.log("Inside uploadImage - image url is " + publicUrl);

  if(isUploadSuccess) {
    publicUrl = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
  }else{
    //console.log("Image upload failed")
    //publicUrl = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
  }

  return publicUrl;
}


module.exports = router;
