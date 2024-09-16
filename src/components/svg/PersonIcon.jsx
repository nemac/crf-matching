import { SvgIcon } from "@mui/material"

import theme from "../../theme"

export default function PersonIcon () {
  return <SvgIcon
    sx={{
      '& path': {
        fill: {
          xs: theme.palette.primary.lightBlue,
          md: theme.palette.primary.white,
        }
      }
    }} 
  >
    <svg
      width="15"
      height="17"
      viewBox="0 0 18 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M16.1887 12.38C14.2987 11.4125 11.8462 10.625 9 10.625C6.15375 10.625 3.70125 11.4125 1.81125 12.38C0.68625 12.9538 0 14.1125 0 15.3725V18.5H18V15.3725C18 14.1125 17.3137 12.9538 16.1887 12.38ZM6.5025 9.5H11.4975C12.8588 9.5 13.905 8.3075 13.725 6.9575L13.365 4.20125C13.0162 2.06375 11.16 0.5 9 0.5C6.84 0.5 4.98375 2.06375 4.635 4.20125L4.275 6.9575C4.095 8.3075 5.14125 9.5 6.5025 9.5Z">
      </path>
    </svg>
  </SvgIcon>
}

