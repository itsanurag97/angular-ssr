import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { appConfig } from './app/app.config';
import { APP_PROVIDERS } from './app/core/providers/app.providers';

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    ...(appConfig.providers ?? []),
    ...APP_PROVIDERS
  ]
}).catch(err => console.error(err));