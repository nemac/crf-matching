import Popper from '@mui/material/Popper';
import ContactRow from './ContactRow';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import { IconButton, Typography, Box, Stack, Button, ClickAwayListener } from '@mui/material';
import theme from '../theme';

export default function ProfilePopper({ practitioner, poppedPractitioner, setPoppedPractitioner, headerRef }) {
  const open = practitioner === poppedPractitioner;
  const id = open ? `profile-popper-${practitioner.id}` : undefined;

  const handleClose = (e) => {
    setPoppedPractitioner(null);
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Popper
        id={id}
        open={open}
        anchorEl={headerRef.current}
      >
        {/* triangle above box */}
        <Box
          sx={{
            display: {
              xs: 'none',
              md: 'inherit',
            },
          }}
        >
          <PersonIcon />
        </Box>

        {/* content */}
        <Box
          sx={{
            boxShadow: 3,
            p: 2,
            borderRadius: 4,
            backgroundColor: theme.palette.primary.lightGray,
            border: `1px solid ${theme.palette.primary.purple}`,
            maxWidth: '400px', // Add max width
            width: '100%', // Ensure it takes full width up to max-width
            position: 'relative', // Add relative positioning for absolute close button
          }}
        >
          {/* close button */}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            size="small"
            sx={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              zIndex: 1,
              bgcolor: 'background.paper',
              boxShadow: 2,
              '&:hover': {
                bgcolor: 'grey.100',
              },
            }}
          >
            <CloseIcon fontSize="1em" />
          </IconButton>

          {/* title and description */}
          <Typography
            variant="h5"
            fontWeight="700"
            fontSize="24px"
            sx={{
              pb: 2,
              pr: 4, // Add right padding to prevent overlap with close button
              wordBreak: 'break-word', // Allow word breaks for very long words
              overflowWrap: 'break-word', // Ensure long words wrap
            }}
          >
            {practitioner.org}
          </Typography>

          {/* inner box */}
          <Stack
            sx={{
              boxShadow: 3,
              p: 1,
              mb: 3,
              borderRadius: 2,
              border: `1px solid ${theme.palette.primary.midBlue}`,
              wordBreak: 'break-word', // Add word break
              overflowWrap: 'break-word', // Ensure long content wraps
            }}
          >
            <Typography
              variant="h5"
              fontWeight="700"
              color={theme.palette.primary.main}
              sx={{ pb: 2 }}
            >
              Practitioner Org Contact
            </Typography>
            <ContactRow
              type="linkedIn"
              practitioner={practitioner}
            />
            <ContactRow
              type="website"
              practitioner={practitioner}
            />
            <ContactRow
              type="email"
              practitioner={practitioner}
            />
            <ContactRow
              type="phone"
              practitioner={practitioner}
            />
          </Stack>

          {/* link to full profile */}
          <a
            href={`#/practitioner/${practitioner.airtableRecId}`}
            style={{
              textDecoration: 'none',
              display: 'block',
            }}
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
                },
              }}
              startIcon={<PersonIcon />}
            >
              Full Practitioner Org Profile
            </Button>
          </a>
        </Box>
      </Popper>
    </ClickAwayListener>
  );
}
