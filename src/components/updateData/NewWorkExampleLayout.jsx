import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const SectionHeader = ({ children, sx = {} }) => {
  return (
    <Typography
      variant="h4"
      sx={{
        fontWeight: 'bold',
        mb: 1,
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
};

SectionHeader.propTypes = {
  children: PropTypes.node.isRequired,
  sx: PropTypes.object,
};

const NewWorkExampleLayout = props => {
  const { workExampleData, organizationName } = props;

  return (
    <Box sx={{ maxWidth: '1200px' }}>
      <Typography
        variant="h2"
        component="h1"
        sx={{
          color: 'primary.main',
          fontWeight: 'bold',
          mt: 4,
          mb: 4,
        }}
      >
        {workExampleData.title || 'Example of Our Work Title'}
      </Typography>

      <SectionHeader>Practitioner Organization</SectionHeader>
      <Box sx={{ ml: 2, mb: 4 }}>
        <Typography
          sx={{
            color: '#003366',
            fontWeight: 500,
          }}
        >
          {organizationName || 'Adaptation Practitioner Name'}
        </Typography>
      </Box>

      <SectionHeader>Project Title</SectionHeader>
      <Box sx={{ ml: 2, mb: 4 }}>
        <Typography
          sx={{
            color: '#003366',
            fontWeight: 500,
          }}
        >
          {workExampleData.title || 'Project Name'}
        </Typography>
      </Box>

      <SectionHeader>Project Location</SectionHeader>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ml: 2, mb: 4 }}>
        <LocationOnIcon sx={{ color: '#666' }} />
        <Typography sx={{ color: '#666' }}>
          {workExampleData.location || 'City, State'}
        </Typography>
      </Box>

      <SectionHeader>Project Description</SectionHeader>
      <Box sx={{ ml: 2, mb: 4 }}>
        <Typography sx={{ color: '#666' }}>
          {workExampleData.description || 'Description'}
        </Typography>
      </Box>

      <SectionHeader>
        Approach to Stakeholder Engagement in this Project
      </SectionHeader>
      <Box sx={{ ml: 2, mb: 4 }}>
        <Typography sx={{ color: '#666' }}>
          {workExampleData.engagement || 'Description'}
        </Typography>
      </Box>

      <SectionHeader>Approach to Equity in this Project</SectionHeader>
      <Box sx={{ ml: 2, mb: 4 }}>
        <Typography sx={{ color: '#666' }}>
          {workExampleData.equity || 'Description'}
        </Typography>
      </Box>
    </Box>
  );
};

NewWorkExampleLayout.propTypes = {
  workExampleData: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    location: PropTypes.string,
    engagement: PropTypes.string,
    equity: PropTypes.string,
    lead: PropTypes.string,
  }).isRequired,
  organizationName: PropTypes.string,
};

export default NewWorkExampleLayout;
