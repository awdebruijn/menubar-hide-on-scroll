/*
    Dependencies: GSAP TweenLite registered as an external in webpack config.
    Requirements:
        * a fixed positioned menu bar with a class '.js-menu' on it. 
        * Babel for IE11 support
    Behaviour: 
        Menu scrolls up and down with scrolling speed, as seen in some iOS apps. 
        It's not depending on the scroll position of the page.
*/


export default class HideOnScroll {
    constructor(menuBarMaxPosition) {
        this.lastScrollPosition = 0;
        this.nextScrollPosition = 0;
        this.deltaScroll = 0;
        this.scrollDirection = null;
        this.menuBar = null;
        this.menuBarMinPosition = null;
        this.menuBarMaxPosition = menuBarMaxPosition;
    }

    init() {
        _.bindAll(this, 'scrollEvent');
        this.menuBar = document.querySelectorAll('.js-menu')[0];
        this.menuBarMinPosition = this.menuBar.offsetTop;
        if (!this.menuBarMaxPosition > 0) {
            this.menuBarMaxPosition = this.menuBar.offsetHeight;
        }

        window.addEventListener('scroll', this.scrollEvent);
    }

    updateElement(el, scrollDirection) {
        if (el._gsTransform == undefined) {
            TweenLite.set(el, { y: 0, force3D: true });
        }
        let currentTransformY = el._gsTransform.y;
        let opacity = 1 - Math.abs(currentTransformY) / (this.menuBarMaxPosition - this.menuBarMinPosition);

        if (scrollDirection == 1 && -1 * currentTransformY <= this.menuBarMaxPosition) {
            if (!(currentTransformY - this.deltaScroll < -1 * this.menuBarMaxPosition)) {
                TweenLite.set(el, { 
                    y: currentTransformY - this.deltaScroll,
                    opacity: opacity,
                    force3D: true });
            } else {
                TweenLite.set(el, { 
                    y: -1 * this.menuBarMaxPosition, 
                    opacity: opacity,
                    force3D: true });
            }
        } else if (scrollDirection == -1 && -1 * currentTransformY >= this.menuBarMinPosition) {
            if (!(currentTransformY + this.deltaScroll > this.menuBarMinPosition)) {
                TweenLite.set(el, {
                     y: currentTransformY + this.deltaScroll,
                     opacity: opacity,
                     force3D: true });
            } else {
                TweenLite.set(el, { 
                    y: this.menuBarMinPosition, 
                    opacity: opacity,
                    force3D: true });
            }
        }
    }

    scrollEvent() {
        this.nextScrollPosition = window.scrollY;
        this.deltaScroll = Math.abs(this.nextScrollPosition - this.lastScrollPosition);
        if (this.nextScrollPosition > this.lastScrollPosition) {
            this.scrollDirection = 1;
            this.lastScrollPosition = this.nextScrollPosition;
        } else {
            this.scrollDirection = -1;
            this.lastScrollPosition = this.nextScrollPosition;
        }

        this.updateElement(this.menuBar, this.scrollDirection);
    }
}