import React, { useState } from 'react';

const Upload = ({ previewSource, setPreviewSource }) => {
    const [fileInputState, setFileInputState] = useState();

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        previewFile(file);
    };

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        };
    };

    return (
        <div className='upload-container'>
            <h1>Image</h1>
            <input type="file" name="image" value={fileInputState} onChange={handleFileInputChange} />
            {previewSource && (
                <img src={previewSource} alt="chosen" style={{ height: '100px' }} />
            )}
        </div>
    );
};

export default Upload;

