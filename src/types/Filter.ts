import { TrackmanEvent } from "./TrackmanEvent";

export type Filter = {
  key: string;
  category: string;
  label: string;
  apply: (event: TrackmanEvent) => boolean;
}