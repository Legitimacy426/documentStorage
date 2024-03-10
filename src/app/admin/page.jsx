// pages/upload.js
"use client"
import { app } from '@/libs/firebaseConfig';

import { useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { uuid} from 'uuidv4';





const storage = getStorage(app)

export default function Upload() {
 const v4 = uuid()
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState({});
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const handleUpload = () => {
    
    files.forEach((file) => {
      const storageRef = ref(storage, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progressValue = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress((prevProgress) => ({
            ...prevProgress,
            [file.name]: progressValue,
          }));
        },
        (error) => {
          setError(error.message);
        },
        () => {
        
           getDownloadURL(ref(storage, `images/${file.name}`))
            .then((url) => {
              console.log('File available at: ', url);
            });
        }
      );
    });
  };

  return (
    <div>
      <h2>Multiple File Upload</h2>
      <input type="file" onChange={handleChange} multiple />
      <button onClick={handleUpload}>Upload</button>
      {Object.keys(progress).map((fileName) => (
        <div key={fileName}>
          {fileName}: {progress[fileName]}%
        </div>
      ))}
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
}