import { InjectionToken, NgZone } from '@angular/core';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { FirebaseAppConfig, FirebaseOptions, ɵPromiseProxy } from '@angular/fire';
import * as ɵngcc0 from '@angular/core';
export declare const VAPID_KEY: InjectionToken<string>;
export declare const SERVICE_WORKER: InjectionToken<Promise<ServiceWorkerRegistration>>;
export interface AngularFireMessaging extends Omit<ɵPromiseProxy<firebase.messaging.Messaging>, 'deleteToken' | 'getToken' | 'requestPermission'> {
}
export declare class AngularFireMessaging {
    readonly requestPermission: Observable<void>;
    readonly getToken: Observable<string | null>;
    readonly tokenChanges: Observable<string | null>;
    readonly messages: Observable<{}>;
    readonly requestToken: Observable<string | null>;
    readonly deleteToken: (token: string) => Observable<boolean>;
    constructor(options: FirebaseOptions, nameOrConfig: string | FirebaseAppConfig | null | undefined, platformId: Object, zone: NgZone, vapidKey: string | null, _serviceWorker: any);
    static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<AngularFireMessaging, [null, { optional: true; }, null, null, { optional: true; }, { optional: true; }]>;
}

//# sourceMappingURL=messaging.d.ts.map