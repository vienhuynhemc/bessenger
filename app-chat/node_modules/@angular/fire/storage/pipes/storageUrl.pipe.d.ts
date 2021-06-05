import { ChangeDetectorRef, OnDestroy, PipeTransform } from '@angular/core';
import { AngularFireStorage } from '../storage';
/** to be used with in combination with | async */
import * as ɵngcc0 from '@angular/core';
export declare class GetDownloadURLPipe implements PipeTransform, OnDestroy {
    private storage;
    private asyncPipe;
    private path;
    private downloadUrl$;
    constructor(storage: AngularFireStorage, cdr: ChangeDetectorRef);
    transform(path: string): any;
    ngOnDestroy(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<GetDownloadURLPipe, never>;
    static ɵpipe: ɵngcc0.ɵɵPipeDeclaration<GetDownloadURLPipe, "getDownloadURL">;
}
export declare class GetDownloadURLPipeModule {
    static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<GetDownloadURLPipeModule, never>;
    static ɵmod: ɵngcc0.ɵɵNgModuleDeclaration<GetDownloadURLPipeModule, [typeof GetDownloadURLPipe], never, [typeof GetDownloadURLPipe]>;
    static ɵinj: ɵngcc0.ɵɵInjectorDeclaration<GetDownloadURLPipeModule>;
}

//# sourceMappingURL=storageUrl.pipe.d.ts.map