import { Typography, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(theme=>({
head:{fontSize: "2.5rem !important", fontWeight:"700 !important"}
}))

const SectionHeading = ({head, align}) => {
    const classes = useStyles()
  return (
    <>
    <Box py={2}>
        <Typography className={classes.head} align={align} variant="h2">{head}</Typography>
    </Box>
    </>
  )
}

export default SectionHeading