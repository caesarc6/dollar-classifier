import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import fetch from "node-fetch";
import FormData from "form-data";
import fs from "fs";

const app = express();

app.use(fileUpload());
app.use(cors());

app.post("/upload", async (req, res) => {
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
        console.error(err);
        return res.status(500).send(err);
      }
    }
  );

  /*
  BECAUSE IMAGE MUST BE A URL, SAVE IMAGE AND THEN DELETE IT WHEN FINISHED WITH IT BEFORE RESPONSE.
  PYTHON WILL HANDLE THE IMAGE PREP AND PREDICTION. RETURN THE PYTHON RESPONSE.

  ADD SOME ERROR HANDLING TO FLUFF UP THE EXPRESS ENDPOINT.
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
    });
});

app.listen(4000, () => console.log("Server Started..."));
