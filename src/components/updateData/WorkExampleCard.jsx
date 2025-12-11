import { Box, Typography, Button, Modal } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useState } from 'react';
import PropTypes from 'prop-types';
import WorkExampleForm from './WorkExampleForm';

const WorkExampleCard = (props) => {
  const { title, description, links, location, engagement, equity, lead, exampleNumber, handleChange } = props;
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          width: '410px',
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          padding: 3,
          boxShadow: '0px 1px 3px rgba(16, 24, 40, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: '200px',
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
              width: '410px',
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
              lineHeight: '100%',
              color: '#56657D',
              width: '410px',
              height: '38px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {description ||
              'Specializes in risk assessment and adaptation planning for coastal communities facing sea-level rise...'}
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
            onClick={handleOpenModal}
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

      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="work-example-modal"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            backgroundColor: '#FFFFFF',
            borderRadius: '8px',
            padding: 4,
            maxWidth: '800px',
            width: '90%',
            maxHeight: '90vh',
            overflow: 'auto',
          }}
        >
          <WorkExampleForm
            exampleNumber={exampleNumber}
            title={title}
            description={description}
            links={links}
            location={location}
            engagement={engagement}
            equity={equity}
            lead={lead}
            handleChange={handleChange}
            onClose={handleCloseModal}
          />
        </Box>
      </Modal>
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
