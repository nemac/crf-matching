import { Box, Typography, Button, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import FormTextField from '../baseComponents/FormTextField.jsx';
import MultiLineFormTextField from '../baseComponents/MultiLineFormTextField.jsx';
import { updateOrganization } from '../../config/api';

const WorkExampleForm = props => {
  const {
    title,
    description,
    links,
    location,
    engagement,
    equity,
    lead,
    exampleNumber,
    handleChange,
  } = props;

  const [token, setToken] = useState(null);
  const [saved, setSaved] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const workExampleData = sessionStorage.getItem('workExampleData');
    if (workExampleData) {
      const data = JSON.parse(workExampleData);
      setToken(data.token);
    }
  }, []);

  useEffect(() => {
    if (saved) return;

    const handleBeforeUnload = e => {
      e.preventDefault();
      e.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [saved]);

  const handleSave = async () => {
    if (!token) return;

    setSubmitting(true);

    try {
      const updatedData = {};
      updatedData[`example${exampleNumber}_title`] = title;
      updatedData[`example${exampleNumber}_description`] = description;
      updatedData[`example${exampleNumber}_links`] = links;
      updatedData[`example${exampleNumber}_location`] = location;
      updatedData[`example${exampleNumber}_engagement`] = engagement;
      updatedData[`example${exampleNumber}_equity`] = equity;
      updatedData[`example${exampleNumber}_lead`] = lead;

      const result = await updateOrganization(token, updatedData);

      if (result.success) {
        setSaved(true);

        if (window.opener) {
          Object.keys(updatedData).forEach(key => {
            window.opener.postMessage(
              {
                type: 'updateWorkExample',
                name: key,
                value: updatedData[key],
              },
              window.location.origin
            );
          });
        }

        setTimeout(() => {
          window.close();
        }, 100);
      }
    } catch (err) {
      console.error('Failed to save work example:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    setSaved(true);
    setTimeout(() => {
      window.close();
    }, 0);
  };

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
            label=""
            name="description"
            value={description}
            onChange={handleChange}
            fullWidth
          />
        </Box>
      </Box>
      <SectionHeader>
        Approach to Stakeholder Engagement in this Project
      </SectionHeader>
      <Box sx={{ ml: 2, mb: 4 }}>
        <Box>
          <MultiLineFormTextField
            label=""
            name="engagement"
            value={engagement}
            onChange={handleChange}
            fullWidth
          />
        </Box>
      </Box>
      <SectionHeader>Approach to Equity in this Project</SectionHeader>
      <Box sx={{ ml: 2, mb: 4 }}>
        <Box>
          <MultiLineFormTextField
            label=""
            name="equity"
            value={equity}
            onChange={handleChange}
            fullWidth
          />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', gap: '16px', ml: 2, mt: 4, mb: 4 }}>
        <Button
          onClick={handleSave}
          disabled={submitting || saved}
          sx={{
            width: '135px',
            borderRadius: '4px',
            padding: '4px 48px',
            bgcolor: saved ? '#CCCCCC' : '#003366',
            color: saved ? '#666666' : '#FFFFFF',
            fontWeight: 400,
            fontSize: '18px',
            boxShadow: '0px 1px 2px 0px #00000040',
            textTransform: 'none',
            '&:hover': {
              bgcolor: saved ? '#CCCCCC' : '#002244',
            },
            '&:disabled': {
              bgcolor: '#CCCCCC',
              color: '#666666',
            },
          }}
        >
          {submitting ? (
            <>
              <CircularProgress size={16} sx={{ mr: 1, color: '#666666' }} />
              Saving...
            </>
          ) : saved ? (
            '✓ Saved'
          ) : (
            'Save'
          )}
        </Button>
        <Button
          sx={{
            width: '95px',
            borderRadius: '4px',
            padding: '4px',
            bgcolor: '#FFFFFF',
            color: '#000000',
            fontFamily: 'Roboto',
            fontWeight: 400,
            fontSize: '18px',
            lineHeight: '100%',
            boxShadow: '0px 1px 2px 0px #00000040',
            textTransform: 'none',
            '&:hover': {
              bgcolor: '#F5F5F5',
            },
          }}
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default WorkExampleForm;
