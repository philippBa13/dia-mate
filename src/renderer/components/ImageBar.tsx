import { AddPhotoAlternateOutlined, ClearOutlined } from '@mui/icons-material';
import { Button, Grid } from '@mui/material';
import { useContext, useState } from 'react';
import { ImagePreviewContext } from 'renderer/App';
import ImageCarousel from './ImageCarousel';
import placeHolderImg from '../../../assets/images/winter_mountains_comic.jpg';
import { useSwiper } from 'swiper/react';

const SUPPORTED_IMG_TYPES = ['jpg', 'jpeg', 'png', 'svg', 'gif'] as const;
export type SupportedImageType = (typeof SUPPORTED_IMG_TYPES)[number];

export default function ImageBar() {
  const [pictures, setPictures] = useState<string[]>([]);
  const { previewImage, setPreviewImage } = useContext(ImagePreviewContext);

  function isSupportedType(ext: string): ext is SupportedImageType {
    return SUPPORTED_IMG_TYPES.includes(ext as SupportedImageType);
  }

  function addPic(path: string, setAsPreview: boolean) {
    if (path) {
      const ext = path.substring(path.lastIndexOf('.') + 1).toLowerCase();
      if (isSupportedType(ext)) {
        setPictures((oldPics) => [...oldPics, path]);
        console.log(previewImage);
        console.log(placeHolderImg);
        if (setAsPreview && previewImage === placeHolderImg) {
          setPreviewImage(path);
        }
      }
    }
  }

  function removePic(path: string) {
    setPictures((oldPics) => oldPics.filter((el) => el !== path));
  }

  async function selectPictures() {
    const newPics: string[] = await window.electron.ipcRenderer.invoke(
      'dialog:openFile'
    );
    if (newPics) {
      newPics
        .filter((el) => {
          const ext = el.substring(el.lastIndexOf('.') + 1).toLowerCase();
          return isSupportedType(ext);
        })
        .forEach((el, idx) => {
          addPic(el, idx === 0);
        });
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
              setPreviewImage(placeHolderImg);
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
          removePic={removePic}
        />
      </Grid>
    </>
  );
}
