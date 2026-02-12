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
                        <Typography>
                            Browse all {totalPractitioners} practitioners section
                        </Typography>
                        <Typography>
                            A simple, streamlined process to connect you with
                        </Typography>
                        <AltActionButton text="Browse all Practitioners"textSx ={{
                            fontWeight: 400,
                            fontFamily: 'Roboto',
                            fontSize: '14px',
                            height: 21

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
