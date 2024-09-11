import Popper from '@mui/material/Popper';

import ContactRow from './ContactRow';

import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Typography, Box, Stack, Button, ClickAwayListener, styled } from '@mui/material'

import theme from '../theme';

function PersonIcon () {
  return <svg
    width="15"
    height="17"
    viewBox="0 0 18 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.1887 12.38C14.2987 11.4125 11.8462 10.625 9 10.625C6.15375 10.625 3.70125 11.4125 1.81125 12.38C0.68625 12.9538 0 14.1125 0 15.3725V18.5H18V15.3725C18 14.1125 17.3137 12.9538 16.1887 12.38ZM6.5025 9.5H11.4975C12.8588 9.5 13.905 8.3075 13.725 6.9575L13.365 4.20125C13.0162 2.06375 11.16 0.5 9 0.5C6.84 0.5 4.98375 2.06375 4.635 4.20125L4.275 6.9575C4.095 8.3075 5.14125 9.5 6.5025 9.5Z"
      fill={ theme.palette.primary.white }/>
  </svg>
}


export default function ProfilePopper({ practitioner, poppedPractitioner, setPoppedPractitioner, headerRef }) {

  const open = practitioner === poppedPractitioner
  const id = open ? `profile-popper-${practitioner.id}` : undefined;

  const handleClose = e => {
    setPoppedPractitioner(null)
  }

  return (
    <ClickAwayListener onClickAway={ handleClose }>
      <Popper id={id} open={open} anchorEl={headerRef.current}>

        {/* triangle above box */}
        <svg
          height="35"
          width="30"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: 'absolute',
            right: '47%',
            top: '-34',
          }}
        >
          <polyline
            points="0,35 15,0 30,35"
            style={{
              fill: theme.palette.primary.lightGray,
              stroke: theme.palette.primary.purple,
              strokeWidth: 1,
            }}
          />
        </svg>

        {/* close button */}
        <IconButton
          aria-label="close"
          onClick={ e => handleClose(e) }
          size="small"
          sx={{
            boxShadow: 2,
            position: 'absolute',
            top: '10px',
            right: '10px',
          }}>
          <CloseIcon fontSize="1em" />
        </IconButton>

        {/* content */}
        <Box
          sx={{
            boxShadow: 3,
            p: 2,
            borderRadius: 4,
            backgroundColor: theme.palette.primary.lightGray,
            border: `1px solid ${theme.palette.primary.purple}`
          }}
        >
          {/* title and description */}
          <Typography
            variant="h5"
            fontWeight="700"
            fontSize="24px"
            sx={{
              pb: 2
            }}
          >
            { practitioner.org }
          </Typography>
          <Typography
            variant="body2"
            fontWeight="700"
            maxWidth="300px"
            sx={{ pb: 2, mr: 1 }}
          >
            A very short description, mission statement, or about us that most people will ignore
          </Typography>

          {/* inner box */}
          <Stack
            sx={{
              boxShadow: 3,
              p: 1,
              mb: 3,
              borderRadius: 2,
              border: `1px solid ${theme.palette.primary.midBlue}`
            }} 
          >
            <Typography
              variant="h5"
              fontWeight="700"
              color={theme.palette.primary.main}
              sx={{ pb: 2, }}
            >Practitioner Org Contact</Typography>
            <ContactRow type="linkedIn" practitioner={ practitioner }></ContactRow>
            <ContactRow type="website" practitioner={ practitioner }></ContactRow>
            <ContactRow type="email" practitioner={ practitioner }></ContactRow>
            <ContactRow type="phone" practitioner={ practitioner }></ContactRow>
          </Stack>

          {/* link to full profile */}
          <a
            style={{
            }}
            href={ `#/practitioner/${practitioner.id}` }
          >
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              sx={{
                width: '100%',
                textTransform: 'none',
                color: 'primary.white',
                backgroundColor: 'primary.midBlue',
                textDecoration: 'none',
                borderRadius: 4,
                boxShadow: 3,
                '&:hover': {
                  backgroundColor: 'primary.main',
                }
              }}
              startIcon={<PersonIcon />}
            >Full Practitioner Org Profile</Button>
          </a>
        </Box>
      </Popper>
    </ClickAwayListener>
  );

}