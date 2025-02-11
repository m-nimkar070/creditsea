import React, { useState } from 'react';
import { useUploadFileMutation } from '../features/creditApi';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function UploadFile() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [uploadFile] = useUploadFileMutation();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file.');
      return;
    }

    try {
      const response = await uploadFile(file).unwrap();
      setMessage(response);
    } catch (err) {
      setMessage('Error uploading file.');
      console.error(err);
    }
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Upload XML File
      </Typography>
      <input type="file" onChange={handleFileChange} />
      <Button variant="contained" onClick={handleUpload} style={{ marginTop: '10px' }}>
        Upload
      </Button>
      {message && <Typography variant="body1" style={{ marginTop: '10px' }}>{message}</Typography>}
    </div>
  );
}

export default UploadFile;