import { TrackmanEvent } from "./TrackmanEvent";

export type Filter = {
  key: string;
  category: string;
  label: string;
  isSatisfiedBy: (event: TrackmanEvent) => boolean;
}