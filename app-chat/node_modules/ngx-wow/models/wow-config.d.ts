/**
 * Configuration for the NgwWowService service.
 */
export declare class NgwWowConfig {
    /**
     * Class name that reveals the hidden box when user scrolls.
     */
    boxClass?: string;
    /**
     * Class name that triggers the CSS animations ('animated' by default for the animate.css library)
     */
    animateClass?: string;
    /**
     * Define the distance between the bottom of browser viewport and the top of hidden box.
     * When the user scrolls and reach this distance the hidden box is revealed.
     */
    offset?: number;
    /**
     * Turn on/off WOW.js on mobile devices.
     */
    mobile?: boolean;
    /**
     * Consatantly check for new WOW elements on the page.
     */
    live?: boolean;
    /**
     * Callback called when the given box element is shown.
     */
    callback?: (box: HTMLElement) => void;
    scrollContainer?: string;
}
