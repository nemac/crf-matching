import { Card, Typography, Box, Chip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import BroadServiceProvider from './baseComponents/BroadServiceProvider';
import SpecialistLabel from './baseComponents/SpecialistLabel';

export default function PractitionerCard(props) {
  const { filters, practitioner, onComparisonSelect, isSelectedForComparison } = props;
  const urlFilters = filters;
  const topServices = (
    practitioner.topServicesProvided ||
    practitioner.activities ||
    []
  ).slice(0, 3);
  const isSpecialist = practitioner.org_registry_category === 'Specialist';
  const headquarters = [practitioner.org_city, practitioner.org_state]
    .filter(Boolean)
    .join(', ');

  const handleCompareClick = (e) => {
    e.preventDefault();
    if (onComparisonSelect) {
      onComparisonSelect(practitioner.airtableRecId, !isSelectedForComparison);
    }
  };

  return (
    <Card
      sx={{
        width: '380px',
        minHeight: '380px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        p: '20px 12px 8px',
        gap: 1,
        bgcolor: isSelectedForComparison ? '#FFDDBB' : '#FFFFFF',
        boxShadow:
          '0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px -1px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          px: 1,
          gap: 1,
          flex: '1 1 auto',
          overflow: 'hidden',
          alignSelf: 'stretch',
          flexGrow: 0,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            width: '100%',
            overflow: 'hidden',
            display: '-webkit-box',
            textOverflow: 'ellipsis',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {practitioner.org}
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            py: 0.5,
            px: 1,
            gap: '10px',
            alignSelf: 'stretch',
            flexGrow: 0,
            overflow: 'hidden',
          }}
        >
          <Typography
           variant="body2" component="div"
          >
            Headquartered In: <strong>{headquarters || '—'}</strong>
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            pt: 1,
            pb: 2,
            gap: 0.5,
            alignSelf: 'stretch',
            flexGrow: 0,
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              py: 0.5,
              gap: '10px',
              alignSelf: 'stretch',
              flexGrow: 0,
            }}
          >
            <Typography
              variant="h5"
            >
              Services Provided
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'flex-start',
              alignContent: 'flex-start',
              px: 1,
              py: 0.5,
              gap: 1,
              alignSelf: 'stretch',
              flexGrow: 0,
            }}
          >
            {topServices.map((service, index) => (
              <Chip
                key={index}
                label={service}
                sx={{
                  bgcolor: 'primary.sectionBg',
                  border: '1px solid #0066CC',
                  borderRadius: '9999px',
                  '& .MuiChip-label': {
                    fontWeight: 400,
                    fontSize: '12px',
                    color: 'primary.linkBlue',
                    px: 1.5,
                  },
                }}
              />
            ))}
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          p: '8px 0px 8px 8px',
          alignSelf: 'stretch',
          flexGrow: 1,
        }}
      >
        {isSpecialist ? <SpecialistLabel /> : <BroadServiceProvider />}
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          py: 0.5,
          alignSelf: 'stretch',
          bgcolor: isSelectedForComparison ? '#FFDDBB' : '#FFFFFF',
          flexGrow: 0,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            p: '8px 4px',
            gap: 0.5,
            height: '56px',
            borderTop: '0.5px solid #003366',
            flexGrow: 1,
          }}
        >
          <Box
            component="a"
            href={`/practitioner/${practitioner.airtableRecId}?${urlFilters}`}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '10px',
              textDecoration: 'none',
              flexGrow: 0,
            }}
          >
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: '16px',
                color: 'primary.ctaDarkBlue',
                mb: 0,
              }}
            >
              View Full Profile
            </Typography>
            <ArrowForwardIcon sx={{ color: 'primary.ctaDarkBlue', fontSize: '1rem' }} />
          </Box>

          {onComparisonSelect && (
            <>
              <Box sx={{ flexGrow: 1 }} />

              <Box
                onClick={handleCompareClick}
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  p: '8px',
                  width: '110px',
                  height: '40px',
                  bgcolor: isSelectedForComparison ? 'primary.linkBlue' : '#E5E7EB',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  gap: 0.5,
                  flexGrow: 0,
                }}
              >
                {isSelectedForComparison ? (
                  <CheckIcon sx={{ color: '#FFFFFF', fontSize: '1rem' }} />
                ) : (
                  <AddIcon sx={{ color: 'primary.linkBlue', fontSize: '1rem' }} />
                )}
                <Typography
                  sx={{
                    fontWeight: 'normal',
                    mb: 0,
                    color: isSelectedForComparison ? '#FFFFFF' : 'primary.linkBlue',
                  }}
                >
                  {isSelectedForComparison ? 'Selected' : 'Compare'}
                </Typography>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Card>
  );
}
