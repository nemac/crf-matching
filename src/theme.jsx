import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme({
  typography: {
    fontFamily: 'Roboto',
    h1: {
      fontSize: '32px',
      fontWeight: 'bold',
      '@media (min-width:900px)': {
        fontSize: '42px',
      },
    },
    h2: {
      fontSize: '30px',
      fontWeight: 'bold',
      color: '#56657D',
    },    
    h3: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#56657D',
    },
    h4: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#56657D',
    },
    h5: {
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#56657D',
    },
    body1: {
      fontSize: '16px',
      fontWeight: 'normal',
      color: '#56657D',
      marginBottom: '4px',
    },
    body2: {
      fontSize: '14px',
      fontWeight: 'normal',
      color: '#56657D',
    },
    subtitle1: {
      fontSize: '18px',
      fontWeight: 'normal',
      color: '#56657D',
      textAlign: 'center',
      marginTop: '8px',
    },
  },
  palette: {
    primary: {
      main: '#2D3F5D',
      main2: '#101828',
      secondary: '#56657D',
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
      linkBlue: '#0066CC',
      eyebrow: '#0066CC',
      ctaDarkBlue: '#003366',
      sectionBg: '#F9FAFB',
      inputBg: '#F3F3F5',
    },
    text: {
      primary: '#101828',
      secondary: '#56657D',
    },
  },
  components: {
    MuiTypography: {
      variants: [
        {
          props: { variant: 'eyebrow' },
          style: {
            fontSize: '20px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            color: '#0066CC',
          },
        },
        {
          props: { variant: 'subtitleHero' },
          style: {
            fontSize: '18px',
            fontWeight: 'normal',
            color: '#FFFFFF',
            textAlign: 'center',
            marginTop: '8px',
          },
        },
        {
          props: { variant: 'h1Hero' },
          style: {
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#FFFFFF',
            '@media (min-width:900px)': {
              fontSize: '48px',
            },
          },
        },
      ],
    },
  },
});

export default theme;
