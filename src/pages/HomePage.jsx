import { Box, Container, Stack, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
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
                    </Box >
                    {/*How registry works*/}
                    <Box 
                        sx={{
                            height:'418px',
                            alignItems:'center',
                            display:'flex',
                            justifyContent:'center',
                        }}
                    >
                        <Box sx={{ 
                            height:'80%',
                            width:'80%',
                            backgroundColor: '#F9FAFB',
                            border:'2px solid',
                            borderColor:'#E1F5FE',
                            borderRadius:2
                        }}
                        >
                            {/*This has the two sentences before the 3 boxes */}
                            <Typography
                                sx={{
                                    textAlign:'center',
                                    pt:3,
                                    fontWeight:700,
                                    fontSize:'24px',
                                    fontFamily:'Roboto',
                                    color:'#101828',
                                }}
                            >
                                How the Registry Works
                            </Typography>
                            <Typography
                                sx={{
                                    textAlign:'center',
                                    fontWeight:400,
                                    fontSize:'18px',
                                    fontFamily:'Roboto',
                                    color:'#56657D',
                                    pb:10,

                                }}
                            >
                                A simple, streamlined process to connect you with the expertise you need.
                            </Typography>
                            {/*nested boxes will hold the 3 boxes within the how registry works*/}
                            <Box 
                                sx={{
                                    display:'flex',
                                    alignItems:'center',
                                    justifyContent:'space-between',
                                    px:16,

                                }}
                            >
                                <Box
                                    sx={{
                                        display:'flex',
                                        alignItems:'center',
                                        width:'100%',
                                    }}
                                >
                                    <Box>
                                        <Box
                                            sx = {{
                                                width:42,
                                                height:42,
                                                display:'flex',
                                                gap:'18px',
                                                justifyContent:'center',
                                                alignItems:'center',
                                                backgroundColor:"#003366",
                                                borderRadius:'50%',
                                            }}
                                        >
                                            {/*Icon to be changed to image from figma*/}
                                            <SearchIcon 
                                                sx={{
                                                    color:'#FFFFFF',
                                                    fontSize:30
                                                }}/> 

                                        </Box>
                                    </Box>
                                    <Box
                                        sx={{
                                            margin:'0 auto',
                                        }}
                                    >Feat 2</Box>
                                    <Box>Feat 3</Box>
                                </Box>
                            </Box>


                        </Box>
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                        The Registry includes two categories of practitioners
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>How to apply</Box>
                </Stack>
            </Container>
        </>
    );
}
