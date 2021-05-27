import { ComponentFactoryResolver, NgZone, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAnalytics } from './analytics';
import { Title } from '@angular/platform-browser';
import { UserTrackingService } from './user-tracking.service';
import * as ɵngcc0 from '@angular/core';
export declare class ScreenTrackingService implements OnDestroy {
    private disposable;
    constructor(analytics: AngularFireAnalytics, router: Router, title: Title, componentFactoryResolver: ComponentFactoryResolver, platformId: Object, zone: NgZone, userTrackingService: UserTrackingService);
    ngOnDestroy(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<ScreenTrackingService, [null, { optional: true; }, { optional: true; }, null, null, null, { optional: true; }]>;
    static ɵprov: ɵngcc0.ɵɵInjectableDeclaration<ScreenTrackingService>;
}

//# sourceMappingURL=screen-tracking.service.d.ts.map