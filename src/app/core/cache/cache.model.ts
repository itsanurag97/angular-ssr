import { HttpResponse } from '@angular/common/http';

export interface CacheEntry<T = unknown> {
  response: HttpResponse<T>;
  expiry: number;
}