import { initialDailyPhoto } from "./DailyPhotoApiData";

export interface DailyPhotoInfo {
  copyright?: string;
  date: string;
  explanation: string;
  hdurl?: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
}

export interface DailyPhotoApiResponse {
  success: boolean;
  photos: DailyPhotoInfo[];
  error: string;
}

export async function getDailyPhotoApiCall() {
  try {
    let response = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY`
    );
    if (response && response.status === 200) {
      let photo = await response.json();

      // Map API output structure to the data structure used in the Redux store
      let newPhoto: DailyPhotoInfo = {
        copyright: photo.copyright ? photo.copyright : "",
        date: photo.date,
        explanation: photo.explanation,
        hdurl: photo.hdurl ? photo.hdurl : "",
        media_type: photo.media_type,
        service_version: photo.service_version,
        title: photo.title,
        url: photo.url,
      };
      return {
        success: true,
        photos: newPhoto,
        error: undefined,
      };
    } else {
      return {
        success: false,
        photos: initialDailyPhoto,
        error: response.statusText,
      };
    }
  } catch (err) {
    if (err) {
      return {
        success: false,
        photos: initialDailyPhoto,
        error: err.toString(),
      };
    } else {
      return {
        success: false,
        photos: initialDailyPhoto,
        error: "Unexpected errors",
      };
    }
  }
}
