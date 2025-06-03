import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Storage {

  constructor() { }
  setLocalItem<T>(key: string, value: T): void {
    try {
      const jsonValue = JSON.stringify(value)
      localStorage.setItem(key, jsonValue)
    }
    catch (error: any) {
      if (error["name"] && error.name === "QuotaExeededError") {
        localStorage.clear()
        console.log("QuotaExeededError, tried to clear localStorage, if this does not work.\n Ask client to increase limit")
      } else {
        console.log("Could not write item to localStorage")
        console.log(`Unexpected error ${error.name}: ${error.message}`)
      }
    }
  }

  getLocalItem<T>(key: string): T | null {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : null
  }

  removeLocalItem(key: string): void {
    localStorage.removeItem(key)
  }

  clearLocalStorage(): void {
    localStorage.clear()
  }

  setSessionItem<T>(key: string, value: any): void {
    try {
      const jsonValue = JSON.stringify(value)
      sessionStorage.setItem(key, jsonValue)
    }
    catch (error: any) {
      if (error["name"] && error.name === "QuotaExeededError") {
        sessionStorage.clear()
        console.log("QuotaExeededError, tried to clear sessionStorage, if this does not work.\n Ask client to increase limit")
      } else {
        console.log("Could not write item to sessionStorage")
        console.log(`Unexpected error ${error.name}: ${error.message}`)
      }
    }
  }

  getSessionItem<T>(key: string): T | null {
    const value = sessionStorage.getItem(key)
    return value ? JSON.parse(value) : null
  }

  removeSessionItem(key: string): void {
    sessionStorage.removeItem(key)
  }

  clearSessionStorage(): void {
    sessionStorage.clear()
  }
}
