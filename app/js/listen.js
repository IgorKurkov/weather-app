import { selectors } from './inc/_selectors.js'

export const isInputPopulate = (request, render) => {
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