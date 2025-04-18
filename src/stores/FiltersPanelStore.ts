import { makeAutoObservable } from "mobx";

export class FiltersPanelStore {
  constructor() {
    makeAutoObservable(this);
  }

  isOpen: boolean = true;

  close = () => this.isOpen = false;
  open = () => this.isOpen = true;
}

export const filtersPanelStore = new FiltersPanelStore();