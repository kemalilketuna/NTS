import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
    typography: {
        fontFamily: ['"League Spartan"', '"Sanchez"', 'Arial', 'sans-serif'].join(','),
    },
    palette: {
        mode: 'light',
        primary: {
            main: '#003049',
            light: '#00527c',
            dark: '#003049',
        },
        secondary: {
            main: '#c1121f',
            soft: '#d15558',
            dark: '#980C0C',
        },
        border: {
            main: '#ccc',
            secondary: '#e6e6e6',
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
            issueBox: '#fff',
        },
        text: {
            primary: '#000000',
            secondary: '#262626',
        },
        stageName: {
            'TO DO': '#44546f',
            'IN PROGRESS': '#0055cc',
            'DONE': '#206e4e',
        },
        stageNameBackgroundColor: {
            'TO DO': '#eaebee',
            'IN PROGRESS': '#e9f2ff',
            'DONE': '#dcfff1',
        }
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
            dark: '#d14c08',
        },
        secondary: {
            main: '#E65100',
            soft: '#FF8C3B',
            dark: '#FF8C3B',
        },
        border: {
            main: '#333c44',
            secondary: '#495661',
        },
        contrast: {
            main: '#fff',
            soft: '#f5f5f5',
        },
        error: {
            main: '#ed0303',
        },
        background: {
            default: '#1d2125',
            paper: '#161a1d',
            dark: '#161a1d',
            issueBox: '#161a1d',
        },
        text: {
            primary: '#eee',
            secondary: '#d4d4d4',
        },
        stageName: {
            'TO DO': '#9fadbc',
            'IN PROGRESS': '#85b8ff',
            'DONE': '#7de2b8',
        },
        stageNameBackgroundColor: {
            'TO DO': '#21272d',
            'IN PROGRESS': '#1c2b41',
            'DONE': '#1c3329',
        }
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