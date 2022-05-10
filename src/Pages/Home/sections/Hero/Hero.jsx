import { Container, Grid, Typography, Box, Paper } from "@mui/material";
import { useState } from "react";
import BlueShoe from './images/shoe.png';
import BlackShoe from './images/blackShoe.png';
import RedShoe from './images/redShoe.png';
import './sass/hero.css';

const Hero = () => {
    const [color, setColor] = useState("blue");
    return (
        <>
            <section>
                <Container maxWidth="xxl" id="hero" className="p-0" >
                    <Grid container={true} >
                        <Grid item={true} xs={12} sm={8} md={9} lg={9} id="bannerText">
                            <Box id="above">
                                <h1>Nike</h1>
                                <h2>Just Do it</h2>
                            </Box>
                            <Box id="image">
                                <img src={color === "blue" ? BlueShoe : color === "red" ? RedShoe : color === "black" ? BlackShoe : null} alt="shoe" />
                            </Box>
                            <Box id="modelInfo">
                                <div className="d-flex justify-content-end"><h2>2022</h2></div>
                                <div><h3>Air Max</h3></div>
                                <div className="d-flex justify-content-end"><h4>270</h4></div>
                            </Box>
                        </Grid>
                        <Grid item={true} xs={12} sm={4} md={3} lg={3} className="bg-white d-flex align-items-end justify-content-center" id="bannerWhite">
                            <Box style={{ width: "80%" }} component={Paper} my={3} p={2} id="heroVariantion" className="shadow">
                                <Grid container={true}>
                                    <Grid item={true} xs={10}>
                                        <Typography variant="h4">AIR MAX</Typography>
                                        <Typography variant="h5">270</Typography>
                                        <Typography variant="h6">$199</Typography>
                                    </Grid>
                                    <Grid item={true} xs={2} className="d-flex flex-column justify-content-center" >
                                        {
                                            ["blue","red", "black"].map((item, index) => {
                                                return <Box key={`clrVarHero-${index}`} mb={2} style={{ height: "1rem", width: "1rem",}} className="rounded" ><button onClick={()=> setColor(item)} style={{backgroundColor: item, display: "block", width: "100%", height:"100%", border: "none", outline:"none"}}></button></Box>
                                            })
                                        }
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </section>
        </>
    )
}

export default Hero