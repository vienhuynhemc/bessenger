import { NgModule, Injectable, defineInjectable, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Main module of the library
 */
class NgwWowModule {
}
NgwWowModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Configuration for the NgwWowService service.
 */
class NgwWowConfig {
    constructor() {
        /**
         * Class name that reveals the hidden box when user scrolls.
         */
        this.boxClass = 'wow';
        /**
         * Class name that triggers the CSS animations ('animated' by default for the animate.css library)
         */
        this.animateClass = 'animated';
        /**
         * Define the distance between the bottom of browser viewport and the top of hidden box.
         * When the user scrolls and reach this distance the hidden box is revealed.
         */
        this.offset = 0;
        /**
         * Turn on/off WOW.js on mobile devices.
         */
        this.mobile = true;
        /**
         * Consatantly check for new WOW elements on the page.
         */
        this.live = true;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Service to interact with the window object.
 */
class WindowService {
    /**
     * @return {?}
     */
    get nativeWindow() {
        return _window();
    }
}
WindowService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] },
];
/** @nocollapse */ WindowService.ngInjectableDef = defineInjectable({ factory: function WindowService_Factory() { return new WindowService(); }, token: WindowService, providedIn: "root" });
/**
 * @return {?}
 */
function _window() {
    // Return the global native browser window object
    return typeof window !== 'undefined' ? window : undefined;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NgwWowService {
    /**
     * @param {?} windowService
     */
    constructor(windowService) {
        // Observable  source
        this.itemRevealedSource = new Subject();
        // Observable  stream
        this.itemRevealed$ = this.itemRevealedSource.asObservable();
        this.window = windowService.nativeWindow;
    }
    /**
     * @param {?=} config
     * @return {?}
     */
    init(config) {
        if (this.window) {
            // For Angular Universal suport
            const /** @type {?} */ wowConfig = config || {};
            // Set callback hook:
            wowConfig.callback = () => this.itemRevealedSource.next();
            // Initializes the library
            new WOW(wowConfig).init();
        }
    }
}
NgwWowService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] },
];
/** @nocollapse */
NgwWowService.ctorParameters = () => [
    { type: WindowService, },
];
/** @nocollapse */ NgwWowService.ngInjectableDef = defineInjectable({ factory: function NgwWowService_Factory() { return new NgwWowService(inject(WindowService)); }, token: NgwWowService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { NgwWowModule, NgwWowConfig, WindowService, NgwWowService };
//# sourceMappingURL=ngx-wow.js.map
