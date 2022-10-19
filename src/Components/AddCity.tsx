import React, {useEffect, useState} from "react";
import {
    Button,
    FormGroup,
    TextField,
    Box,
    IconButton,
    Snackbar,
    Autocomplete,
    CircularProgress,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getAllCountryCall, postCityCall} from "../Redux/Home/actions";

function AddCity() {
    const dispatch: any = useDispatch();
    const navigate = useNavigate();

    const countries = useSelector(
        (store: any) => store.getAllCityDataReducer.allCountryData
    );

    const [openSnackBar, setSnackBar] = useState(false);
    const [city, setCity] = useState<string>("");
    const [population, setPopulation] = useState<number | null | string>(null);
    const [countryValue, setCountryValue] = useState<any>(null);

    useEffect(() => {
        dispatch(getAllCountryCall());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleFormSubmit = (event: any) => {
        event.preventDefault();
        if (countryValue?.country) {
            const payload = {
                city,
                population,

                country: countryValue.country,
            };
            dispatch(postCityCall(payload));
        }
        setSnackBar(true);
        setCity("");
        setPopulation("");
    };


    return (
        <Box>
            <IconButton onClick={() => navigate("/")} color="primary">
                <HomeIcon fontSize="large"/>
            </IconButton>
            <form onSubmit={handleFormSubmit}>
                <FormGroup>
                    <TextField
                        label="City"
                        required
                        value={city}
                        placeholder="Enter City..."
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                        ) => setCity(event.target.value)}
                    />
                    <br/>
                    <TextField
                        type="number"
                        label="Population"
                        required
                        value={population}
                        placeholder="Enter Population..."
                        onChange={(event: any) => setPopulation(Number(event.target.value))}
                    />
                    <br/>
                    {countries.length > 0 ? (
                        <Autocomplete
                            id="country-select"
                            onChange={(_: any, newValue: any) => {
                                setCountryValue(newValue);
                            }}
                            sx={{width: 300}}
                            options={countries}
                            autoHighlight
                            getOptionLabel={(option: any) => option.country}
                            renderOption={(props, option: any) => (
                                <Box component="li" {...props}>
                                    {option.country}
                                </Box>
                            )}
                            renderInput={(params) => (
                                <TextField
                                    required
                                    {...params}
                                    label="Choose a country"
                                    inputProps={{
                                        ...params.inputProps,
                                        autoComplete: "new-password",
                                    }}
                                />
                            )}
                        />
                    ) : (
                        <CircularProgress/>
                    )}
                </FormGroup>
                <br/>
                <FormGroup>
                    <Button type="submit" variant="outlined">
                        Submit
                    </Button>
                </FormGroup>
            </form>
            <Snackbar
                open={openSnackBar}
                autoHideDuration={5000}
                message="City Added"
            />
        </Box>
    );
}

export default AddCity;
