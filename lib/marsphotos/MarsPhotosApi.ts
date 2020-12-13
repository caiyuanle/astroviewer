export interface MarsPhotoInfo {
  photoId: number;
  earthDate: string;
  cameraName: string;
  roverName: string;
  url: string;
}

export interface MarsPhotosApiResponse {
  success: boolean;
  photos: MarsPhotoInfo[];
  error: string;
}

export async function getMarsPhotosApiCall(
  roverName: string,
  cameraName: string,
  earthDate: string
): Promise<MarsPhotosApiResponse> {
  try {
    let url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/photos?earth_date=${earthDate}&camera=${cameraName}&api_key=DEMO_KEY`;
    // console.log("Requesting url: ", url);
    let response = await fetch(url);
    if (response && response.status === 200) {
      let photosData = await response.json();

      // Map API output structure to the data structure used in the Redux store
      let marsPhotoInfoArray = new Array<MarsPhotoInfo>();
      for (const photoData of photosData.photos) {
        marsPhotoInfoArray.push({
          photoId: photoData.id,
          earthDate: photoData.earth_date,
          cameraName: photoData.camera.full_name,
          roverName: photoData.rover.name,
          url: photoData.img_src,
        });
      }
      return {
        success: true,
        photos: marsPhotoInfoArray,
        error: "",
      };
    } else {
      return {
        success: false,
        photos: [],
        error: response.statusText,
      };
    }
  } catch (err) {
    return {
      success: false,
      photos: [],
      error: err.toString(),
    };
  }
}
