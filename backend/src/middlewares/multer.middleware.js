import multer from "multer";

function randomName(originalName) {
  const ext = originalName.split(".").pop();
  const random = Math.floor(Math.random() * 10000); 
  const date = Date.now();

  return `${date}-${random}.${ext}`;
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, randomName(file.originalname)); 
  },
});

export const upload = multer({
  storage,
});