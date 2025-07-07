/**
 * A component for rendering a row of a contact section.
 * 
 * Used for the contact section on the practitioner page and
 * the contact info popper on the community page.
 * 
 * - LinkedIn (type='linkedIn')
 * - Website (type='website')
 * - Email (type='email')
 * - Phone (type='phone')
 */


import { Box } from '@mui/material';
import theme from '../theme';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LanguageIcon from '@mui/icons-material/Language';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

export default function ContactRow({ type, practitioner }) {

  if (!practitioner[type]) {
    return (
      <></>
    )
  }
  let icon
  if (type === 'linkedIn') {
    icon = <LinkedInIcon />
  } else if (type === 'website') {
    icon = <LanguageIcon />
  } else if (type === 'email') {
    icon = <EmailIcon />
  } else if (type === 'phone') {
    icon = <PhoneIcon />
  }


  let hrefPrefix
  if (type === 'phone') {
    hrefPrefix = 'tel:'
  } else if (type === 'email') {
    hrefPrefix = 'mailto:'
  } else if (type === 'website') {
    if (!practitioner[type].startsWith('https://')) {
      hrefPrefix = 'https://'
    } else {
      hrefPrefix = ''
    }
  } else {
    hrefPrefix = ''
  }

  let href = `${hrefPrefix}${practitioner[type]}`


  const linkStyle = {
    textDecoration: 'none',
    color: theme.palette.primary.main,
    wordBreak: 'break-word',
  }
  let content
  if (type === 'website') {
    content = <a style={ linkStyle } target="_blank" href={ href }>{ practitioner[type] }</a>
  } else {
    content = <a style={ linkStyle } href={ href }>{ practitioner[type] }</a>
  }

  return (
    <Box
      sx={{
        display: 'inline-flex',
        minHeight: 35,
        fontWeight: 700,
        alignItems: 'center',
      }} 
    >
      <Box sx={{ mr: 2, }}>{ icon }</Box>
      <Box >{ content }</Box>
    </Box>
  )
}


