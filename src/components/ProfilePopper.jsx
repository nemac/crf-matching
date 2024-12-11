import Popper from '@mui/material/Popper';
import ContactRow from './ContactRow';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import { IconButton, Typography, Box, Stack, Button } from '@mui/material';
import theme from '../theme';

export default function ProfilePopper({
  practitioner,
  poppedPractitioner,
  setPoppedPractitioner,
  headerRef,
  onMouseEnter,
  onMouseLeave,
}) {
  const open = practitioner === poppedPractitioner;
  const id = open ? `profile-popper-${practitioner.id}` : undefined;

  return (
    <Popper
      id={id}
      open={open}
      anchorEl={headerRef.current}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      placement="bottom-start"
      modifiers={[
        {
          name: 'offset',
          options: {
            offset: [-10, -100], // [horizontal, vertical] offset
          },
        },
      ]}
    >
      <Box
        sx={{
          boxShadow: 3,
          p: 2,
          borderRadius: 4,
          backgroundColor: theme.palette.primary.lightGray,
          border: `1px solid ${theme.palette.primary.purple}`,
          maxWidth: '400px',
          width: '100%',
          position: 'relative',
          zIndex: 1500,
        }}
      >
        {/* title and description */}
        <Typography
          variant="h5"
          fontWeight="700"
          fontSize="24px"
          sx={{
            pb: 2,
            pr: 4,
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
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
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
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
        {/*<a*/}
        {/*    href={`/practitioner/${practitioner.airtableRecId}`}*/}
        {/*    target="_blank"*/}
        {/*    rel="noopener noreferrer"*/}
        {/*    style={{*/}
        {/*      textDecoration: 'none',*/}
        {/*      display: 'block',*/}
        {/*    }}*/}
        {/*>*/}
        {/*  <Button*/}
        {/*      component="label"*/}
        {/*      role={undefined}*/}
        {/*      variant="contained"*/}
        {/*      tabIndex={-1}*/}
        {/*      sx={{*/}
        {/*        width: '100%',*/}
        {/*        textTransform: 'none',*/}
        {/*        color: 'primary.white',*/}
        {/*        backgroundColor: 'primary.midBlue',*/}
        {/*        textDecoration: 'none',*/}
        {/*        borderRadius: 4,*/}
        {/*        boxShadow: 3,*/}
        {/*        '&:hover': {*/}
        {/*          backgroundColor: 'primary.main',*/}
        {/*        },*/}
        {/*      }}*/}
        {/*      startIcon={<PersonIcon />}*/}
        {/*  >*/}
        {/*    Full Practitioner Org Profile*/}
        {/*  </Button>*/}
        {/*</a>*/}
      </Box>
    </Popper>
  );
}
