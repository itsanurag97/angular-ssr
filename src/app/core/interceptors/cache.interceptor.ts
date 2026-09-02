import {HttpInterceptorFn, HttpResponse} from '@angular/common/http';
import { inject } from '@angular/core';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CacheService } from '../cache/cache.service';


export const cacheInterceptor: HttpInterceptorFn = (req, next) => {

  const cache = inject(CacheService);

  console.log("✈️ Request URL :", req.urlWithParams);

  if (req.method !== 'GET') {
    return next(req);
  }

  const cachedResponse = cache.get(req.urlWithParams);

  if (cachedResponse) {

    console.log('✅ Returned From Cache');

    return of(cachedResponse.clone());

  }
  console.log('🌐 Calling Backend');

  return next(req).pipe(

    tap(event => {

      if (event instanceof HttpResponse) {

        console.log('💾 Saving Response In Cache');

        cache.set(req.urlWithParams, event);

      }

    })

  );

};