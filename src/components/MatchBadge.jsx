import { Box } from '@mui/material';
import theme from '../theme';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


export default function MatchBadge({ label, key, filters, objKey }) {
  const objKeyTopFilter = objKey === 'org_services_provided_top' ? 'activities' : objKey;
  const matchChipColor = objKey === 'org_services_provided_top' ? theme.palette.primary.lightPurple : theme.palette.primary.tan
  return (
    <Box
      key={key}
      sx={{
        backgroundColor: filters[objKeyTopFilter].includes(encodeURIComponent(label)) ? matchChipColor : 'unset',
        border: objKey === 'org_services_provided_top' ? `1px solid ${theme.palette.primary.darkPurple}` : `1px solid ${theme.palette.primary.midBlue}`,
        borderRadius: 6,
        color: objKey === 'org_services_provided_top' ? theme.palette.primary.darkPurple :  theme.palette.primary.main,
        alignContent: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: objKey === 'org_services_provided_top' ? '0.75rem' : '0.75rem',
        display: 'flex',
        py: 1.25,
        px: 2.5,
        m: 0.5,
        mb: objKey === 'org_services_provided_top' ? 2 : 0.5,
        minWidth: '75px',
      }}
    >
     
      { filters[objKeyTopFilter].includes(encodeURIComponent(label))  &&  (<CheckCircleIcon key={key} sx={{ mr: 0.5, fontSize: '1.1rem' }}/>)}
      {label}
    </Box>
  );
}
                        