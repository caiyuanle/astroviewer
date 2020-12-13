import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PrintIcon from "@material-ui/icons/Print";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import Router from "next/router";
import { DailyPhotoInfo } from "../../lib/dailyphotos/DailyPhotoApi";

const useStyles = makeStyles({
  root: {
    maxWidth: 900,
  },
  media: {
    height: 450,
  },
  favoriteIcon: {
    color: "red",
  },
  normalIcon: {
    color: "grey",
  },
});

interface DailyPhotoCardProps {
  photo: DailyPhotoInfo;
}

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const DailyPhotoCard: React.FC<DailyPhotoCardProps> = ({ photo }) => {
  // For local testing:
  //   photo = mockDailyPhoto;
  const classes = useStyles();
  // let mediaType: string = dailyPhoto.media_type === "image" ? "img" : "video";
  const [open, setOpen] = useState(false);

  const routeToPdfViewPage = () => {
    Router.push({
      pathname: "/pdfview",
      query: { originatedPage: "DailyPhotoCard" },
    });
  };

  const handleFavoriteIconClick = () => {
    setOpen(true);
  };

  const handleAlertClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      console.log("handleAlertClose", event);
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            component="img"
            alt={photo.title}
            image={photo.url}
            title={photo.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {photo.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {photo.explanation}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <IconButton
            aria-label="add to favorites"
            onClick={handleFavoriteIconClick}
          >
            <FavoriteIcon
              className={open ? classes.favoriteIcon : classes.normalIcon}
            />
          </IconButton>
          <IconButton aria-label="print" onClick={routeToPdfViewPage}>
            <PrintIcon />
          </IconButton>
          <Typography>Media type: </Typography>
          <Button size="small" color="primary">
            {photo.media_type}
          </Button>
          <Typography>Photo taken date: </Typography>
          <Button size="small" color="primary">
            {photo.date}
          </Button>
          <Typography>Copyright owner: </Typography>
          <Button size="small" color="primary">
            {photo.copyright === undefined ? "Public Domain" : photo.copyright}
          </Button>
        </CardActions>
      </Card>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity="success">
          This photo has been added to the favorite folder!
        </Alert>
      </Snackbar>
    </>
  );
};

export default DailyPhotoCard;
