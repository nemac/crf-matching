
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
      lightTan: '#f8f5f1',
      tan: '#FFEED2',
      darkTan: '#845200',
      white: '#FFFFFF',
      lightGray: '#FAFAFA',
      medGray: '#F5F5F5',
      borderGray: '#D9D9D9',
      lightBlue: '#D1E9FF',
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
