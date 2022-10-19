import React, {useEffect, useState} from "react";
import {
    DialogContent,
    DialogActions,
    Button,
    CircularProgress,
    TextField, Box, Autocomplete, FormGroup,
} from "@mui/material";
import {
    getOneCityCall,
    removeOneCity,
    patchCityCall, getAllCountryCall,
} from "../Redux/Home/actions";
import {useDispatch, useSelector} from "react-redux";

function EditDialog({id, handleClose}: any) {
    const dispatch: any = useDispatch();

    const city = useSelector((store: any) => store.getAllCityDataReducer.oneCity);
    const countries = useSelector(
        (store: any) => store.getAllCityDataReducer.allCountryData
    );

    const [countryValue, setCountryValue] = useState<any>(null);
    const [cityValue, setCityValue] = useState<any>(null);
    const [population, setPopulation] = useState<any>(null);

    useEffect(() => {
        dispatch(getAllCountryCall());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        dispatch(getOneCityCall(id));
        return () => {
            dispatch(removeOneCity());
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const handleSubmit = (event: any) => {
        event.preventDefault();

        let payload: any = {};
        if (countryValue !== null) {
            payload.country = countryValue.country
        } else {
            payload.country = city.country
        }
        if (population !== null) {
            payload.population = population;
        } else {
            payload.population = city.population;
        }
        if (cityValue !== null) {
            payload.city = cityValue;
        } else {
            payload.city = city.city;
        }
        if (Object.keys(payload).length > 0) {
            dispatch(patchCityCall(id, payload))
        }
        handleClose();
    };


    const defaultCountryObject = {
        id: "FakeId",
        country: city?.country,
    }
    return (
        <>
            {!city ? (
                <CircularProgress/>
            ) : (
                <form style={{padding: 1}} onSubmit={handleSubmit}>
                    <DialogContent>
                        <TextField
                            label="City"
                            required
                            defaultValue={city.city}
                            value={cityValue || city.city}
                            onChange={(event: any) => setCityValue(event.target.value)}
                            placeholder="Enter City..."
                            InputLabelProps={{shrink: true}}
                        />{" "}

                        <TextField
                            label="Population"
                            required
                            defaultValue={city.population}
                            value={population || city.population}
                            onChange={(event: any) => setPopulation(Number(event.target.value))}
                            placeholder="Enter Population..."
                            InputLabelProps={{shrink: true}}
                        />
                        <br/>
                        <br/>
                        <Autocomplete

                            id="country-select"
                            onChange={(_: any, newValue: any) => {
                                setCountryValue(newValue);
                            }}
                            defaultValue={defaultCountryObject}
                            value={countryValue || defaultCountryObject || null}
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

                    </DialogContent>
                    <DialogActions>
                        <Button type="submit">Submit</Button>
                    </DialogActions>
                </form>
            )}
        </>
    );
}

export default EditDialog;
