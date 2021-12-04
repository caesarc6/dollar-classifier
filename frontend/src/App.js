import { useState, Fragment } from "react";

const App = () => {
  const [file, setFile] = useState();
  const [filename, setFileName] = useState("Choose File");
  const [prediction, setPrediction] = useState(null);

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    console.log(file);

    fetch("http://localhost:4000/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPrediction(data);
      });
  };

  return (
    <Fragment>
      <form onSubmit={onSubmit}>
        <div className="custom-file">
          <input
            type="file"
            className="custom-file-input"
            id="customFile"
            onChange={onChange}
          />
          <label className="custom-file-label" htmlFor="customFile">
            {filename}
          </label>
        </div>
        <input
          type="submit"
          value="Upload"
          className="btn btn-primary btm-block mt-4"
        />
      </form>
      {prediction && <h1>{prediction.prediction}</h1>}
    </Fragment>
  );
};

export default App;
