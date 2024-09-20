import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
    typography: {
        fontFamily: ['"League Spartan"', '"Sanchez"', 'Arial', 'sans-serif'].join(','),
    },
    palette: {
        mode: 'light',
        primary: {
            main: '#003049',
        },
        secondary: {
            main: '#c1121f',
            soft: '#d15558',
            dark: '#980C0C',
        },
        border: {
            main: '#ccc',
        },
        error: {
            main: '#780000',
        },
        contrast: {
            main: '#000',
            soft: '#24292d'
        },
        background: {
            default: '#f5f5f5',
            paper: '#ffffff',
            dark: '#f7f8f9',
        },
        text: {
            primary: '#000000',
            secondary: '#262626',
        },
    },
    shape: {
        borderRadius: 8,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                contained: {
                    fontFamily: 'Arial',
                    fontWeight: '600',
                    fontSize: '1rem',
                    size: 'large',
                    textTransform: 'none',
                },

            }
        }
    }
});

const darkTheme = createTheme({
    typography: {
        fontFamily: ['"League Spartan"', '"Sanchez"', 'Arial', 'sans-serif'].join(','),
    },

    palette: {
        mode: 'dark',

        primary: {
            main: '#E65100',
            light: '#FF8C3B',
            dark: '#b33f00',
        },
        secondary: {
            main: '#c1121f',
            soft: '#d15558',
            dark: '#980C0C',
        },
        border: {
            main: '#333c44',
        },
        text: {
            primary: '#eee',
            secondary: '#d4d4d4',
        },
        contrast: {
            main: '#fff',
            soft: '#f5f5f5',
        },
        error: {
            main: '#780000',
        },
        background: {
            default: '#1d2125',
            paper: '#161a1d',
        },
    },
    shape: {
        borderRadius: 8,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                contained: {
                    fontFamily: 'Arial',
                    fontWeight: '600',
                    fontSize: '1rem',
                    size: 'large',
                    textTransform: 'none',
                },
            }
        }
    }
});



export { lightTheme, darkTheme };