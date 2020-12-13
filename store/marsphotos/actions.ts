import { MarsPhotoInfo } from "../../lib/marsphotos/MarsPhotosApi";
import {
  GET_MARSPHOTOS,
  GET_MARSPHOTOS_FAILURE,
  REMOVE_MARSPHOTOS,
  MarsPhotosActionTypes,
} from "./types";

// Action creator
export function getMarsPhotos(photos: MarsPhotoInfo[]): MarsPhotosActionTypes {
  return {
    type: GET_MARSPHOTOS,
    payload: photos,
  };
}
export function getMarsPhotosFailure(
  error: string | undefined
): MarsPhotosActionTypes {
  return {
    type: GET_MARSPHOTOS_FAILURE,
    error: error,
  };
}

export function removeMarsPhotos(): MarsPhotosActionTypes {
  return {
    type: REMOVE_MARSPHOTOS,
  };
}
