import { connect, ConnectedProps } from "react-redux";
import {
  getDailyPhoto,
  getDailyPhotoFailure,
  removeDailyPhoto,
} from "../../store/dailyphotos/actions";
import {
  DailyPhotoInfo,
  getDailyPhotoApiCall,
} from "../../lib/dailyphotos/DailyPhotoApi";
import DailyPhotosView from "./DailyPhotosView";
import { compose, lifecycle, withState } from "recompose";
import { ApplicationState } from "../../store/store";
import { DailyPhotosState } from "../../store/dailyphotos/types";

const mapState = (state: ApplicationState) => ({
  photos: state.dailyphotos.photos,
  error: state.dailyphotos.error,
});

const mapDispatch = (dispatch: any) => {
  return {
    getDailyPhoto: (newPhoto: DailyPhotoInfo) =>
      dispatch(getDailyPhoto(newPhoto)),
    getDailyPhotoFailure: (error: string) =>
      dispatch(getDailyPhotoFailure(error)),
    removeDailyPhoto: (title: string) => dispatch(removeDailyPhoto(title)),
  };
};

const connector = connect(mapState, mapDispatch);

const withStateTimes = withState("isLoading", "setIsLoading", false);

type PropsFromRedux = ConnectedProps<typeof connector>;

export type DailyPhotosViewProps = PropsFromRedux & {
  isLoading: boolean;
  setIsLoading: any;
};

export default compose<DailyPhotosViewProps, any>(
  connector,
  withStateTimes,
  lifecycle<DailyPhotosViewProps, DailyPhotosState>({
    async componentDidMount() {
      this.props.setIsLoading(true);
      let apiResults = await getDailyPhotoApiCall();
      if (apiResults.success) {
        this.props.getDailyPhoto(apiResults.photos);
        this.props.setIsLoading(false);
      } else {
        this.props.getDailyPhotoFailure(apiResults.error);
        this.props.setIsLoading(false);
      }
    },
  })
)(DailyPhotosView);
