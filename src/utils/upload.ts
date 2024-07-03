import path from "path";
export function checkFileType(file: Express.Multer.File, cb: any) {
  const fileTypes = /jpeg|jpg|png|gif|pdf|docx|doc|webp|mp4|mp3|3gp|mpeg|mov/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());

  if (extname) {
    return cb(null, true);
  } else {
    cb("File type not supported");
  }
}
