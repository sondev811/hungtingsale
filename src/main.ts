import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const loadingElement = document.querySelector('.app-loading');
platformBrowserDynamic().bootstrapModule(AppModule)
.then(() => loadingElement.classList.add('loaded'))
  .then(() => setTimeout(() => loadingElement.remove(), 1000))
  .catch(err => console.error(err));

