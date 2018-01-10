import { selectors } from './inc/_selectors.js'
import * as render  from './render.js'
import * as request from './request.js'
import * as listen  from './listen.js'




render.buildRecentCities();
listen.isInputPopulate(request, render); //init

window.onpopstate = function() {
  listen.isInputPopulate(request, render); //init
}



