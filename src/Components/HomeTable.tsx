import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  SelectChangeEvent,
  TextField,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CircularProgress from "@mui/material/CircularProgress";
import HomeTableRow from "./HomeTableRow";
import {
  filterByCountryCall,
  getAllCityDataActionCall,
  sortCityByPopulationCall,
} from "../Redux/Home/actions";
import {useDispatch, useSelector} from "react-redux";
import UseDebounce from "./UseDebounce";
import {useNavigate} from "react-router-dom";

export default function HomeTable() {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();

  const rows = useSelector(
      (store: any) => store.getAllCityDataReducer.allCityData
  );

  const [population, setPopulation] = React.useState<string>("");
  const [filterValue, setFilterValue] = React.useState<string>("");
  const debouncedValue = UseDebounce(filterValue, 500);

  React.useEffect(() => {
    dispatch(getAllCityDataActionCall());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (debouncedValue.length < 2) {
      dispatch(getAllCityDataActionCall());
    } else {
      dispatch(filterByCountryCall(debouncedValue));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  const handleSortPopulation = (event: SelectChangeEvent) => {
    const {value} = event.target;

    if (value === "LtoH") {
      dispatch(sortCityByPopulationCall("population", "asc"));
      setPopulation(value);
    } else if (value === "HtoL") {
      dispatch(sortCityByPopulationCall("population", "desc"));
      setPopulation(value);
    } else {
      dispatch(sortCityByPopulationCall("", ""));
      setPopulation("");
    }
  };


  return (
      <div style={{height: 400, width: "760px"}}>
        <Box sx={{display: "flex", gap: 2, justifyContent: "center"}} p={2}>
          <FormControl sx={{minWidth: 230}}>
            <InputLabel id="select-label">Population</InputLabel>
            <Select
                labelId="select-label"
                id="select"
                value={population}
                label="Population"
                onChange={(event: SelectChangeEvent) => handleSortPopulation(event)}
            >
              <MenuItem value="default">Default</MenuItem>
              <MenuItem value="LtoH">Low To High</MenuItem>
              <MenuItem value="HtoL">High To Low</MenuItem>
            </Select>
          </FormControl>
          <TextField
              sx={{minWidth: 200}}
              id="search-bar"
              label="Search"
              variant="outlined"
              value={filterValue}
              onChange={(
                  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => setFilterValue(event.target.value)}
          />
          <Button
              onClick={() => navigate("/add-city")}
              variant="contained"
              startIcon={<AddIcon/>}
          >
            City
          </Button>
          <Button
              onClick={() => navigate("/add-country")}
              variant="contained"
              startIcon={<AddIcon/>}
          >
            Country
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{minWidth: 650}} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Country</TableCell>
                <TableCell>City</TableCell>
                <TableCell>Population</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.length > 0 ? (
                  rows.map((row: any) => <HomeTableRow key={row.id} {...row} />)
              ) : (
                  <CircularProgress/>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
  );
}
