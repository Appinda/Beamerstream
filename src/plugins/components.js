import Vue from 'vue';

import Header from '~/components/Header';
import Songlist from '~/components/Songlist';
import TransitionSwitch from '~/components/TransitionSwitch';
import SongPanel from '~/components/SongPanel';
import LiveAlert from '~/components/LiveAlert';

import Themelist from '~/components/Themelist';

Vue.component('bs-header', Header);
Vue.component('bs-songlist', Songlist);
Vue.component('bs-transitionswitch', TransitionSwitch);
Vue.component('bs-songpanel', SongPanel);
Vue.component('bs-livealert', LiveAlert);

Vue.component('bs-themelist', Themelist);
