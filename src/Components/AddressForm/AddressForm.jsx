import { Box, InputLabel, Select, MenuItem, Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { commerce } from "../../lib/commerce";
import { CustomTextField } from "../Components";

const AddressForm = ({ checkoutToken }) => {
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');
    const methods = useForm();

    const fetchShippingCountries = async (checkoutTokenId) => {
        console.log(checkoutTokenId)
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
        console.log(countries)
        // setShippingCountries(countries);
        // setShippingCountry(Object.keys(countries)[0]);
    };

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
    }, [shippingSubdivision]);

    console.log(shippingCountries)

    return (
        <>
            <Box p={3}>
                <Typography variant="h6" gutterBottom>Shipping Address</Typography>
                <FormProvider {...methods} >
                    <form>
                        <Grid container={true} spacing={3}>
                            <CustomTextField required name="firstName" label="First Name" />
                            <CustomTextField required name="lastName" label="Last Name" />
                            <CustomTextField required name="email" label="Email" />
                            <CustomTextField required name="phone" label="Mobile No." />
                            <CustomTextField required name="address" label="address" />
                            <CustomTextField required name="City" label="City" />
                            <CustomTextField required name="zip" label="Zip" />
                            <Grid item={true} xs={12} sm={6}>
                                <InputLabel className="mb-3">Shipping Country</InputLabel>
                                <Select fullWidth>
                                    <MenuItem >

                                    </MenuItem>
                                </Select>
                            </Grid>
                            <Grid item={true} xs={12} sm={6}>
                                <InputLabel>Shipping Subdivison</InputLabel>
                                <Select fullWidth>
                                    <MenuItem >

                                    </MenuItem>
                                </Select>
                            </Grid>
                            <Grid item={true} xs={12} sm={6}>
                                <InputLabel>Shipping Option</InputLabel>
                                <Select fullWidth>
                                    <MenuItem >

                                    </MenuItem>
                                </Select>
                            </Grid>
                        </Grid>
                    </form>
                </FormProvider>
            </Box>
        </>
    )
}

export default AddressForm