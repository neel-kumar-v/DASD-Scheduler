import { getQueryVariable } from "../../util";

let counselor;
window.onload = function() {
    console.log("onload function");
    // getQueryVariable('counselor')
    //create a tailwind h1 with the var
    counselor = getQueryVariable('counselor')
}


