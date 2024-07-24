import { ThemeProvider, createTheme } from '@mui/material/styles';
import Competition from './Components/Competition';
import { CssBaseline } from '@mui/material';


const App = () => {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Competition />
    </ThemeProvider>
  );
};

export default App;
