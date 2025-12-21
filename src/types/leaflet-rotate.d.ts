import 'leaflet';

declare module 'leaflet' {
  interface MapOptions {
    rotate?: boolean;
    rotateControl?: boolean | { closeOnZeroBearing?: boolean; position?: string };
    bearing?: number;
    touchRotate?: boolean;
    shiftKeyRotate?: boolean;
    bearingSnap?: number;
    rotateControlOptions?: { closeOnZeroBearing?: boolean; position?: string };
  }

  interface Map {
    setBearing(bearing: number): this;
    getBearing(): number;
    rotateBy(bearing: number): this;
  }
}
