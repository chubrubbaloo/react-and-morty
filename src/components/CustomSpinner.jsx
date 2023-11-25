import {CircularProgress} from "@mui/material";
import React from "react";

function CustomSpinner() {
    return (
        <div className="m-5">
            <CircularProgress size="10em" color="success"/>
            <h2 className="m-5">Loading...</h2>
        </div>
    )
}

export default CustomSpinner;