import { Box, Typography } from "@mui/material";
import './sass/sectionalheading.css'

const SectionalHeading = ({head, align}) => {
    return (
        <>
            <Box className="sectionalHeading">
                <Typography variant="h2" align={align}>{head}</Typography>
            </Box>
        </>
    )
}

export default SectionalHeading