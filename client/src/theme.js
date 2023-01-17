import {createContext, useState, useMemo} from 'react';

import {createTheme} from '@mui/material';

// tokens is an object of various colors depending on whether the mode is dark or light.
const tokens = mode => ({
	...(mode === 'dark'
		? {
				primary: {
					100: '#d0d1d5',
					200: '#a1a4ab',
					300: '#727681',
					400: '#434957',
					500: '#141b2d',
					600: '#101624',
					700: '#0c101b',
					800: '#080b12',
					900: '#040509'
				},
				secondary: {
					100: '#ffffff',
					200: '#FEFDFC',
					300: '#FDFCF9',
					400: '#FCFAF6',
					500: '#FBF9F3',
					600: '#FAF7F0',
					700: '#F9F6ED',
					800: '#F7F4EB',
					900: '#F6F3E8'
				},
				redAccent: {
					100: '#f8dcdb',
					200: '#f1b9b7',
					300: '#e99592',
					400: '#e2726e',
					500: '#db4f4a',
					600: '#af3f3b',
					700: '#832f2c',
					800: '#58201e',
					900: '#2c100f'
				},
				orangeAccent: {
					100: '#ffe5cc',
					200: '#ffcc99',
					300: '#ffb266',
					400: '#ff9933',
					500: '#ff7f00',
					600: '#cc6600',
					700: '#994c00',
					800: '#663300',
					900: '#331900'
				},
				yellowAccent: {
					100: '#fdfdce',
					200: '#fbfb9d',
					300: '#fafa6b',
					400: '#f8f83a',
					500: '#f6f609',
					600: '#c5c507',
					700: '#949405',
					800: '#626204',
					900: '#313102'
				},
				greenAccent: {
					100: '#dbf5ee',
					200: '#b7ebde',
					300: '#94e2cd',
					400: '#70d8bd',
					500: '#4cceac',
					600: '#3da58a',
					700: '#2e7c67',
					800: '#1e5245',
					900: '#0f2922'
				},
				blueAccent: {
					100: '#e1e2fe',
					200: '#c3c6fd',
					300: '#a4a9fc',
					400: '#868dfb',
					500: '#6870fa',
					600: '#535ac8',
					700: '#3e4396',
					800: '#2a2d64',
					900: '#151632'
				},
				purpleAccent: {
					100: '#e1cfef',
					200: '#c39ede',
					300: '#a66ece',
					400: '#883dbd',
					500: '#6a0dad',
					600: '#550a8a',
					700: '#400868',
					800: '#2a0545',
					900: '#150323'
				},
				greyAccent: {
					100: '#e0e0e0',
					200: '#c2c2c2',
					300: '#a3a3a3',
					400: '#858585',
					500: '#666666',
					600: '#525252',
					700: '#3d3d3d',
					800: '#292929',
					900: '#141414'
				}
		  }
		: {
				primary: {
					100: '#040509',
					200: '#080b12',
					300: '#0c101b',
					400: '#f2f0f0',
					500: '#141b2d',
					600: '#434957',
					700: '#727681',
					800: '#a1a4ab',
					900: '#d0d1d5'
				},
				secondary: {
					100: '#F6F3E8',
					200: '#F7F4EB',
					300: '#F9F6ED',
					400: '#FAF7F0',
					500: '#FBF9F3',
					600: '#FCFAF6',
					700: '#FDFCF9',
					800: '#FEFDFC',
					900: '#ffffff'
				},
				redAccent: {
					100: '#2c100f',
					200: '#58201e',
					300: '#832f2c',
					400: '#af3f3b',
					500: '#db4f4a',
					600: '#e2726e',
					700: '#e99592',
					800: '#f1b9b7',
					900: '#f8dcdb'
				},
				orangeAccent: {
					100: '#331900',
					200: '#663300',
					300: '#994c00',
					400: '#cc6600',
					500: '#ff7f00',
					600: '#ff9933',
					700: '#ffb266',
					800: '#ffcc99',
					900: '#ffe5cc'
				},
				yellowAccent: {
					100: '#313102',
					200: '#626204',
					300: '#949405',
					400: '#c5c507',
					500: '#f6f609',
					600: '#f8f83a',
					700: '#fafa6b',
					800: '#fbfb9d',
					900: '#fdfdce'
				},
				greenAccent: {
					100: '#0f2922',
					200: '#1e5245',
					300: '#2e7c67',
					400: '#3da58a',
					500: '#4cceac',
					600: '#70d8bd',
					700: '#94e2cd',
					800: '#b7ebde',
					900: '#dbf5ee'
				},
				blueAccent: {
					100: '#151632',
					200: '#2a2d64',
					300: '#3e4396',
					400: '#535ac8',
					500: '#6870fa',
					600: '#868dfb',
					700: '#a4a9fc',
					800: '#c3c6fd',
					900: '#e1e2fe'
				},
				purpleAccent: {
					100: '#150323',
					200: '#2a0545',
					300: '#400868',
					400: '#550a8a',
					500: '#6a0dad',
					600: '#883dbd',
					700: '#a66ece',
					800: '#c39ede',
					900: '#e1cfef'
				},
				greyAccent: {
					100: '#141414',
					200: '#292929',
					300: '#3d3d3d',
					400: '#525252',
					500: '#666666',
					600: '#858585',
					700: '#a3a3a3',
					800: '#c2c2c2',
					900: '#e0e0e0'
				}
		  })
});

// themeSettings is an object of custom variables that change MUI's theme.
const themeSettings = mode => {
	const colors = tokens(mode);

	return {
		palette: {
			mode,
			...(mode === 'dark'
				? {
						primary: {
							main: colors.primary[500]
						},
						secondary: {
							main: colors.secondary[500]
						},
						error: {
							main: colors.redAccent[500]
						},
						warning: {
							main: colors.orangeAccent[500]
						},
						info: {
							main: colors.blueAccent[500]
						},
						success: {
							main: colors.greenAccent[500]
						},
						neutral: {
							dark: colors.greyAccent[700],
							main: colors.greyAccent[500],
							light: colors.greyAccent[100]
						},
						background: {
							default: colors.primary[500]
						}
				  }
				: {
						primary: {
							main: colors.primary[100]
						},
						secondary: {
							main: colors.secondary[500]
						},
						error: {
							main: colors.redAccent[500]
						},
						warning: {
							main: colors.orangeAccent[500]
						},
						info: {
							main: colors.blueAccent[500]
						},
						success: {
							main: colors.greenAccent[500]
						},
						neutral: {
							dark: colors.greyAccent[700],
							main: colors.greyAccent[500],
							light: colors.greyAccent[100]
						},
						background: {
							default: colors.secondary[900]
						}
				  })
		},
		typography: {
			fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
			fontSize: 12,
			h1: {
				fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
				fontSize: 40
			},
			h2: {
				fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
				fontSize: 32
			},
			h3: {
				fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
				fontSize: 24
			},
			h4: {
				fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
				fontSize: 20
			},
			h5: {
				fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
				fontSize: 16
			},
			h6: {
				fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
				fontSize: 12
			}
		}
	};
};

// ColorModeContext is a context object
const ColorModeContext = createContext();

// useMode is a function that has the mode variable, a memoized createTheme function that creates an MUI theme based on the mode, and a memoized toggleColorMode function that changes the value of mode.
const useMode = () => {
	const [mode, setMode] = useState('dark');

	// Memoization optimizes code by storing the output (e.g. createTheme(themeSettings(mode)), then recalling the stored output only if it recognizes the same input (e.g. [mode]).
	const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

	const colorMode = useMemo(
		() => ({
			toggleColorMode: () => setMode(prev => (prev === 'light' ? 'dark' : 'light'))
		}),
		[]
	);

	return [theme, colorMode];
};

export {tokens, ColorModeContext, useMode};
