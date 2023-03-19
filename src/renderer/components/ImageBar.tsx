import { AddPhotoAlternateOutlined, ClearOutlined } from '@mui/icons-material';
import { Button, Grid } from '@mui/material';
import { useState } from 'react';
import ImageCarousel from './ImageCarousel';

export default function ImageBar() {
  const [pictures, setPictures] = useState<string[]>([]);

  async function selectPictures() {
    const pics: string[] = await window.electron.ipcRenderer.invoke(
      'dialog:openFile'
    );
    if (pics) {
      setPictures(pics);
    }
  }

  return (
    <>
      <Grid container spacing={1}>
        <Grid item>
          <Button variant="outlined" endIcon={<ClearOutlined />}>
            Clear
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            onClick={() => selectPictures()}
            endIcon={<AddPhotoAlternateOutlined />}
          >
            Add
          </Button>
        </Grid>
      </Grid>
      <Grid container>
        <ImageCarousel paths={pictures} />
      </Grid>
    </>
  );
}
