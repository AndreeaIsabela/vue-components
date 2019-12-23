export interface IPosition {
  lat: number;
  lng: number;
}

export interface IMark {
  position: IPosition;
  id: string;
}
