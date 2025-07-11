import {  Box  } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from '@mui/material/styles';
import SectionHeader from './SectionHeader';
import WorkExamplesCard from '../components/WorkExamplesCard';

export default function WorkExamples({ practitioner }) {
  const theme = useTheme();
  return (
      <Box
        sx={{
          width: '100vw',
          position: 'relative',
          left: '50%',
          right: '50%',
          marginLeft: '-50vw',
          marginRight: '-50vw',
          px: 6,
          py: 4,
          my: 8,
          backgroundColor: theme.palette.primary.cellHoverBg,
        }}
      >
        <SectionHeader title="Examples of Our Work"></SectionHeader>
        
        <Box
          sx={{
            overflowX: 'auto',
            px: 2, // padding inside scroll container
          }}
        >
          <Grid 
            container
            spacing={2}
            gap={2}
            sx={{ 
              p: 2, 
              my: 4,
              px: 2,
              flexWrap: 'nowrap',
              width: 'max-content',
            }}>


            <WorkExamplesCard title={practitioner.example1_title} description={practitioner.example1_description} exampleLink={practitioner.example1_links} />
            <WorkExamplesCard title={practitioner.example2_title} description={practitioner.example2_description} exampleLink={practitioner.example2_links} />
            <WorkExamplesCard title={practitioner.example3_title} description={practitioner.example3_description} exampleLink={practitioner.example3_links} />


          </Grid>
        </Box>
      </Box>
  );
}

                        