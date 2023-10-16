import { Snackbar } from "@mui/material";
import {Alert} from "@mui/material";

const Notification = ({open, handleClose, content}) => {

 return(
 <div style ={{position: "fixed", top: "13%", left: "70%", width:"40%" , transform: "translate(-50%, -50%)" }}>
 <Snackbar open={open} autoHideDuration={6000} >
    <Alert onClose={handleClose} severity="error">
        {content}
    </Alert>
  </Snackbar>
  </div>
 )
};

export default Notification;
