require('./main.scss');

import '../../greensock-js/src/uncompressed/TweenLite.js';
import '../../greensock-js/src/uncompressed/TweenMax.js';
import '../../greensock-js/src/uncompressed/easing/EasePack.js';
import '../../greensock-js/src/uncompressed/plugins/CSSPlugin.js';
import '../../greensock-js/src/uncompressed/plugins/MorphSVGPlugin.js';
import '../../greensock-js/src/uncompressed/plugins/ScrollToPlugin.js';
import '../../greensock-js/src/uncompressed/plugins/DrawSVGPlugin.js';
import '../../greensock-js/src/uncompressed/utils/SplitText.js';


import HideOnScroll from './js/menu.js';
const hideOnScroll = new HideOnScroll();
hideOnScroll.init();