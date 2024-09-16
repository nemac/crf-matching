
import theme from '../../theme';
import { SvgIcon } from '@mui/material';

export default function GradCapIcon() {
  return (
    <SvgIcon
      sx={{
        '& path': {
          fill: {
            xs: theme.palette.primary.main,
            md: theme.palette.primary.lightGray,
          }
        }
      }} 
    >
      <svg
        width="30"
        height="20"
        viewBox="0 0 30 24"
        fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M5.66683 13.5733V18.9067L15.0002 24L24.3335 18.9067V13.5733L15.0002 18.6667L5.66683 13.5733ZM15.0002 0L0.333496 8L15.0002 16L27.0002 9.45333V18.6667H29.6668V8L15.0002 0Z"
        />
      </svg>
    </SvgIcon>
  )
}