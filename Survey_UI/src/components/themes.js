import { createTheme } from "@mui/material"

// const darkTheme = createTheme({
//     palette: {
//         mode: 'light',
//     },
// });


const darkTheme = createTheme({
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
});

export { darkTheme }