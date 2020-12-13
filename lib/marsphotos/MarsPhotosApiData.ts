import { MarsPhotoInfo } from "./MarsPhotosApi";

// API related data
export const initialMarsPhotos: MarsPhotoInfo[] = [
  {
    photoId: 0,
    earthDate: "",
    cameraName: "",
    roverName: "",
    url: "",
  },
];

export const mockMarsPhotos: MarsPhotoInfo[] = [
  {
    photoId: 780204,
    earthDate: "2020-12-01",
    cameraName: "FHAZ",
    roverName: "Curiosity",
    url:
      "https://mars.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/02958/opgs/edr/fcam/FLB_660095006EDR_F0840444FHAZ00302M_.JPG",
  },
  {
    photoId: 780205,
    earthDate: "2020-12-01",
    cameraName: "FHAZ",
    roverName: "Curiosity",
    url:
      "https://mars.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/02958/opgs/edr/fcam/FRB_660095006EDR_F0840444FHAZ00302M_.JPG",
  },
  {
    photoId: 780355,
    earthDate: "2020-12-01",
    cameraName: "FHAZ",
    roverName: "Curiosity",
    url:
      "https://mars.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/02958/opgs/edr/fcam/FLB_660094788EDR_D0840438TRAV15030M_.JPG",
  },
];
