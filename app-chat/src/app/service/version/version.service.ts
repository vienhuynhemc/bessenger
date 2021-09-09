import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VersionService {

  public version: number;

  constructor() {
    this.getData();
  }

  private getData(): void {
    let version = JSON.parse(localStorage.getItem("version"));
    if (version == null) {
      this.version = 1;
      localStorage.setItem("version", JSON.stringify("1"));
    } else {
      this.version = version;
    }
  }

  public changeVersion(): void {
    if (this.version == 1) {
      localStorage.setItem("version", JSON.stringify("2"));
    } else {
      localStorage.setItem("version", JSON.stringify("1"));
    }
    this.getData();
  }

}
