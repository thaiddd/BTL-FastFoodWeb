import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  private myObject: any;

  constructor() { }

  setObject(object: any) {
    this.myObject = object;
  }

  getObject() {
    return this.myObject;
  }
}
