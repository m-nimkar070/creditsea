import React, { useState } from "react";
import { useUploadFileMutation } from "../features/creditApi";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function UploadFile() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [uploadFile] = useUploadFileMutation();

  // Function to handle file change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Function to handle file upload
  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file.");
      return;
    }

    try {
      const response = await uploadFile(file);
      if (typeof response === "object" && response !== null) {
        setMessage(response.message || "File uploaded successfully!");
      } else {
        setMessage("Upload completed, but unexpected response format.");
      }
    } catch (err) {
    if (err?.data?.message) {
        setMessage(`Error: ${err.data.message}`);
      } else if (err?.error) {
        setMessage(`Error: ${err.error}`);
      } else {
        setMessage("File upload failed. Please try again.");
      }
    }
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Upload XML File
      </Typography>
      <input type="file" onChange={handleFileChange} />
      <Button
        variant="contained"
        onClick={handleUpload}
        style={{ marginTop: "10px" }}
      >
        Upload
      </Button>
      {message && (
        <Typography variant="body1" style={{ marginTop: "10px" }}>
          {message}
        </Typography>
      )}
    </div>
  );
}

export default UploadFile;
