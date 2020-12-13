import { DailyPhotoInfo } from "../../lib/dailyphotos/DailyPhotoApi";

export interface DailyPhotosState {
  photos?: DailyPhotoInfo;
  error?: string | undefined;
}

interface GetDailyPhotoAction {
  type: typeof GET_DAILYPHOTO;
  payload: DailyPhotoInfo;
}

interface GetDailyPhotoActionFailure {
  type: typeof GET_DAILYPHOTO_FAILURE;
  error: string | undefined;
}

interface RemoveDailyPhotoAction {
  type: typeof REMOVE_DAILYPHOTO;
  meta: {
    title: string;
  };
}

export const GET_DAILYPHOTO = "GET_DAILYPHOTO";
export const GET_DAILYPHOTO_FAILURE = "GET_DAILYPHOTO_FAILURE";
export const REMOVE_DAILYPHOTO = "REMOVE_DAILYPHOTO";

export type DailyPhotosActionTypes =
  | GetDailyPhotoAction
  | GetDailyPhotoActionFailure
  | RemoveDailyPhotoAction;
