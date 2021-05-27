import { InjectionToken, NgZone } from '@angular/core';
import { AngularFireList, AngularFireObject, PathReference, QueryFn } from './interfaces';
import { FirebaseAppConfig, FirebaseOptions, ɵAngularFireSchedulers } from '@angular/fire';
import { Observable } from 'rxjs';
import 'firebase/database';
import firebase from 'firebase/app';
import * as ɵngcc0 from '@angular/core';
export declare const URL: InjectionToken<string>;
declare type UseEmulatorArguments = [string, number];
export declare const USE_EMULATOR: InjectionToken<UseEmulatorArguments>;
export declare class AngularFireDatabase {
    readonly database: firebase.database.Database;
    readonly schedulers: ɵAngularFireSchedulers;
    readonly keepUnstableUntilFirst: <T>(obs$: Observable<T>) => Observable<T>;
    constructor(options: FirebaseOptions, nameOrConfig: string | FirebaseAppConfig | null | undefined, databaseURL: string | null, platformId: Object, zone: NgZone, _useEmulator: any, // tuple isn't working here
    useAuthEmulator: any);
    list<T>(pathOrRef: PathReference, queryFn?: QueryFn): AngularFireList<T>;
    object<T>(pathOrRef: PathReference): AngularFireObject<T>;
    createPushId(): string;
    static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<AngularFireDatabase, [null, { optional: true; }, { optional: true; }, null, null, { optional: true; }, { optional: true; }]>;
}
export { PathReference, DatabaseSnapshot, ChildEvent, ListenEvent, QueryFn, AngularFireList, AngularFireObject, AngularFireAction, Action, SnapshotAction } from './interfaces';

//# sourceMappingURL=database.d.ts.map