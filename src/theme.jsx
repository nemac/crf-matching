
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
      lightBlueHover: '#9ed1ff',
      midBlue: '#52A6FF',
      purple: '#6E8EAA',
      lightPurple: '#eaeff2',
      medPurple: '#b8cad5',
      darkPurple: '#1f2c35',
      matchGreen: '#677D66',
      noMatchRed: '#FC8A79',
      cellHoverBg: '#F1ECE4',
    }
  }
});

theme = responsiveFontSizes(theme);

export default theme;
