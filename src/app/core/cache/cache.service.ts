import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { CacheEntry } from './cache.model';
import { CACHE_CONFIG } from './cache.config';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  private cache = new Map<string, CacheEntry>();

  get(url: string): HttpResponse<any> | null {

    const entry = this.cache.get(url);

    if (!entry) {
      return null;
    }

    if (Date.now() > entry.expiry) {

      this.cache.delete(url);

      return null;
    }

    return entry.response;
  }

  set(url: string, response: HttpResponse<any>): void {

    this.cache.set(url, {
      response,
      expiry: Date.now() + CACHE_CONFIG.ttl
    });

  }

  remove(url: string): void {

    this.cache.delete(url);

  }

  clear(): void {

    this.cache.clear();

  }

  has(url: string): boolean {

    return this.cache.has(url);

  }

}