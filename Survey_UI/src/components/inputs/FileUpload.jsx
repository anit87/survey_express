import React from 'react';
import { Button } from '@mui/material';
import { useLanguageData } from '../../utils/LanguageContext';

const inputStyles = {
  position: 'absolute',
  top: 0,
  left: 0,
  opacity: 0,
  width: '100%',
  height: '100%',
  cursor: 'pointer',
}

function FileUpload({ onInputChange, index, name }) {
  const {translate} = useLanguageData();
  const handleChildInputChange = (event) => {
    onInputChange(event, index);
  };

  return (
    <Button>
      {translate('Upload')}
      <input
        style={inputStyles}
        type="file"
        onChange={handleChildInputChange}
        id='file-upload'
        name={name}
        accept='.pdf, .doc, .docx, .png, .jpeg, .jpg'
      />
    </Button>
  );
}

export default FileUpload;