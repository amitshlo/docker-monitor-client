import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
  NgModule,
  ApplicationRef
} from '@angular/core';
import {
  removeNgStyles,
  createNewHosts,
  createInputTransfer
} from '@angularclass/hmr';

import 'hammerjs';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
// App is our top level component
import { AppComponent } from './app.component';
import { AppState, InternalStateType } from './app.service';
import { NoContentComponent } from './no-content';

import '../styles/styles.scss';
import '../styles/indigo-pink.css';
import '../styles/headings.css';
import '../styles/font-awesome.min.css';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdButtonModule, MdGridListModule, MdCardModule, MdDialogModule, MaterialModule} from '@angular/material';
import {ServerComponent} from './components/server/server.component';
import {ContainerComponent} from './components/container/container.component';
import {ContainersStatsService} from './services/containers-stats/container-stats.service';
import {HideFirstChar} from './pipes/hide-first-char/hide-first-char.pipe';
import {ContainersActionsService} from './services/container-actions.service/container-actions.service';
import {InfoDialogComponent} from './components/info-dialog/info-dialog.component';

// Application wide providers
const APP_PROVIDERS = [
  AppState,
  ContainersStatsService,
  ContainersActionsService
];

const APP_PIPES = [
  HideFirstChar
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    APP_PIPES,
    AppComponent,
    NoContentComponent,
    ServerComponent,
    ContainerComponent,
    InfoDialogComponent
  ],
  entryComponents: [
    InfoDialogComponent
  ],
  /**
   * Import Angular's modules.
   */
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MaterialModule,
    MdButtonModule,
    MdGridListModule,
    MdCardModule,
    MdDialogModule
  ],
  /**
   * Expose our Services and Providers into Angular's dependency injection.
   */
  providers: [
    ENV_PROVIDERS,
    APP_PROVIDERS
  ]
})
export class AppModule {

  constructor(
    public appRef: ApplicationRef,
    public appState: AppState
  ) {}

  public hmrOnInit(store: StoreType) {
    if (!store || !store.state) {
      return;
    }
    console.log('HMR store', JSON.stringify(store, null, 2));
    /**
     * Set state
     */
    this.appState._state = store.state;
    /**
     * Set input values
     */
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  public hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
    /**
     * Save state
     */
    const state = this.appState._state;
    store.state = state;
    /**
     * Recreate root elements
     */
    store.disposeOldHosts = createNewHosts(cmpLocation);
    /**
     * Save input values
     */
    store.restoreInputValues  = createInputTransfer();
    /**
     * Remove styles
     */
    removeNgStyles();
  }

  public hmrAfterDestroy(store: StoreType) {
    /**
     * Display new elements
     */
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}
