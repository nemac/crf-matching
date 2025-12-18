import { Box, Typography, Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PropTypes from 'prop-types';

const WorkExampleCard = props => {
  const {
    title,
    description,
    links,
    location,
    engagement,
    equity,
    lead,
    exampleNumber,
  } = props;

  const truncateText = (text, maxLength) => {
    if (!text || text.length <= maxLength) return text;
    return `${text.substring(0, maxLength).trim()}...`;
  };

  const handleOpenInNewTab = () => {
    const workExampleData = {
      exampleNumber,
      title,
      description,
      links,
      location,
      engagement,
      equity,
      lead,
    };

    sessionStorage.setItem('workExampleData', JSON.stringify(workExampleData));

    window.open('/work-example', '_blank');
  };

  return (
    <>
      <Box
        sx={{
          height: '350px',
          minWidth: '250px',
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          padding: 3,
          boxShadow: '0px 1px 3px rgba(16, 24, 40, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <Typography
            sx={{
              fontFamily: 'Roboto',
              fontWeight: 500,
              fontSize: '20px',
              lineHeight: '100%',
              color: '#101828',
              height: '23px',
              mb: 2,
            }}
          >
            {title || `Work Example Title ${exampleNumber}`}
          </Typography>

          <Typography
            sx={{
              fontFamily: 'Roboto',
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '24px',
              color: '#56657D',
            }}
          >
            {truncateText(
              description ||
                'Specializes in risk assessment and adaptation planning for coastal communities facing sea-level rise',
              125
            )}
          </Typography>
        </Box>

        <Box
          sx={{
            borderTop: '1px solid #E5E7EB',
            pt: 2,
            mt: 2,
          }}
        >
          <Button
            onClick={handleOpenInNewTab}
            endIcon={<ArrowForwardIcon sx={{ color: '#003366' }} />}
            sx={{
              textTransform: 'none',
              padding: 0,
              color: '#003366',
              fontFamily: 'Roboto',
              fontWeight: 500,
              fontSize: '16px',
              '&:hover': {
                backgroundColor: 'transparent',
                textDecoration: 'underline',
              },
            }}
          >
            Edit Work Example
          </Button>
        </Box>
      </Box>
    </>
  );
};

WorkExampleCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  links: PropTypes.string,
  location: PropTypes.string,
  engagement: PropTypes.string,
  equity: PropTypes.string,
  lead: PropTypes.string,
  exampleNumber: PropTypes.number.isRequired,
};

export default WorkExampleCard;
