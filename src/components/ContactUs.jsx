import { Box, Typography } from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

export default function ContactUs() {
  return (
    <Box
      sx={{
        bgcolor: 'primary.sectionBg',
        border: '1px solid #E1F5FE',
        borderRadius: '8px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          p: 3,
          gap: 1,
        }}
      >
        <EmailOutlinedIcon sx={{ color: 'primary.ctaDarkBlue', fontSize: 24 }} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: '20px',
              lineHeight: '23px',
              color: '#101828',
            }}
          >
            Contact Us
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '2px',
              flexWrap: 'wrap',
            }}
          >
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '19px',
                color: 'primary.main',
              }}
            >
              Have additional questions about applying to the Registry? Email
            </Typography>
            <Typography
              component="a"
              href="mailto:apply@adaptationregistry.org"
              sx={{
                fontFamily: 'Inter',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '24px',
                letterSpacing: '-0.3125px',
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
      </Box>
    </Box>
  );
}