import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import FormTextField from './FormTextField.jsx';
import MultiLineFormTextField from './MultiLineFormTextField.jsx';
const WorkExampleForm = (props) => {
  const { title, description, links, location, engagement, equity, lead, exampleNumber, onClose, handleChange } = props;

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  function SectionHeader({ children, sx = {} }) {
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
  }

  return (
    <Box sx={{ maxWidth: '1200px' }}>
      <Typography
        variant="h2"
        component="h1"
        sx={{
          color: 'primary.main',
          fontWeight: 'bold',
          mt: 4,
          mb: 2,
        }}
      >
        {title}
      </Typography>
      <SectionHeader>Project Title</SectionHeader>
      <Box sx={{ ml: 2, mb: 4 }}>
        <Box>
          <FormTextField
            label="Project Title"
            name="title"
            value={title}
            onChange={handleChange}
            fullWidth
          />
        </Box>
      </Box>
      <SectionHeader>Project Location</SectionHeader>
      <Box sx={{ ml: 2, mb: 4 }}>
        <FormTextField
          label="Project Location"
          name="location"
          value={location}
          onChange={handleChange}
          fullWidth
        />
      </Box>
      <SectionHeader>Project Lead</SectionHeader>
      <Box sx={{ ml: 2, mb: 4 }}>
        <Box>
          <FormTextField
            label="Project Lead"
            name="lead"
            value={lead}
            onChange={handleChange}
            fullWidth
          />
        </Box>
      </Box>
      <SectionHeader>Project Description</SectionHeader>
      <Box sx={{ ml: 2, mb: 4 }}>
        <Box>
          <MultiLineFormTextField
            label="Project Description"
            name="description"
            value={description}
            onChange={handleChange}
            fullWidth
          />
        </Box>
      </Box>
      <SectionHeader>Project Engagement</SectionHeader>
      <Box sx={{ ml: 2, mb: 4 }}>
        <Box>
          <MultiLineFormTextField
            label="Project Engagement"
            name="engagement"
            value={engagement}
            onChange={handleChange}
            fullWidth
          />
        </Box>
      </Box>
      <SectionHeader>Project Equity</SectionHeader>
      <Box sx={{ ml: 2, mb: 4 }}>
        <Box>
          <MultiLineFormTextField
            label="Project Equity"
            name="equity"
            value={equity}
            onChange={handleChange}
            fullWidth
          />
        </Box>
      </Box>
    </Box>
  );
};

export default WorkExampleForm;
