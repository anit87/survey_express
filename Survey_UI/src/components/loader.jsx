import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loader() {
  return (
    <div className='d-flex justify-content-center' style={{margin:"5rem"}}>
      <CircularProgress />
    </div>
  );
}