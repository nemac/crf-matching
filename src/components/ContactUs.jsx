import { Box, Typography } from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

export default function ContactUs() {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1, mb: 1 }}>
        <EmailOutlinedIcon sx={{ color: 'primary.ctaDarkBlue', fontSize: 24 }} />
        <Typography variant="h3">
          Contact Us
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: '4px', flexWrap: 'wrap' }}>
        <Typography variant="body1" component="div">
          Have additional questions about applying to the Registry? Email
        </Typography>
        <Typography
          component="a"
          variant="body1"
          href="mailto:apply@adaptationregistry.org"
          sx={{
            color: 'primary.linkBlue',
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          apply@adaptationregistry.org
        </Typography>
      </Box>
    </Box>
  );
}