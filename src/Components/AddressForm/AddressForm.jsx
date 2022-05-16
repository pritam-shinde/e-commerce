import { Box, InputLabel, Select, MenuItem, Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { commerce } from "../../lib/commerce";
import { CustomTextField } from "../Components";
import { Link } from "react-router-dom";

const AddressForm = ({ checkoutToken, next }) => {
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');
    const methods = useForm();

    const fetchShippingCountries = async (checkoutTokenId) => {
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries)[0]);
    };

    const countries = Object.entries(shippingCountries).map(([code, label]) => (({ id: code, name: label })))
    const divisions = Object.entries(shippingSubdivisions).map(([code, label]) => (({ id: code, name: label })))
    const options = shippingOptions.map((sO) => ({ id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})` }))

    const fetchSubdivisions = async (countryCode) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);
        setShippingSubdivisions(subdivisions);
        setShippingSubdivision(Object.keys(subdivisions)[0]);
    };

    const fetchShippingOptions = async (checkoutTokenId, country, stateProvince = null) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region: stateProvince });

        setShippingOptions(options);
        setShippingOption(options[0].id);
    };

    useEffect(() => {
        fetchShippingCountries(checkoutToken.id);
    }, [checkoutToken]);

    useEffect(() => {
        if (shippingCountry) fetchSubdivisions(shippingCountry);
    }, [shippingCountry]);

    useEffect(() => {
        if (shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
    }, [shippingSubdivision, shippingCountry, checkoutToken.id]);

    return (
        <>
            <Box p={3}>
                <Typography variant="h6" gutterBottom>Shipping Address</Typography>
                <FormProvider {...methods} >
                    <form  onSubmit={methods.handleSubmit((data)=> next({...data, shippingCountry, shippingSubdivision, options,}))}>
                        <Grid container={true} spacing={3}>
                            <CustomTextField required name="firstName" label="First Name" rule={{ maxLength: 80 }} />
                            <CustomTextField required name="lastName" label="Last Name" rule={{ maxLength: 80 }} />
                            <CustomTextField required name="email" label="Email" rule={{ pattern: /^\S+@\S+$/i }} />
                            <CustomTextField required name="phone" label="Mobile No." rule={{ minLength: 10, maxLength: 12 }} />
                            <CustomTextField required name="address" label="Address 1" />
                            <CustomTextField required name="City" label="City" />
                            <CustomTextField required name="zip" label="Zip" />
                            <Grid item={true} xs={12} sm={6}>
                                <InputLabel className="mb-3">Shipping Country</InputLabel>
                                <Select fullWidth value={shippingCountry} onChange={(e) => setShippingCountry(e.target.value)}>
                                    {
                                        countries.map(country => <MenuItem key={country.id} value={country.id}>{country.name}</MenuItem>)
                                    }
                                </Select>
                            </Grid>
                            <Grid item={true} xs={12} sm={6}>
                                <InputLabel>Shipping Subdivison</InputLabel>
                                <Select fullWidth value={shippingSubdivision} onChange={(e) => setShippingSubdivision(e.target.value)}>
                                    {
                                        divisions.map(division => <MenuItem key={division.id} value={division.id}>{division.name}</MenuItem>)
                                    }
                                </Select>
                            </Grid>
                            <Grid item={true} xs={12} sm={6}>
                                <InputLabel>Shipping Option</InputLabel>
                                <Select fullWidth value={shippingOption} onChange={(e) => setShippingOption(e.target.value)}>
                                    {
                                        options.map(option => <MenuItem key={option.id} value={option.id}>
                                            {option.label}
                                        </MenuItem>)
                                    }
                                </Select>
                            </Grid>
                        </Grid>
                        <Box mt={3} style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button component={Link} variant="outlined" to="/cart">Back to Cart</Button>
                            <Button type="submit" variant="contained" color="primary">Next</Button>
                        </Box>
                    </form>
                </FormProvider>
            </Box>
        </>
    )
}

export default AddressForm
