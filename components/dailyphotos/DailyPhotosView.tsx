import React from "react";
import DailyPhotoCard from "./DailyPhotoCard";
import { DailyPhotosViewProps } from "./DailyPhotosContainer";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { useRouter } from "next/router";
import Divider from "@material-ui/core/Divider";
import { Link } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

const DailyPhotosView = ({
  photos,
  error,
  isLoading,
}: DailyPhotosViewProps) => {
  const classes = useStyles();

  const router = useRouter();

  const routeToHomePage = () => {
    router.push("/");
  };

  return (
    <div className={classes.root}>
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
            Astronomy Picture of the Day
          </Typography>
          <Button color="inherit" onClick={routeToHomePage}>
            Home Page
          </Button>
        </Toolbar>
      </AppBar>
      <Divider />
      {photos && !isLoading ? (
        <>
          <Typography variant="h6">
            Source:{" "}
            <Link href="https://apod.nasa.gov/apod/astropix.html">
              https://apod.nasa.gov/apod/astropix.html
            </Link>
          </Typography>
          <DailyPhotoCard photo={photos} />
        </>
      ) : (
        <p style={{ color: "blue" }}>Loading...</p>
      )}
      {error && <p style={{ color: "red" }}>Error fetching data -- {error}.</p>}
    </div>
  );
};

export default DailyPhotosView;
