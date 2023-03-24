import { Box, Grid } from '@mui/material';
import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import placeHolderImg from '../../assets/images/winter_mountains_comic.jpg';
import './App.css';
import ImageBar from './components/ImageBar';
import Settings from './components/Settings';

function AppBase() {
  return (
    <Box sx={{ flexGrow: 1, minWidth: 0 }}>
      <Grid container spacing={1} style={{ marginBottom: 2 }}>
        <Grid item xs={2.5}>
          <Settings />
        </Grid>
        <Grid item xs={9.5}>
          <div className="image-screen">
            <img src={placeHolderImg} alt="Wonderful Winter Landscape" />
          </div>
        </Grid>
      </Grid>

      <Grid container spacing={1}>
        <Grid item sx={{ minWidth: 0 }}>
          <ImageBar />
        </Grid>
      </Grid>
    </Box>
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
