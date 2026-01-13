/**
 * 
 * Chip for practitioner types and
 * - Broad service provider -  (type='Broad service provider')
 * - Specialist (type='Specialist')
 * 
 */

import { Box } from '@mui/material';
import theme from '../theme';
import { ThemeProvider } from '@mui/material/styles';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import HubIcon from '@mui/icons-material/Hub';

export default function PractitionerTypeChip({ type, label, list, size }) {

  let icon;
  let aBackgroundColor;
  let aTagBackgroundColor;
  let aColor;
  let aLabel;
  const aFontSize = '0.90rem';
   
  switch(type.toLowerCase()) {
    case 'broad service provider':
      icon = <HubIcon fontSize='inherit' sx={{ verticalAlign: 'middle' }}/>
      aColor = theme.palette.primary.darkTan;
      aBackgroundColor = theme.palette.primary.tan;
      aTagBackgroundColor = '#ffe4b9';
      aLabel = label;
      break;
    case 'specialist':
      icon = <AutoAwesomeIcon fontSize='inherit' sx={{  verticalAlign: 'middle' }}/>
      aLabel = label;
      aColor = theme.palette.primary.darkPurple;
      aBackgroundColor = theme.palette.primary.cellHoverBg;
      aTagBackgroundColor = theme.palette.primary.lightTan;
      break;
    default:
      icon = <HubIcon fontSize='inherit' sx={{ verticalAlign: 'middle' }}/>
      aColor = theme.palette.primary.darkTan;
      aBackgroundColor = theme.palette.primary.tan;
      aTagBackgroundColor = '#ffe4b9';
      aLabel = 'Broad service provider';
  }
  
  return (
      <Box
        sx={{
          display: 'flex',
          width: 'fit-content',
          flexWrap: 'wrap',
          mb: 2,
          pl: 2,
          pr: 4,
          py: 1,
          borderRadius: 4,
          alignItems: 'center',
          fontSize: aFontSize,
          color: aColor,
          backgroundColor: aBackgroundColor,
        }} 
      >
        <Box sx={{ display: 'flex',  alignItems: 'start', mr: 2, fontSize: aFontSize}}>{ icon }</Box>
        <Box sx={{ fontSize: aFontSize, mr: 1 }}>{ aLabel }</Box>
          <Box 
            sx={{ 
              display: size === 'large' ? 'unset' : 'none',
              textTransform: 'capitalize', 
              p: 1, 
              borderRadius: 1,
              backgroundColor: aTagBackgroundColor }}>
              { list }
          </Box>
      </Box>
  )
}


