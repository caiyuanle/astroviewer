import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import MobileStepper from "@material-ui/core/MobileStepper";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { MarsPhotoInfo } from "../../lib/marsphotos/MarsPhotosApi";
import { ApplicationState } from "../../store/store";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

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
}));

interface MarsPhotosSwipeableViewProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}

const MarsPhotosSwipeableView: React.FC<MarsPhotosSwipeableViewProps> = ({
  activeStep,
  setActiveStep,
}) => {
  const classes = useStyles();

  const theme = useTheme();

  const marsPhotos = useSelector<ApplicationState, MarsPhotoInfo[]>(
    (state) => state.marsphotos.photos!
  );
  const maxSteps = marsPhotos.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  useEffect(() => {
    //  console.log("In swipe view: ", JSON.stringify(marsPhotos));
  }, []);

  return (
    <div className={classes.root}>
      {marsPhotos.length !== 0 && marsPhotos[activeStep] !== undefined ? (
        <>
          <Paper square elevation={0} className={classes.header}>
            <Typography>
              {marsPhotos[activeStep].roverName} -{" "}
              {marsPhotos[activeStep].cameraName} -{" "}
              {marsPhotos[activeStep].photoId}
            </Typography>
          </Paper>
          <AutoPlaySwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
          >
            {marsPhotos.map((step, index) => (
              <div key={step.photoId}>
                {Math.abs(activeStep - index) <= 2 ? (
                  <img className={classes.img} src={step.url} alt={step.url} />
                ) : null}
              </div>
            ))}
          </AutoPlaySwipeableViews>
          <MobileStepper
            steps={maxSteps}
            position="static"
            variant="text"
            activeStep={activeStep}
            nextButton={
              <Button
                size="small"
                onClick={handleNext}
                disabled={activeStep === maxSteps - 1}
              >
                Next
                {theme.direction === "rtl" ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button
                size="small"
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                {theme.direction === "rtl" ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                Back
              </Button>
            }
          />
        </>
      ) : (
        <div>
          <Typography>
            Found 0 photos under the current search criteria. Please change the
            criteria and try again.
          </Typography>
        </div>
      )}
    </div>
  );
};

export default MarsPhotosSwipeableView;
