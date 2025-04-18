import { TrackmanEvent } from "./TrackmanEvent";

export type Filter = {
  key: string;
  label: string;
  isSatisfiedBy: (event: TrackmanEvent) => boolean;
}