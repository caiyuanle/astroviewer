import { MarsPhotoInfo } from "../../lib/marsphotos/MarsPhotosApi";

export interface MarsPhotosState {
  photos?: MarsPhotoInfo[];
  error?: string | undefined;
}

interface GetMarsPhotosAction {
  type: typeof GET_MARSPHOTOS;
  payload: MarsPhotoInfo[];
}

interface GetMarsPhotosActionFailure {
  type: typeof GET_MARSPHOTOS_FAILURE;
  error: string | undefined;
}

interface RemoveMarsPhotosAction {
  type: typeof REMOVE_MARSPHOTOS;
}

export const GET_MARSPHOTOS = "GET_MARSPHOTOS";
export const GET_MARSPHOTOS_FAILURE = "GET_MARSPHOTOS_FAILURE";
export const REMOVE_MARSPHOTOS = "REMOVE_MARSPHOTOS";

export type MarsPhotosActionTypes =
  | GetMarsPhotosAction
  | GetMarsPhotosActionFailure
  | RemoveMarsPhotosAction;
