import fs from "fs"
import path from "path";
import { __filename, __dirname } from "../utils/pathHelper.js";

export const removeFile =(fileName)=> {
    fs.unlink(path.join(__dirname, "../uploads", fileName), function (err) {
        if (err && err.code == "ENOENT") {
          // file doesn't exist
          console.log(`File ${fileName} doesn't exist, won't remove it.`);
        } else if (err) {
          console.log(err.message);
          console.log(`Error occured while trying to remove file ${fileName}`);
        } else {
          console.log(`removed ${fileName}`);
        } 
      });
}