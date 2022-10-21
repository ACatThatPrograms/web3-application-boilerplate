import React from 'react'
import { Typography, Link } from "@mui/material";
import { ConfigurationContext } from "context/ConfigurationContext";

export function Copyright() {
    const configuration = React.useContext(ConfigurationContext);
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                {configuration.site.copyriteName}
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}