import { makeAutoObservable } from "mobx";

export class FiltersPanelStore {
  constructor() {
    makeAutoObservable(this);
  }

  isOpen: boolean = false;

  close = () => this.isOpen = false;
  open = () => this.isOpen = true;
}
