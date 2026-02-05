import { Container, Box, Grid } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import NavBar from '../components/NavBar';
import {
    CallToActionButton,
    AltButton,
    SecondaryButton,
    TertiaryButton,
    AltActionButton,
    BroadServiceProvider,
    SpecialistLabel,
    FilterRemove,
} from '../components/baseComponents';
const ComponentDisplay = ({ children }) => (
    <Box>
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
            }}
        >
            {children}
        </Box>
    </Box>
);

export default function AllComponents() {
    return (
        <ThemeProvider theme={theme}>
            <NavBar />
            <Container
                maxWidth="xl"
                sx={{
                    pt: 4,
                    pb: 8,
                    px: { xs: 4, sm: 4, md: 4, lg: 3 },
                }}
            >
                <Grid container spacing={3}>
                    <Grid item xs={12} md={3}>
                        <ComponentDisplay name="CallToActionButton">
                            <CallToActionButton />
                        </ComponentDisplay>
                        <ComponentDisplay name="AltButton">
                            <AltButton/>
                        </ComponentDisplay>
                        <ComponentDisplay name ="SecondaryButton">
                            <SecondaryButton/>
                        </ComponentDisplay>
                        <ComponentDisplay name ="TertiaryButton">
                            <TertiaryButton/>
                        </ComponentDisplay>
                        <ComponentDisplay name ="AltActionButton">
                            <AltActionButton/>
                        </ComponentDisplay>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <ComponentDisplay name="BroadServiceProvider">
                            <BroadServiceProvider/>
                        </ComponentDisplay>
                        <ComponentDisplay name="SpecialistLabel">
                            <SpecialistLabel/>
                        </ComponentDisplay>
                        <ComponentDisplay name="FilterRemove">
                            <FilterRemove/>
                        </ComponentDisplay>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    );
}
