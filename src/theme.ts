import {MantineColorsTuple, createTheme} from '@mantine/core';

const sysColors: MantineColorsTuple = [
    "#eef3ff",
    "#dee2f2",
    "#bdc2de",
    "#98a0ca",
    "#7a84ba",
    "#6672b0",
    "#5c68ac",
    "#4c5897",
    "#424e88",
    "#364379"
  ]

const theme = createTheme ({
    colors: {
        blue: sysColors
    },
    breakpoints: {
        xs: '36em',
        sm: '48em',
        md: '62em',
        lg: '75em',
        xl: '88em',
    }
});

export default theme