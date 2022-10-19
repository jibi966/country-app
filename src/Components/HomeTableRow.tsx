import {
    TableCell,
    TableRow,
    Button,
    Dialog,
    DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {deleteCityActionCall} from "../Redux/Home/actions";
import {useDispatch} from "react-redux";
import {useState} from "react";
import EditDialog from "./EditDialog";

interface IProps {
    id: number | string;
    country: string;
    city: string;
    population: number | string;
}


function HomeTableRow({id, country, city, population}: IProps) {
    const dispatch: any = useDispatch();

    const [open, setOpen] = useState<boolean>(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleDeleteCity = (id: number | string) => {
        dispatch(deleteCityActionCall(id));
    };

    return (
        <>
            <TableRow
                key={id}
                sx={{"&:last-child td, &:last-child th": {border: 0}}}
            >
                <TableCell component="th" scope="row">
                    {id}
                </TableCell>
                <TableCell align="left">{country}</TableCell>
                <TableCell>{city}</TableCell>
                <TableCell>{population}</TableCell>
                <TableCell>
                    <Button
                        onClick={handleClickOpen}
                        variant="outlined"
                        startIcon={<EditIcon/>}
                    >
                        Edit
                    </Button>
                </TableCell>
                <TableCell>
                    <Button
                        onClick={() => handleDeleteCity(id)}
                        variant="outlined"
                        startIcon={<DeleteIcon/>}
                    >
                        Delete
                    </Button>
                </TableCell>
            </TableRow>
            <Dialog fullWidth open={open} onClose={handleClose}>
                <DialogTitle>Edit Data</DialogTitle>
                <EditDialog id={id} handleClose={handleClose}/>
            </Dialog>
        </>
    );
}

export default HomeTableRow;
