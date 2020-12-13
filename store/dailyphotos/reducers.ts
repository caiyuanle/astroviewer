import { initialDailyPhoto } from "../../lib/dailyphotos/DailyPhotoApiData";
import {
  DailyPhotosState,
  DailyPhotosActionTypes,
  GET_DAILYPHOTO,
  REMOVE_DAILYPHOTO,
  GET_DAILYPHOTO_FAILURE,
} from "./types";

export const initialDailyPhotosState: DailyPhotosState = {
  photos: initialDailyPhoto,
  error: "",
};

export function dailyPhotoReducer(
  state = initialDailyPhotosState,
  action: DailyPhotosActionTypes
): DailyPhotosState {
  switch (action.type) {
    case GET_DAILYPHOTO:
      return {
        ...state,
        photos: action.payload,
      };
    case GET_DAILYPHOTO_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    case REMOVE_DAILYPHOTO:
      return {
        ...state,
        photos: initialDailyPhoto,
      };
    default:
      return state;
  }
}
