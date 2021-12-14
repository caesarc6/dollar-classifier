import { useState, Fragment } from "react";
import logo from "./logo.png";
import "./App.css";

/* 
  Instead of using state within classes, our project uses React Hooks. Which allows us to 
  use state and other features without writing a class for it, as you will see in the
  App function. (The first three lines of code in the App function uses React Hooks)

  The App function is our react environment and performs a few important tasks: 

  1. It will create a form on our webpage that will have an input field. The input field is
  used to upload a file, specifically an image file. There's another input field, that will
  act like a submit button, which is used to upload the image. 

  2. Once the image is uploaded, we are going to pass along this information to the express
  backend. Note: This will be further explained below. 
 */

const App = () => {
  //These three lines of code below is used to obtain all the information about the file we uploaded
  const [file, setFile] = useState();
  const [filename, setFileName] = useState("Choose File");
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  /*
    The onChange function is connected to our input field from our form. Once we have selected the
    image, this function is going to the set the file and the name of the file in the varaibles file and
    filename. 
   */
  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  /*
    The onSubmit function is connected to our submit button. Once the file is uploaded, we are 
    going to pass the file to the express backend (which is located in the backend folder, the server.js
    file). Before this can be done, we have to create a FormData object and save this in the formData variable
    as we did below. We can append the file we uploaded to the formData variable, so it can easily passed 
    to express. As seen in the fetch request below. The fetch request is going to look towards our /upload endpoint, 
    which is explained in the server.js file.

    Once our image is sent to express, express is going to send that file to our trained model, which
    is in the model folder, in a file called app.py. This will be further explained in that file.

    Express is then going to return the answer of what the trained model predicted for our image. The answer
    will either be a fifty dollar bill or a hundred dollar bill. This infromation is saved in the
    prediction varaible, by using the setPrediction function. 

   */
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    fetch("http://localhost:4000/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setPrediction(data);
      })
      .catch((err) => setError(err));
  };

  return (
    <Fragment>
      <form onSubmit={onSubmit}>
        <div className="container mt-4">
          <h4 className="display-4 text-center mb-4">
            Common Cents
            <img
              src={logo}
              alt="CommonCents Logo"
              align="center"
              width="80"
              height="90"
            />
          </h4>
        </div>

        <div className="custom-file" align="center">
          <input
            type="file"
            className="custom-file-input"
            id="customFile"
            onChange={onChange}
            required
          />
          <label className="custom-file-label" htmlFor="customFile">
            {filename}
          </label>
        </div>

        <div className="submitButton" align="center">
          <input
            type="submit"
            value="Upload"
            className="btn btn-primary btm-block mt-4"
          />
        </div>
      </form>
      <div className="prediction" align="center">
        {prediction && <h1>{prediction.prediction}</h1>}
      </div>

      <div className="error" align="center">
        {error && <h1>{error}</h1>}
      </div>
    </Fragment>
  );
};

export default App;
