(()=>{"use strict";const e="cc9bf0bb9b1d436f954212750232709",t="https://api.weatherapi.com/v1";async function n(n){const a=`${t}/forecast.json?key=${e}&q=${n}&days=3&aqi=no&alerts=no`;return(await fetch(a)).json()}function a(e){e.replaceChildren()}function r(e){const{location:t,current:n,forecast:a}=e,r=function(e){const{name:t,region:n,country:a,localtime:r}=e,o=`\n    <header class="weather-location">\n      <hgroup id="todays-date">\n        <h1>Today</h1>\n        <p>${new Date(r).toLocaleDateString(void 0,{weekday:"short",year:"numeric",month:"long",day:"numeric"})}</p>\n      </hgroup>\n      <div id="full-location" class="headings">\n        <h2>${t}</h3>\n        <p>${n?`${n},`:""} ${a}</p>\n      </div>\n    </header>\n  `;return(new DOMParser).parseFromString(o,"text/html").querySelector(".weather-location")}(t),o=function(e){const t=localStorage.getItem("degree"),n=`${"C"===t?e.temp_c:e.temp_f} º${t}`,{condition:{icon:a,text:r}}=e,o=`\n    <div class="weather-body">\n      <div class="todays-temperature"><strong>${n}</strong></div>\n      <figure class="todays-condition">\n        <img src=${a}>\n        <figcaption>${r}</figcaption>\n      </figure>\n    </div>\n  `;return(new DOMParser).parseFromString(o,"text/html").querySelector(".weather-body")}(n),c=function(e){const{forecastday:t}=e,n=t.slice(1),a=document.createElement("footer");return a.classList.add("weather-footer"),n.forEach(((e,t)=>{const n=function(e,t){const{date:n,day:{avgtemp_c:a,avgtemp_f:r,condition:o}}=e,c=0===t?"Tomorrow":"After tomorrow",i=localStorage.getItem("degree"),s=`${"C"===i?a:r} º${i}`,l=`\n    <details class="forecast-day">\n      <summary role="button" class="outline contrast">${c}</summary>\n      <ul>\n        <li><strong>${new Date(n).toUTCString().match(/.*(?= 00:)/)[0]}</strong></li>\n        <li>Temperature: <strong class="forecast-temperature">${s}</strong></li>\n        <li><img src="${o.icon}"> ${o.text}</li>\n      </ul>\n    </details>\n  `;return(new DOMParser).parseFromString(l,"text/html").querySelector(".forecast-day")}(e,t);a.appendChild(n)})),a}(a),i=document.createElement("article");i.appendChild(r),i.appendChild(o),i.appendChild(c);const s=document.querySelector(".main");s.replaceChildren(),s.appendChild(i)}function o(e){document.querySelectorAll("button[data-degree]").forEach((t=>{t.dataset.degree===e?(t.classList.remove("secondary","outline"),t.classList.add("primary")):(t.classList.remove("primary"),t.classList.add("secondary","outline"))}))}!function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"C";const t=localStorage.getItem("degree");t?o(t):(localStorage.setItem("degree",e),o(e))}(),async function(){const e=localStorage.getItem("forecast-object");let t;if(e){const n=JSON.parse(e),{location:{name:a,region:r,country:o}}=n;t=`${a} ${r} ${o}`}else t="Lima Lima Peru";const a=await n(t),o=JSON.stringify(a);localStorage.setItem("forecast-object",o),r(a)}();const c=document.querySelector(".search-form");c.addEventListener("submit",(async function(e){e.preventDefault();const t=e.target.elements.namedItem("location");if("false"===t.getAttribute("aria-invalid")){const e=document.querySelector(".main");e.setAttribute("aria-busy","true");const a=t.value.trim(),o=await n(a),c=JSON.stringify(o);localStorage.setItem("forecast-object",c),r(o),e.removeAttribute("aria-busy")}})),c.addEventListener("input",(async function(n){const r=n.target,{list:o}=r,c=r.value.trim();if(c){const n=await async function(n){const a=`${t}/search.json?key=${e}&q=${n}`,r=await fetch(a);return function(e){const t=new Map;return e.forEach((e=>{t.set(e.url,e)})),[...t.values()]}(await r.json())}(c);n.length>0?(r.setAttribute("aria-invalid","false"),function(e,t){e.replaceChildren(),t.forEach((t=>{const{name:n,region:a,country:r}=t,o=document.createElement("option");o.value=`${n} ${a} ${r}`,e.appendChild(o)}))}(o,n)):(r.setAttribute("aria-invalid","true"),a(o))}else r.removeAttribute("aria-invalid"),a(o)})),document.querySelector(".degree-menu").addEventListener("click",(function(e){if("BUTTON"===e.target.nodeName){const t=e.target,{degree:n}=t.dataset;localStorage.setItem("degree",n),o(n);const a=localStorage.getItem("forecast-object");r(JSON.parse(a))}}))})();