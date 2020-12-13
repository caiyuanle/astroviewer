import { initialMarsPhotos } from "../../lib/marsphotos/MarsPhotosApiData";
import {
  GET_MARSPHOTOS,
  GET_MARSPHOTOS_FAILURE,
  REMOVE_MARSPHOTOS,
  MarsPhotosActionTypes,
  MarsPhotosState,
} from "./types";

export const initialMarsPhotosState: MarsPhotosState = {
  photos: initialMarsPhotos,
  error: "",
};

export function marsPhotosReducer(
  state = initialMarsPhotosState,
  action: MarsPhotosActionTypes
): MarsPhotosState {
  switch (action.type) {
    case GET_MARSPHOTOS:
      return {
        ...state,
        photos: action.payload,
      };
    case GET_MARSPHOTOS_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    case REMOVE_MARSPHOTOS:
      return {
        ...state,
        photos: initialMarsPhotos,
      };
    default:
      return state;
  }
}
