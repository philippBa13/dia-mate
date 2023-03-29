import { Box, Grid } from '@mui/material';
import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { createContext, useState } from 'react';
import ImageBar from './components/ImageBar';
import Settings from './components/Settings';
import placeHolderImg from '../../assets/images/winter_mountains_comic.jpg';

export const ImagePreviewContext = createContext({
  previewImage: placeHolderImg,
  setPreviewImage: (path: string) => {
    console.log('Not implememted');
  },
});

function AppBase() {
  const [previewImage, setPreviewImage] = useState(placeHolderImg);
  const value = { previewImage, setPreviewImage };

  return (
    <ImagePreviewContext.Provider value={value}>
      <Box sx={{ minWidth: 0 }}>
        <Grid container spacing={1} style={{ marginBottom: 2 }}>
          <Grid item xs={2.5}>
            <Settings />
          </Grid>
          <Grid item xs={9.5}>
            <div className="image-screen">
              <img src={previewImage} alt="Wonderful Winter Landscape" />
            </div>
          </Grid>
        </Grid>

        <ImageBar />
        {/* <Grid container spacing={1} sx={{ minWidth: 0, height: 'auto' }}>
        <Grid item sx={{ minWidth: 0 }} />
      </Grid> */}
      </Box>
    </ImagePreviewContext.Provider>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppBase />} />
      </Routes>
    </Router>
  );
}
