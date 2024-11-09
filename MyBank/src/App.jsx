import Router from "./routes";
import ThemeProvider from "./theme";
import ThemeSettings from "./components/settings";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeSnackBar } from "./Redux/UserAuth/Auth";
import MuiAlert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";

const vertical = "bottom";
const horizontal = "center";

const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));
function App() {
  const dispatch = useDispatch();

  const { severity, message, open } = useSelector(
    (state) => state.auth.snackbar || { severity: null, message: null, open: false }
  );
  // useEffect(() => {
  //   // Detect Developer Tools
  //   const detectDevTools = () => {
  //     const threshold = 160;
  //     const isDevToolsOpen =
  //       window.outerWidth - window.innerWidth > threshold ||
  //       window.outerHeight - window.innerHeight > threshold;

  //     if (isDevToolsOpen) {
  //       alert("Developer tools are open!");
  //       // Additional action, like redirect or blocking UI
  //     }
  //   };

  //   window.addEventListener('resize', detectDevTools);

  //   // Disable right-click across the entire document
  //   const handleContextMenu = (event) => {
  //     event.preventDefault();
  //   };
  //   document.addEventListener('contextmenu', handleContextMenu);

  //   return () => {
  //     window.removeEventListener('resize', detectDevTools);
  //     document.removeEventListener('contextmenu', handleContextMenu);
  //   };
  // }, []);
  return (
    <>
      <ThemeProvider>
        <ThemeSettings>
          {" "}
          <Router />{" "}
        </ThemeSettings>
      </ThemeProvider>
      {message && open ? (
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          autoHideDuration={4000}
          key={vertical + horizontal}
          onClose={() => {
            console.log("This is clicked");
            dispatch(closeSnackBar());
          }}
        >
          <Alert
            onClose={() => {
              console.log("This is clicked");
              dispatch(closeSnackBar());
            }}
            severity={severity}
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      ) : (
        <></>
      )}
    </>
  );
}

export default App;
