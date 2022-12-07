const cloudinary = require("cloudinary");
const keys = require("../common/config/env.config");

//config
cloudinary.config({ 
                cloud_name: keys.CLOUDINARY_CLOUD_NAME,
                api_key: keys.CLOUDINARY_API_KEY,
                api_secret: keys.CLOUDINARY_API_SECRET
});

exports.upload=  async (req,res) => {
  let result= await cloudinary.uploader.upload(req.body.image, {
               public_id: `${Date.now()}`,
               resource_type: "auto"
  });
  res.json({
      public_id: result.public_id,
      url:result.secure_url
  });
}

exports.remove= (req,res) => {

    let image_id= req.body.public_id;
    cloudinary.uploader.destroy(image_id, (err, result) => {
        if (err) {
            return res.json({success:false, err});
        }
         res.send("Image removed");
    })
}
