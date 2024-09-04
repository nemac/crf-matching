
import {
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";

let theme = createTheme({
  typography: {
    fontFamily: 'sans-serif',
  },
  palette: {
    primary: {
      main: '#2D3F5D',
      tan: '#FFEED2',
      white: '#FFFFFF',
      lightGray: '#FAFAFA',
      borderGray: '#D9D9D9',
      midBlue: '#52A6FF',
      purple: '#6E8EAA',
      matchGreen: '#677D66',
      noMatchRed: '#FC8A79',
      cellHoverBg: '#F1ECE4',
    }
  }
});

theme = responsiveFontSizes(theme);

export default theme;
