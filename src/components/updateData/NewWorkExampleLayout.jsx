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
      <Typography variant="h1" sx={{ mb: 3 }}>
        {workExampleData.title || 'Example of Our Work Title'}
      </Typography>

      <SectionHeader>Practitioner Organization</SectionHeader>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ml: 2, mb: 8 }}>
        <Typography component="div" variant="body1">
          {organizationName || 'Adaptation Practitioner Name'}
        </Typography>
      </Box>

      <SectionHeader>Project Title</SectionHeader>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ml: 2, mb: 8 }}>
        <Typography component="div" variant="body1">
          {workExampleData.title || 'Project Name'}
        </Typography>
      </Box>

      <SectionHeader>Project Location</SectionHeader>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ml: 2, mb: 8 }}>
        <LocationOnIcon sx={{ color: 'text.secondary', fontSize: '1rem' }} />
        <Typography component="div" variant="body1">
          {workExampleData.location || 'City, State'}
        </Typography>
      </Box>

      <SectionHeader>Project Description</SectionHeader>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ml: 2, mb: 8 }}>
        <Typography component="div" variant="body1">

          {workExampleData.description || 'Description'}
        </Typography>
      </Box>

      <SectionHeader>Approach to Stakeholder Engagement in this Project</SectionHeader>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ml: 2, mb: 8 }}>
        <Typography component="div" variant="body1">

          {workExampleData.engagement || 'Description'}
        </Typography>
      </Box>

      <SectionHeader>Approach to Equity in this Project</SectionHeader>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ml: 2, mb: 8 }}>
        <Typography component="div" variant="body1">
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
