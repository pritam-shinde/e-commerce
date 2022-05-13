import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField, Grid } from '@mui/material';

const CustomTextField = ({ name, label, required, rule }) => {
    const { control } = useFormContext();
    const isError = false;
    return <>
        <Grid item xs={12} sm={6}>
            <Controller
                as={TextField}
                name={name}
                control={control}
                render={({field})=>(<TextField fullWidth label={label} {...field} {...rule} autoComplete="off" required />)}
            />
        </Grid>
    </>

}

export default CustomTextField