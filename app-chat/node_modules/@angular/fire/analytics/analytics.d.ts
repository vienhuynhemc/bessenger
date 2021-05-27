import { InjectionToken, NgZone } from '@angular/core';
import { ɵPromiseProxy, FirebaseApp } from '@angular/fire';
import firebase from 'firebase/app';
import * as ɵngcc0 from '@angular/core';
export interface Config {
    [key: string]: any;
}
export declare const COLLECTION_ENABLED: InjectionToken<boolean>;
export declare const APP_VERSION: InjectionToken<string>;
export declare const APP_NAME: InjectionToken<string>;
export declare const DEBUG_MODE: InjectionToken<boolean>;
export declare const CONFIG: InjectionToken<Config>;
export interface AngularFireAnalytics extends ɵPromiseProxy<firebase.analytics.Analytics> {
}
export declare class AngularFireAnalytics {
    private measurementId;
    private analyticsInitialized;
    updateConfig(config: Config): Promise<void>;
    constructor(app: FirebaseApp, analyticsCollectionEnabled: boolean | null, providedAppVersion: string | null, providedAppName: string | null, debugModeEnabled: boolean | null, providedConfig: Config | null, platformId: Object, zone: NgZone);
    static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<AngularFireAnalytics, [null, { optional: true; }, { optional: true; }, { optional: true; }, { optional: true; }, { optional: true; }, null, null]>;
}

//# sourceMappingURL=analytics.d.ts.map