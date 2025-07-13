import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _session = signal(false)
  constructor() { }


  get session() {
    return this._session.asReadonly()
  }


  login() {
    this._session.set(true)
  }

  logout() {
    this._session.set(false)
  }
}
