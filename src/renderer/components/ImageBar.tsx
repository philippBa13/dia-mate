import { AddPhotoAlternateOutlined, ClearOutlined } from '@mui/icons-material';
import { Button, Grid } from '@mui/material';
import { useState } from 'react';
import ImageCarousel from './ImageCarousel';

export default function ImageBar() {
  const [pictures, setPictures] = useState<string[]>([]);

  async function selectPictures() {
    const newPics: string[] = await window.electron.ipcRenderer.invoke(
      'dialog:openFile'
    );
    if (newPics) {
      setPictures((oldPics) => [...oldPics, ...newPics]);
    }
  }

  function addPic(path: string) {
    if (path) {
      setPictures((oldPics) => [...oldPics, path]);
    }
  }
  return (
    <>
      <Grid container spacing={1}>
        <Grid item>
          <Button
            variant="outlined"
            onClick={() => {
              setPictures([]);
            }}
            endIcon={<ClearOutlined />}
          >
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
      <Grid
        container
        sx={{ backgroundColor: 'lightBlue', minWidth: 0, minHeight: 0 }}
      >
        <Grid item sx={{ minWidth: 0 }} />
        <ImageCarousel
          paths={pictures}
          selectPics={selectPictures}
          addPic={addPic}
        />
      </Grid>
    </>
  );
}
