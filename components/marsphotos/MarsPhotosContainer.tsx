import { connect, ConnectedProps } from "react-redux";
import { compose, withState } from "recompose";
import MarsPhotosView from "./MarsPhotosView";
import {
  getMarsPhotos,
  getMarsPhotosFailure,
  removeMarsPhotos,
} from "../../store/marsphotos/actions";
import { MarsPhotoInfo } from "../../lib/marsphotos/MarsPhotosApi";
import { ApplicationState } from "../../store/store";

const mapState = (state: ApplicationState) => ({
  photos: state.marsphotos.photos,
  error: state.marsphotos.error,
});

const mapDispatch = (dispatch: any) => {
  return {
    getMarsPhotos: (photos: MarsPhotoInfo[]) => dispatch(getMarsPhotos(photos)),
    getMarsPhotosFailure: (error: string) =>
      dispatch(getMarsPhotosFailure(error)),
    removeMarsPhotos: () => dispatch(removeMarsPhotos()),
  };
};

const connector = connect(mapState, mapDispatch);

const withStateTimes = withState("isLoading", "setIsLoading", false);

type PropsFromRedux = ConnectedProps<typeof connector>;

export type MarsPhotosViewProps = PropsFromRedux & {
  isLoading: boolean;
  setIsLoading: any;
};

export default compose<MarsPhotosViewProps, any>(
  connector,
  withStateTimes
)(MarsPhotosView);
