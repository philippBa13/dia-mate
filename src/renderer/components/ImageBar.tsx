import { AddPhotoAlternateOutlined, ClearOutlined } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import ImageCarousel from "./ImageCarousel";


export default function ImageBar() {

    return (
        <>
            <Grid container spacing={1}>
                <Grid item>
                    <Button variant="outlined" endIcon={<ClearOutlined />}>
                        Clear
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="outlined" endIcon={<AddPhotoAlternateOutlined />}>
                        Add
                    </Button>
                </Grid>
            </ Grid>
            <Grid container>
                <ImageCarousel />
            </Grid>
        </>
    )
}