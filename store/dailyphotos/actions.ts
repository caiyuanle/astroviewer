import { DailyPhotoInfo } from "../../lib/dailyphotos/DailyPhotoApi";
import {
  DailyPhotosActionTypes,
  GET_DAILYPHOTO,
  GET_DAILYPHOTO_FAILURE,
  REMOVE_DAILYPHOTO,
} from "./types";

// Action creator
export function getDailyPhoto(
  newPhoto: DailyPhotoInfo
): DailyPhotosActionTypes {
  return {
    type: GET_DAILYPHOTO,
    payload: newPhoto,
  };
}
export function getDailyPhotoFailure(
  error: string | undefined
): DailyPhotosActionTypes {
  return {
    type: GET_DAILYPHOTO_FAILURE,
    error: error,
  };
}

export function removeDailyPhoto(title: string): DailyPhotosActionTypes {
  return {
    type: REMOVE_DAILYPHOTO,
    meta: {
      title,
    },
  };
}
