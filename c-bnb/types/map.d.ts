import { RootState } from "../store";

declare module "googlemaps";

declare global {
  interface Window {
    google: any;
    initMap: any;
  }
}
