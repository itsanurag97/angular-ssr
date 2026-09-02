import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { cacheInterceptor } from '../interceptors/cache.interceptor';

export const APP_PROVIDERS = [
  provideHttpClient(
    withInterceptors([
        cacheInterceptor
    ])
  )

];