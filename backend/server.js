import fs from "fs";
import cors from "cors";
import express from "express";
import fetch from "node-fetch";
import FormData from "form-data";
import fileUpload from "express-fileupload";

const app = express();

/**
 * These two functions below are used for express to run locally on our computer
 * and to upload files
 */

app.use(fileUpload());
app.use(cors());

/**
 * The below post method performs a few important tasks:
 *
 * 1. If the user did not select a file to upload and just clicks the submit button,
 * express is going to return an error message, "No File uploaded".
 *
 * 2. If a file is uploaded express is then going to send that file to the app.py file
 * located in the model folder. We can't just send over the file we uploaded because the
 * path must be a URL.
 *
 * 3. In order to do this, we are going to create an "uploads" folder; whenever an image
 * is uploaded we are going to move the file into this folder.
 *
 * 4. Now that the image is in the uploads folder, we obtained the URL as seen in the
 * formData varaible.
 *
 * 5. The server.js file is now going to send the file over to the app.py file, which is
 * done by using a fetch request and looking towards the /predict endpoint.
 *
 * 6. After the app.py looks at the image we uploaded and predicts what kind of currency
 * it is, it will return the prediction to server.js file, which will return that prediction
 * to react(app.js), and is then displayed onto the screen.
 *
 * 7. Once app.py returns the prediction we are going to delete the image that was uploaded,
 * for two reasons:
 *  a. We don't want to overpopulate the uploads directory
 *  b. If two files with the same name is uploaded, it will cause an error
 *
 */
app.post("/upload", async (req, res) => {
  try {
    if (req.files === null) {
      return res.status(400).json({ msg: "No file uploaded" });
    }

    // fetch request to flask
    const file = req.files.file;

    //moves the file to this upload directory
    file.mv(
      `/home/melissapersaud/CTP/dollar-classifier/backend/uploads/${file.name}`,
      (err) => {
        if (err) {
          return res.status(500).send(err);
        }
      }
    );

    /*
     ADD ERROR HANDLING TO FLUFF UP THE EXPRESS ENDPOINT.
    */
    const formData = new FormData();
    formData.append(
      "file",
      fs.createReadStream(
        `/home/melissapersaud/CTP/dollar-classifier/backend/uploads/${file.name}`
      )
    );

    let prediction;

    fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        prediction = data;
        return res.json(prediction);
      })
      .catch((err) => {
        return res
          .status(400)
          .json({ msg: "There was an error with the model" });
      });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: "There was an error" });
  }
});

app.listen(4000, () => console.log("Server Started..."));
