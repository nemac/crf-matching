import {  Box  } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from '@mui/material/styles';
import SectionHeader from './SectionHeader';
import RecommendSpecialistCard from '../components/RecommendSpecialistCard';


export default function RecommendSpecialist({ practitionerSpecialists, filters }) {
  const urlFilters = filters
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
          py: 6,
          backgroundColor: theme.palette.primary.cellHoverBg,
        }}
      >
        <SectionHeader title="You also might be interested in these specialists"></SectionHeader>
        
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
              // mx: 'auto',
              px: 2,
              flexWrap: 'nowrap',
              width: 'max-content',
            }}>

            {practitionerSpecialists.map((specialist, index) => 
              <RecommendSpecialistCard key={index} specialist={specialist} index={index} urlFilters={urlFilters} />
            )}
            
          </Grid>
        </Box>
      </Box>
  );
}