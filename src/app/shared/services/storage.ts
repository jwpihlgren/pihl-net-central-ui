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

  setLocalItemWithTTL<T>(key: string, ttl: number, value: T): void {
    const now = new Date().toISOString()
    this.setLocalItem<TTL<T>>(key, { date: now, ttl: ttl, value: value })
  }

  getLocalItem<T>(key: string): T | null {
    const value = localStorage.getItem(key)
    if (!value) return null
    const parsedValue = JSON.parse(value)
    if (Object.hasOwn(parsedValue, "ttl")) {
      if (this.hasTTLPassed(parsedValue.ttl, parsedValue.date)) { return null }
      return parsedValue.value
    }
    if (Object.hasOwn(parsedValue, "ttl")) {
      return parsedValue.value
    }
    return parsedValue
  }

  private hasTTLPassed(date: string, ttl: number): boolean {
    return Date.parse(date) + ttl < Date.parse(new Date().toISOString())
  }


  removeLocalItem(key: string): void {
    localStorage.removeItem(key)
  }

  clearLocalStorage(): void {
    localStorage.clear()
  }

  setSessionItem<T>(key: string, value: T): void {
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

  setSessionItemWithTTL<T>(key: string, ttl: number, value: T,): void {
    const now = new Date().toISOString()
    this.setSessionItem<TTL<T>>(key, { date: now, ttl: ttl, value: value })
  }

  getSessionItem<T>(key: string): T | null {
    const value = sessionStorage.getItem(key)
    if (!value) return null
    const parsedValue = JSON.parse(value)
    if (Object.hasOwn(parsedValue, "ttl")) {
      if (this.hasTTLPassed(parsedValue.ttl, parsedValue.date)) { return null }
      return parsedValue.value
    }
    if (Object.hasOwn(parsedValue, "ttl")) {
      return parsedValue.value
    }
    return parsedValue
  }

  removeSessionItem(key: string): void {
    sessionStorage.removeItem(key)
  }

  clearSessionStorage(): void {
    sessionStorage.clear()
  }
}


interface TTL<T> {
  ttl: number
  date: string
  value: T
}

