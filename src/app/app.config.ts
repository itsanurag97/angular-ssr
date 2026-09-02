import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { routes } from './app.routes';
import { cacheInterceptor } from './core/interceptors/cache.interceptor';

import { APP_PROVIDERS } from './core/providers/app.providers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    ...APP_PROVIDERS,

    provideHttpClient(
      withInterceptors([
        cacheInterceptor
      ])
    ),
    
    provideClientHydration(
      withEventReplay()
    )
  ]
};
