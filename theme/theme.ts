import { createTheme } from "@mui/material";

export const colors = {
  primary: "#6e57e0",
  error: "#FE5F55",
  success: "#5dfc70",
  info: "#29339b",
};
declare module "@mui/material/Button" {
  interface ButtonPropsSizeOverrides {
    xl: true;
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
    },
    error: {
      main: colors.error,
    },
    info: {
      main: colors.info,
    },
    success: {
      main: colors.success,
    },
  },
  components: {
    MuiOutlinedInput: {
      defaultProps: {
        classes: { root: "!rounded-md !text-base" },
      },
    },
    MuiTextField: {
      styleOverrides: {},
      defaultProps: {
        FormHelperTextProps: {
          style: { marginLeft: 0 },
        },
      },
    },
    MuiDialog: {
      defaultProps: {
        classes: { paper: "!rounded-2xl !shadow-none" },
      },
    },
    MuiDialogContent: {
      defaultProps: {
        classes: { root: "xs:!p-7 !p-2" },
      },
    },
    MuiRating: {
      variants: [
        {
          props: {
            size: "large",
          },
          style: {
            fontSize: "2.7rem",
          },
        },
        {
          props: {
            size: "medium",
          },
          style: {
            fontSize: "2rem",
          },
        },
        {
          props: {
            size: "small",
          },
          style: {
            fontSize: "1.8rem",
          },
        },
      ],
      defaultProps: {
        classes: { root: "!text-primary" },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "initial",
          borderRadius: "100px",
        },
        text: {
          padding: "0px !important",
          borderRadius: "0px",
          fontWeight: "bold",
        },
      },
      defaultProps: {
        disableElevation: true,
      },
      variants: [
        {
          props: {
            size: "xl",
          },
          style: {
            padding: "12px 28px",
            fontSize: "1rem",
          },
        },
      ],
    },
  },
});

export default theme;
