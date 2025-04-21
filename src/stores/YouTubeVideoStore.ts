import { makeAutoObservable } from "mobx";

export class YouTubeVideoStore {
  constructor() {
    makeAutoObservable(this);
  }

  video: { videoId: string, videoLabel: string } | null = null;

  isOpen = () => this.video !== null; 

  close = () => this.video = null;
}
