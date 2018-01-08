import { selectors } from './inc/_selectors.js'
import * as render  from './render.js'
import * as request from './request.js'



const listenForInput = () => {
  selectors.input.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
      if(selectors.input.value.length == 0) { 
        console.log("you dont type city"); return;
      } else {
        request.searchWeather(selectors.input.value, "celsius", render.renderWeather)

        }
    }
  });
}
listenForInput(); //init

//make recent block
//push current city to recent block
