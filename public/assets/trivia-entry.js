/* Night Drop Trivia entry: long-press POWER (.nd-pwr) to enter the theater. */
(function(){var t=null,HOLD=800;function clear(){if(t){clearTimeout(t);t=null}}
document.addEventListener("pointerdown",function(e){var b=e.target&&e.target.closest&&e.target.closest(".nd-pwr");if(!b)return;clear();t=setTimeout(function(){t=null;location.href="/trivia.html"},HOLD)},true);
["pointerup","pointercancel","pointerleave"].forEach(function(n){document.addEventListener(n,clear,true)});
document.addEventListener("contextmenu",function(e){if(e.target&&e.target.closest&&e.target.closest(".nd-pwr"))e.preventDefault()},true)})();
