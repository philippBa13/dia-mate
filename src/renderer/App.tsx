import { Grid } from '@mui/material';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Settings from './components/Settings';
import './App.css';
import ImageBar from './components/ImageBar';
import placeHolderImg from '../../assets/images/winter_mountains_comic.jpg';

function AppBase() {
  return (
    <Grid container spacing={0}>
      <Grid item>
        <Grid container spacing={1}>
          <Grid item xs={2.5}>
            <Settings />
          </Grid>
          <Grid item xs={9.5}>
            <img src={placeHolderImg} alt="Wonderful Winter Landscape" />
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <Grid container spacing={1}>
          <Grid item>
            <ImageBar />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
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
