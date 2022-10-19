import {
  Button,
  FormGroup,
  TextField,
  Box,
  IconButton,
  Snackbar,
} from "@mui/material";
import { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import { postCountryCall } from "../Redux/Home/actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function AddCountry() {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();

  const [country, setCountry] = useState("");
  const [openSnackBar, setSnackBar] = useState<boolean>(false);

  const handleFormSubmit = (event: any) => {
    event.preventDefault();
    dispatch(postCountryCall(country));
    setSnackBar(true);
    setCountry("");
  };

  return (
    <Box>
      <IconButton onClick={() => navigate("/")} color="primary">
        <HomeIcon fontSize="large" />
      </IconButton>
      <form onSubmit={handleFormSubmit}>
        <FormGroup>
          <TextField
            label="Country"
            value={country}
            required
            placeholder="Enter Country..."
            onChange={(event) => setCountry(event.target.value)}
          />
        </FormGroup>
        <br />
        <FormGroup>
          <Button type="submit" variant="outlined">
            Submit
          </Button>
        </FormGroup>
      </form>
      <Snackbar
        open={openSnackBar}
        autoHideDuration={5000}
        message="Country Added"
      />
    </Box>
  );
}

export default AddCountry;
