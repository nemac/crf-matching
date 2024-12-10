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

export default function ContactRow({ type, practitioner }) {

  if (!practitioner[type]) {
    return (
      <></>
    )
  }
  let icon
  if (type === 'linkedIn') {
    icon = <svg
      width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 0.5C16.5304 0.5 17.0391 0.710714 17.4142 1.08579C17.7893 1.46086 18 1.96957 18 2.5V16.5C18 17.0304 17.7893 17.5391 17.4142 17.9142C17.0391 18.2893 16.5304 18.5 16 18.5H2C1.46957 18.5 0.960859 18.2893 0.585786 17.9142C0.210714 17.5391 0 17.0304 0 16.5V2.5C0 1.96957 0.210714 1.46086 0.585786 1.08579C0.960859 0.710714 1.46957 0.5 2 0.5H16ZM15.5 16V10.7C15.5 9.83539 15.1565 9.0062 14.5452 8.39483C13.9338 7.78346 13.1046 7.44 12.24 7.44C11.39 7.44 10.4 7.96 9.92 8.74V7.63H7.13V16H9.92V11.07C9.92 10.3 10.54 9.67 11.31 9.67C11.6813 9.67 12.0374 9.8175 12.2999 10.0801C12.5625 10.3426 12.71 10.6987 12.71 11.07V16H15.5ZM3.88 6.06C4.32556 6.06 4.75288 5.883 5.06794 5.56794C5.383 5.25288 5.56 4.82556 5.56 4.38C5.56 3.45 4.81 2.69 3.88 2.69C3.43178 2.69 3.00193 2.86805 2.68499 3.18499C2.36805 3.50193 2.19 3.93178 2.19 4.38C2.19 5.31 2.95 6.06 3.88 6.06ZM5.27 16V7.63H2.5V16H5.27Z"
        fill={ theme.palette.primary.main }
      />
    </svg>
  } else if (type === 'website') {
    icon = <svg
      width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.99 0C4.47 0 0 4.48 0 10C0 15.52 4.47 20 9.99 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 9.99 0ZM16.92 6H13.97C13.65 4.75 13.19 3.55 12.59 2.44C14.43 3.07 15.96 4.35 16.92 6ZM10 2.04C10.83 3.24 11.48 4.57 11.91 6H8.09C8.52 4.57 9.17 3.24 10 2.04ZM2.26 12C2.1 11.36 2 10.69 2 10C2 9.31 2.1 8.64 2.26 8H5.64C5.56 8.66 5.5 9.32 5.5 10C5.5 10.68 5.56 11.34 5.64 12H2.26ZM3.08 14H6.03C6.35 15.25 6.81 16.45 7.41 17.56C5.57 16.93 4.04 15.66 3.08 14ZM6.03 6H3.08C4.04 4.34 5.57 3.07 7.41 2.44C6.81 3.55 6.35 4.75 6.03 6ZM10 17.96C9.17 16.76 8.52 15.43 8.09 14H11.91C11.48 15.43 10.83 16.76 10 17.96ZM12.34 12H7.66C7.57 11.34 7.5 10.68 7.5 10C7.5 9.32 7.57 8.65 7.66 8H12.34C12.43 8.65 12.5 9.32 12.5 10C12.5 10.68 12.43 11.34 12.34 12ZM12.59 17.56C13.19 16.45 13.65 15.25 13.97 14H16.92C15.96 15.65 14.43 16.93 12.59 17.56ZM14.36 12C14.44 11.34 14.5 10.68 14.5 10C14.5 9.32 14.44 8.66 14.36 8H17.74C17.9 8.64 18 9.31 18 10C18 10.69 17.9 11.36 17.74 12H14.36Z"
        fill={ theme.palette.primary.main }
      />
    </svg>
  } else if (type === 'email') {
    icon = <svg
      width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 0.5H2C0.9 0.5 0.00999999 1.4 0.00999999 2.5L0 14.5C0 15.6 0.9 16.5 2 16.5H18C19.1 16.5 20 15.6 20 14.5V2.5C20 1.4 19.1 0.5 18 0.5ZM18 4.5L10 9.5L2 4.5V2.5L10 7.5L18 2.5V4.5Z"
        fill={ theme.palette.primary.main }
      />
    </svg>
  } else if (type === 'phone') {
    icon = <svg
      width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.01 12.88C15.78 12.88 14.59 12.68 13.48 12.32C13.13 12.2 12.74 12.29 12.47 12.56L10.9 14.53C8.07 13.18 5.42 10.63 4.01 7.7L5.96 6.04C6.23 5.76 6.31 5.37 6.2 5.02C5.83 3.91 5.64 2.72 5.64 1.49C5.64 0.95 5.19 0.5 4.65 0.5H1.19C0.65 0.5 0 0.74 0 1.49C0 10.78 7.73 18.5 17.01 18.5C17.72 18.5 18 17.87 18 17.32V13.87C18 13.33 17.55 12.88 17.01 12.88Z"
        fill={ theme.palette.primary.main }
      />
    </svg>
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
      <Box>{ content }</Box>
    </Box>
  )
}


