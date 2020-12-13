import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { useRouter } from "next/router";
import Divider from "@material-ui/core/Divider";
import MarsPhotosSwipeableView from "./MarsPhotosSwipeableView";
import "date-fns";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { MarsPhotosViewProps } from "./MarsPhotosContainer";
import { getMarsPhotosApiCall } from "../../lib/marsphotos/MarsPhotosApi";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1024,
    flexGrow: 1,
  },
  header: {
    display: "flex",
    alignItems: "center",
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: 768,
    display: "block",
    maxWidth: 1024,
    overflow: "hidden",
    width: "100%",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const MarsPhotosView = ({
  getMarsPhotos,
  getMarsPhotosFailure,
  setIsLoading,
}: MarsPhotosViewProps) => {
  const classes = useStyles();

  const router = useRouter();

  const routeToHomePage = () => {
    router.push("/");
  };

  const [activeStep, setActiveStep] = useState(0);

  const [isEarthDateNull, setIsEarthDateNull] = useState(false);

  const [earthdate, setEarthdate] = useState<Date | null>(
    new Date("2020-12-02")
  );

  const handleEarthdateChange = (date: Date | null) => {
    setEarthdate(date);
    setActiveStep(0);
  };

  const [rovername, setRovername] = useState<string>("Curiosity");

  const handleRovernameChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setRovername(event.target.value as string);
    setActiveStep(0);
  };

  const [cameraname, setCameraname] = useState<string>("FHAZ");

  const handleCameranameChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setCameraname(event.target.value as string);
    setActiveStep(0);
  };

  useEffect(() => {
    (async function () {
      setIsLoading(true);
      console.log("eartdata: ", earthdate);
      if (earthdate === null) {
        setIsEarthDateNull(true);
      } else {
        let apiResults = await getMarsPhotosApiCall(
          rovername,
          cameraname,
          earthdate!.toISOString().split("T")[0]
        );
        if (apiResults.success) {
          getMarsPhotos(apiResults.photos);
          setIsLoading(false);
        } else {
          getMarsPhotosFailure(apiResults.error);
          setIsLoading(false);
        }
      }
    })();
  }, [rovername, cameraname, earthdate]);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Mars Rover Photos
          </Typography>
          <Button color="inherit" onClick={routeToHomePage}>
            Home Page
          </Button>
        </Toolbar>
      </AppBar>
      <Divider />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="yyyy/MM/dd"
            margin="normal"
            id="mars-photos-earthdate"
            label="Earth Date"
            value={earthdate}
            onChange={handleEarthdateChange}
            KeyboardButtonProps={{
              "aria-label": "Change Earthdate",
            }}
          />
          <FormControl className={classes.formControl}>
            <InputLabel id="mars-photos-rovername-label">Rover Name</InputLabel>
            <Select
              labelId="mars-photos-rovername-label"
              id="mars-photos-rovername"
              value={rovername}
              onChange={handleRovernameChange}
            >
              <MenuItem value={"Curiosity"}>Curiosity</MenuItem>
              <MenuItem value={"Opportunity"}>Opportunity</MenuItem>
              <MenuItem value={"Spirit"}>Spirit</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="mars-photos-cameraname-label">
              Camera Name
            </InputLabel>
            <Select
              labelId="mars-photos-cameraname-label"
              id="mars-photos-cameraname"
              value={cameraname}
              onChange={handleCameranameChange}
            >
              <MenuItem value={"FHAZ"}>
                Front Hazard Avoidance Camera (FHAZ)
              </MenuItem>
              <MenuItem value={"RHAZ"}>
                Rear Hazard Avoidance Camera (RHAZ)
              </MenuItem>
              <MenuItem value={"NAVCAM"}>Navigation Camera (NAVCAM)</MenuItem>
              <MenuItem value={"PANCAM"}>Panoramic Camera (PANCAM)</MenuItem>
              <MenuItem value={"MAST"}>Mast Camera (MAST)</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </MuiPickersUtilsProvider>
      <Divider />
      <Snackbar open={isEarthDateNull} autoHideDuration={2000}>
        <Alert severity="error">
          The earth date is not valid. Please reselect the date!
        </Alert>
      </Snackbar>
      <Divider />
      <MarsPhotosSwipeableView
        activeStep={activeStep}
        setActiveStep={setActiveStep}
      />
    </div>
  );
};

export default MarsPhotosView;
