(()=>{"use strict";class t{constructor(t,e=[]){this.name=t,this.list=e}}const e=(()=>{const e=[];return{createProject:(r,c=[])=>{let n=new t(r,c);return e.push(n),n},getProjectsArray:()=>e}})();e.createProject("Today"),(t=>{let e=t;for(let t=0;t<e.length;t++){let r=document.createElement("div"),c=document.querySelector("#container");r.textContent=e[t].name,r.style="height: 50px; width: 50px",c.appendChild(r)}})(e.getProjectsArray())})();