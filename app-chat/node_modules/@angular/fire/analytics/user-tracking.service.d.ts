import { NgZone, OnDestroy } from '@angular/core';
import { AngularFireAnalytics } from './analytics';
import { AngularFireAuth } from '@angular/fire/auth';
import * as ɵngcc0 from '@angular/core';
export declare class UserTrackingService implements OnDestroy {
    initialized: Promise<void>;
    private disposables;
    constructor(analytics: AngularFireAnalytics, platformId: Object, auth: AngularFireAuth, zone: NgZone);
    ngOnDestroy(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<UserTrackingService, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDeclaration<UserTrackingService>;
}

//# sourceMappingURL=user-tracking.service.d.ts.map