import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Checkbox,
  Button,
  Modal,
} from '@mui/material';
import { fetchPractitionersByName } from '../util/api';
import SearchBar from './baseComponents/SearchBar';

export default function AddPractitionerModal(props) {
  const { open, onClose, onAddPractitioners, existingPractitionerIds } = props;
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) {
      setSearchTerm('');
      setResults([]);
      setSelectedIds([]);
    }
  }, [open]);

  useEffect(() => {
    if (searchTerm.trim().length === 0) {
      setResults([]);
      return;
    }

    const debounceTimer = setTimeout(() => {
      setLoading(true);
      fetchPractitionersByName(searchTerm, (data) => {
        const filtered = data.filter(
          (p) => !existingPractitionerIds.includes(p.airtableRecId)
        );
        setResults(filtered);
        setLoading(false);
      });
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, existingPractitionerIds]);

  const handleToggle = (practitionerId) => {
    setSelectedIds((prev) =>
      prev.includes(practitionerId)
        ? prev.filter((id) => id !== practitionerId)
        : [...prev, practitionerId]
    );
  };

  const handleAdd = () => {
    const selectedPractitioners = results.filter((p) =>
      selectedIds.includes(p.airtableRecId)
    );
    onAddPractitioners(selectedPractitioners);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 424,
          maxHeight: '80vh',
          bgcolor: '#FFFFFF',
          border: '1px solid #E1F5FE',
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          borderRadius: '12px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ p: 3, pb: 2 }}>
          <Box>
            <Typography
              variant="h4"
              sx={{ fontWeight: 700 }}
            >
              Registry of Adaptation Practitioners
            </Typography>
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: '14px',
                color: 'text.secondary',
                mt: 0.5,
              }}
            >
              Select a practitioner to add to your comparison list
            </Typography>
          </Box>

          <SearchBar
            text="Search by Adaptation Practitioner Name"
            onChange={(e) => setSearchTerm(e.target.value)}
            loading={loading}
            textSx={{
              mt: 2,
              width: '100%',
              height: 44,
              px: 2,
              bgcolor: '#FFFFFF',
              border: '1px solid #D1D5DB',
              borderRadius: '8px',
              fontSize: '14px',
              '&:hover': {
                borderColor: '#9CA3AF',
              },
              '&.Mui-focused': {
                borderColor: 'primary.ctaDarkBlue',
              },
            }}
          />
        </Box>

        <Box
          sx={{
            flex: 1,
            overflowY: 'auto',
            px: 3,
            pb: 2,
            minHeight: 300,
          }}
        >
          {results.map((practitioner) => (
            <Box
              key={practitioner.airtableRecId}
              onClick={() => handleToggle(practitioner.airtableRecId)}
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 2,
                py: 2,
                borderBottom: '1px solid #F3F4F6',
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: 'primary.sectionBg',
                },
              }}
            >
              <Checkbox
                checked={selectedIds.includes(practitioner.airtableRecId)}
                onClick={(e) => e.stopPropagation()}
                onChange={() => handleToggle(practitioner.airtableRecId)}
                sx={{
                  p: 0,
                  mt: 0.5,
                  color: '#D1D5DB',
                  '&.Mui-checked': {
                    color: 'primary.ctaDarkBlue',
                  },
                }}
              />
              <Box>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: '16px',
                    color: '#101828',
                  }}
                >
                  {practitioner.org}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 400,
                    fontSize: '14px',
                    color: 'text.secondary',
                    mt: 0.5,
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {practitioner.info || practitioner.additionalInformation || ''}
                </Typography>
              </Box>
            </Box>
          ))}

          {searchTerm.trim().length > 0 && !loading && results.length === 0 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
              <Typography sx={{ color: '#9CA3AF', fontSize: '14px' }}>
                No practitioners found
              </Typography>
            </Box>
          )}
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 2,
            p: 3,
            borderTop: '1px solid #F3F4F6',
          }}
        >
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{
              textTransform: 'none',
              borderColor: '#D1D5DB',
              color: '#374151',
              borderRadius: '8px',
              px: 4,
              py: 1,
              fontSize: '14px',
              fontWeight: 500,
              '&:hover': {
                borderColor: '#9CA3AF',
                bgcolor: 'primary.sectionBg',
              },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleAdd}
            disabled={selectedIds.length === 0}
            sx={{
              textTransform: 'none',
              bgcolor: '#4FC3F7',
              color: '#FFFFFF',
              borderRadius: '8px',
              px: 4,
              py: 1,
              fontSize: '14px',
              fontWeight: 500,
              '&:hover': {
                bgcolor: '#29B6F6',
              },
              '&.Mui-disabled': {
                bgcolor: '#E5E7EB',
                color: '#9CA3AF',
              },
            }}
          >
            Add to Comparison
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
