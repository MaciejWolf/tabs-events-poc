import { TrackmanEvent } from "./TrackmanEvent";

export type Filter = {
  key: string;
  isSatisfiedBy: (event: TrackmanEvent) => boolean;
}