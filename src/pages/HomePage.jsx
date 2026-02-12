import { Box, Container, Stack, Typography } from '@mui/material';
import NavBar from '../components/NavBar.jsx';
import { fetchTotalPractitionerCount } from '../util/api.js';
import { useEffect,useState } from 'react';
import AltActionButton from '../components/baseComponents/AltActionButton.jsx';
export default function HomePage() {
    const [totalPractitioners, setTotalPractitioners] = useState(0);
    useEffect (() =>{
        fetchTotalPractitionerCount(setTotalPractitioners);
    },[]);
    return (
        <>
            <NavBar />
            <Container maxWidth="xl">
                <Stack direction="column" spacing={8} sx={{ mt: 4 }}>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography
                            sx= {{
                                fontFamily: 'Roboto',
                                fontSize: '24px',
                                fontWeight: 500,
                        }}>
                            Browse all{" "} 
                            <Box component="span"
                            sx={{
                                    fontFamily:'Roboto',
                                    fontWeight:700,
                                    fontSize:'24px',
                                    color:'#003366',
                                }}
                            >
                                {totalPractitioners}
                            </Box> 
                            {" "}practitioners section
                        </Typography>
                       {/* Mid below*/} 
                        <Typography sx={{p:'10px'}}>
                            A simple, streamlined process to connect you with the expertise you need.
                        </Typography>
                       {/* Button below should be changed once the main practitioners page is done*/} 
                        <AltActionButton to="/ComparePractitioners" text="Browse all Practitioners"textSx ={{
                            fontWeight: 400,
                            fontFamily: 'Roboto',
                            fontSize: '14px',
                            color:'#2D3F5D',

                        }}
                        />
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>How the Registry Works</Box>
                    <Box sx={{ textAlign: 'center' }}>
                        The Registry includes two categories of practitioners
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>How to apply</Box>
                </Stack>
            </Container>
        </>
    );
}
