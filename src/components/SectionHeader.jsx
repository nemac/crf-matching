import React, { useState  } from 'react';
import { Typography, Box, Grid } from '@mui/material';


export default function SectionHeader({ title }) {
    return (
        <Typography
        variant="h6"
        sx={{
            fontWeight: 700,
            color: 'primary.main'
        }}
        >
        {title}
        </Typography>
    );
}
