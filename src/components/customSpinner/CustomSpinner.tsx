import {CircularProgress} from "@mui/material";
import React from "react";
import './CustomSpinner.css'

export const CustomSpinner: React.FC = () => {
    return (
        <div className='align-spinner'>
            <CircularProgress size="10em" color="success"/>
        </div>
    )
}

export default CustomSpinner;