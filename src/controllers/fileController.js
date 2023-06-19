import { baseUrl } from "../config/config.js";
import { HttpStatus } from "../constant/constant.js";
import successResponseData from "../helper/successResponseData.js";
import tryCatchWrapper from "../middleware/tryCatchWrapper.js";
import deleteFile from "../utils/deleteFile.js";
export const createFile = tryCatchWrapper(async (req, res) => {
  //for single file there is req.file in {}
  //for multiple file there is req.files in [{},{}]
  // req.file will be undefined fro req.multiple

  if (req.file) {
    //   ************for single file
    // here file information is given in req.file
    //where as other text information is given in req.body
    // let pathArray = req.file.path.split("\\"); //vvimp to split with \  use \\
    let fileName = req.file.filename;
    let path = { path: `${baseUrl}/${fileName}` };

    successResponseData({
      res,
      message: "File uploaded successfully.",
      statusCode: HttpStatus.CREATED,
      data: path,
    });

    // if mainhost/.file    is added it is searched in static file
    //localhost:8000/1672933159169houseOfJobBannerImage.png
  } else {
    let paths = req.files.map((file) => {
      let fileName = file.filename;
      let path = `${baseUrl}/${fileName}`;

      return { path: path };
    });

    successResponseData({
      res,
      message: "Files uploaded successfully.",
      statusCode: HttpStatus.CREATED,
      data: paths,
    });
  }
});

export const deleteSpecificFileController = tryCatchWrapper(
  async (req, res) => {
    deleteFile(req.params.fileName);
    successResponseData({
      res,
      message: "Files deleted successfully.",
      statusCode: HttpStatus.OK,
    });
  }
);
