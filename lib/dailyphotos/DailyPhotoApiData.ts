import { DailyPhotoInfo } from "./DailyPhotoApi";

export const initialDailyPhoto: DailyPhotoInfo = {
  copyright: "",
  date: "",
  explanation: "",
  media_type: "",
  hdurl: "",
  service_version: "",
  title: "",
  url: "",
};

export const mockDailyPhoto: DailyPhotoInfo = {
  copyright: "Laure Mattuzzi",
  date: "2020-12-07",
  explanation:
    "What's that below those strange clouds? Presidents. If you look closely, you may recognize the heads of four former US Presidents carved into famous Mount Rushmore in South Dakota, USA.  More obvious in the featured image are the unusual mammatus clouds that passed briefly overhead. Both were captured together by a surprised tourist with a quick camera in early September. Unlike normal flat-bottomed clouds which form when moist and calm air plateaus rise and cool, bumpy mammatus clouds form as icy and turbulent air pockets sink and heat up.  Such turbulent air is frequently accompanied by a thunderstorm.  Each mammatus lobe spans about one kilometer. The greater mountain is known to native Lakota Sioux as Six Grandfathers, deities responsible for the directions north, south, east, west, up, and down.",
  hdurl:
    "https://apod.nasa.gov/apod/image/2012/MammatusRushmore_Mattuzzi_3024.jpg",
  media_type: "image",
  service_version: "v1",
  title: "Mammatus Clouds over Mount Rushmore",
  url:
    "https://apod.nasa.gov/apod/image/2012/MammatusRushmore_Mattuzzi_960.jpg",
};
