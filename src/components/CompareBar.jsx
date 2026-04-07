import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AddPractitionerModal from './AddPractitionerModal';
import CallToActionButton from './baseComponents/CallToActionButton';

const getInitials = (orgName) => {
  if (!orgName) return '?';
  const words = orgName.trim().split(/\s+/);
  if (words.length === 1) return words[0][0].toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
};

export default function CompareBar(props) {
  const { selectedPractitioners, onClearAll, onAddFromModal } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const practitionerArray = Array.from(selectedPractitioners.values());
  const practitionerIds = Array.from(selectedPractitioners.keys());

  const handleCompareClick = () => {
    const params = new URLSearchParams();
    params.set('practitioners', practitionerIds.join(','));
    navigate(`/ComparePractitioners?${params.toString()}`);
  };

  const handleModalAdd = (newPractitioners) => {
    onAddFromModal(newPractitioners);
  };

  if (practitionerArray.length === 0) return null;

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: 69,
          bgcolor: 'primary.inputBg',
          borderBottom: '1px solid #6C788D',
          boxShadow: '0px -3px 2px rgba(0, 0, 0, 0.1)',
          zIndex: 1200,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 3,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Typography
            variant="h3"
            sx={{
              color: 'primary.main',
              whiteSpace: 'nowrap',
            }}
          >
            Compare Adaptation Practitioners
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {practitionerArray.map((p) => (
              <Box
                key={p.airtableRecId}
                sx={{
                  boxSizing: 'border-box',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 52,
                  height: 52,
                  borderRadius: '99999px',
                  bgcolor: '#E1F5FE',
                  border: '1.25px solid #F3F3F5',
                }}
              >
                <Typography
                  sx={{
                          fontWeight: 700,
                    fontSize: '24px',
                    color: 'primary.main',
                  }}
                >
                  {getInitials(p.org)}
                </Typography>
              </Box>
            ))}

            <Box
              onClick={() => setModalOpen(true)}
              sx={{
                boxSizing: 'border-box',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: 52,
                height: 52,
                borderRadius: '99999px',
                bgcolor: 'primary.ctaDarkBlue',
                border: '1.25px solid #F3F3F5',
                cursor: 'pointer',
              }}
            >
              <Typography
                sx={{
                      fontWeight: 700,
                  fontSize: '24px',
                  color: 'primary.inputBg',
                }}
              >
                +
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, px: 2 }}>
          <CallToActionButton
            onClick={handleCompareClick}
            text={`Compare (${practitionerArray.length})`}
            buttonSx={{
              backgroundColor: 'primary.linkBlue',
              borderRadius: '8px',
              px: 3,
              py: 1.5,
              '&:hover': {
                bgcolor: '#0052A3',
              },
            }}
            textSx={{
              fontWeight: 400,
              fontSize: '16px',
              textDecoration: 'underline',
            }}
          />

          <Button
            onClick={onClearAll}
            sx={{
              textTransform: 'none',
              fontWeight: 400,
              fontSize: '16px',
              textDecoration: 'underline',
              color: 'primary.ctaDarkBlue',
              px: 1.5,
              py: 1.5,
            }}
          >
            Clear All
          </Button>
        </Box>
      </Box>

      <AddPractitionerModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAddPractitioners={handleModalAdd}
        existingPractitionerIds={practitionerIds}
      />
    </>
  );
}
