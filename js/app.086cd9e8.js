(function(){"use strict";var e={7838:function(e,t,r){var a=r(6369),n=function(){var e=this,t=e._self._c;return t("div",{attrs:{id:"app"}},[t("h1",[e._v("Location Finder")]),t("CurrentLocation",{staticClass:"current-location",attrs:{currentLatitude:e.currentLatitude,currentLongitude:e.currentLongitude},on:{updateCurrentLocation:e.updateCurrentLocation}}),t("MapContainer",{staticClass:"map-container",attrs:{currentLatitude:e.currentLatitude,currentLongitude:e.currentLongitude,acquireClickCounter:e.acquireClickCounter}})],1)},i=[],s=function(){var e=this,t=e._self._c;return t("div",{staticClass:"current-location"},[t("h3",[e._v("Current Geolocation")]),t("h4",[e._v(e._s(this.currentLatitude.toFixed(6))+"°, "+e._s(this.currentLongitude.toFixed(6))+"°")]),t("button",{staticClass:"btn btn-dark btn-sm mb-3",on:{click:e.getLocation}},[e._v("Acquire current locaiton")])])},o=[],c={name:"CurrentLocation",props:{currentLatitude:Number,currentLongitude:Number},methods:{getLocation(){navigator.geolocation&&navigator.geolocation.getCurrentPosition(this.handleSuccess,this.handleError)},handleSuccess(e){const t=e.coords.latitude,r=e.coords.longitude;this.updateCurrentLocation(t,r)},handleError(e){console.log(e)},updateCurrentLocation(e,t){this.$emit("updateCurrentLocation",e,t)}}},u=c,h=r(1001),l=(0,h.Z)(u,s,o,!1,null,"07f6f6ab",null),d=l.exports,p=function(){var e=this,t=e._self._c;return t("div",{staticClass:"container"},[t("SearchLocation",{staticClass:"search-location",attrs:{searchLatitude:e.searchLatitude,searchLongitude:e.searchLongitude},on:{updateSearchLocation:e.updateSearchLocation}}),t("div",{attrs:{id:"map-container"}}),t("SearchMarkerList",{staticClass:"search-markerList",attrs:{searchMarkerList:e.searchMarkerList},on:{deleteSelectedMarkers:e.deleteSelectedMarkers}})],1)},A=[],g=(r(7658),function(){var e=this,t=e._self._c;return t("div",{staticClass:"search-location"},[t("h3",[e._v(" Latest searched Location ")]),t("p",[t("b",[e._v("Place:")]),e._v(" "+e._s(this.searchName))]),t("p",[t("b",[e._v("Geolocation:")]),e._v(" "+e._s(this.searchLatitude.toFixed(6))+"°, "+e._s(this.searchLongitude.toFixed(6))+"°")]),t("p",[t("b",[e._v("Time Zone:")]),e._v(" "+e._s(e.searchTimeZone))]),t("p",[t("b",[e._v("Local Time:")]),e._v(" "+e._s(e.searchLocalTime))]),t("vue-google-autocomplete",{ref:"autocomplete",staticClass:"form-control mb-1",attrs:{id:"map-autocomplete",placeholder:"Enter a location",types:"geocode"},on:{placechanged:e.handlePlaceChanged}}),t("p",[e._v("*please choose one of the suggestive locations when the dropdown is shown*")])],1)}),m=[],L=r(8435),v=r(4161),f={name:"SearchLocation",components:{VueGoogleAutocomplete:L.Z},data(){return{searchPlace:null,searchName:"",libraries:"places",isSelected:!1,searchTimeZone:null,searchLocalTime:null,arrowKeyIsPressed:!1,uniqueId:0}},mounted(){setInterval(this.updatePlace,1e3)},props:{searchLatitude:Number,searchLongitude:Number},methods:{handlePlaceChanged(e){this.searchPlace=e;const t=this.searchPlace.latitude,r=this.searchPlace.longitude;this.getPlace(t,r)},getPlace(e,t){const r=`https://maps.googleapis.com/maps/api/timezone/json?key=AIzaSyCCvxNCEJen7VzPMwgErCK9_6oL2I65M7E&location=${e},${t}&timestamp=${Math.floor(Date.now()/1e3)}`;v.Z.get(r).then((r=>{const a=r.data.timeZoneId,n=(new Date).toLocaleString("en-US",{timeZone:a});this.searchTimeZone=a,this.searchLocalTime=n,this.updateSearchLocation(e,t,[this.$refs.autocomplete.autocompleteText,this.searchTimeZone,this.uniqueId]),this.uniqueId+=1,this.searchName=this.$refs.autocomplete.autocompleteText,this.$refs.autocomplete.autocompleteText=""})).catch((e=>{console.error("Error:",e)}))},updatePlace(){if(0!==this.searchLatitude){const e=`https://maps.googleapis.com/maps/api/timezone/json?key=AIzaSyCCvxNCEJen7VzPMwgErCK9_6oL2I65M7E&location=${this.searchLatitude},${this.searchLongitude}&timestamp=${Math.floor(Date.now()/1e3)}`;v.Z.get(e).then((e=>{const t=e.data.timeZoneId,r=(new Date).toLocaleString("en-US",{timeZone:t});this.searchTimeZone=t,this.searchLocalTime=r})).catch((e=>{console.error("Error:",e)}))}},updateSearchLocation(e,t,r){this.$emit("updateSearchLocation",e,t,r)}}},k=f,C=(0,h.Z)(k,g,m,!1,null,"31286f3c",null),M=C.exports,P=function(){var e=this,t=e._self._c;return t("div",[t("h3",[e._v("Searched Records")]),t("div",{staticClass:"d-flex justify-content-start gap-2"},[t("button",{staticClass:"btn btn-danger btn-sm",on:{click:e.deleteSelectedMarkers}},[e._v("Delete Selected Records")]),t("button",{staticClass:"btn btn-success btn-sm",on:{click:e.clearSelections}},[e._v("Clear Selections")])]),t("table",{staticClass:"table table-striped"},[e._m(0),t("tbody",e._l(e.paginatedMarkers,(function(r){return t("tr",{key:r.options.title[2]},[t("td",[t("input",{directives:[{name:"model",rawName:"v-model",value:e.selectedMarkers,expression:"selectedMarkers"}],attrs:{type:"checkbox"},domProps:{value:r.options.title[2],checked:Array.isArray(e.selectedMarkers)?e._i(e.selectedMarkers,r.options.title[2])>-1:e.selectedMarkers},on:{change:function(t){var a=e.selectedMarkers,n=t.target,i=!!n.checked;if(Array.isArray(a)){var s=r.options.title[2],o=e._i(a,s);n.checked?o<0&&(e.selectedMarkers=a.concat([s])):o>-1&&(e.selectedMarkers=a.slice(0,o).concat(a.slice(o+1)))}else e.selectedMarkers=i}}})]),t("td",[e._v(e._s(r.options.title[0]))]),t("td",[e._v(e._s(r.options.title[1]))]),t("td",[e._v(e._s(r.getLatLng().lat.toFixed(6))+"°")]),t("td",[e._v(e._s(r.getLatLng().lng.toFixed(6))+"°")])])})),0)]),t("nav",[t("ul",{staticClass:"pagination"},[t("li",{staticClass:"page-item",class:{disabled:1===e.currentPage}},[t("a",{staticClass:"page-link",attrs:{href:"#","aria-label":"Previous"},on:{click:function(t){return e.goToPage(e.currentPage-1)}}},[t("span",{attrs:{"aria-hidden":"true"}},[e._v("«")])])]),e._l(e.totalPages,(function(r){return t("li",{key:r,staticClass:"page-item",class:{active:r===e.currentPage}},[t("a",{staticClass:"page-link",attrs:{href:"#"},on:{click:function(t){return e.goToPage(r)}}},[e._v(e._s(r))])])})),t("li",{staticClass:"page-item",class:{disabled:e.currentPage===e.totalPages}},[t("a",{staticClass:"page-link",attrs:{href:"#","aria-label":"Next"},on:{click:function(t){return e.goToPage(e.currentPage+1)}}},[t("span",{attrs:{"aria-hidden":"true"}},[e._v("»")])])])],2)])])},b=[function(){var e=this,t=e._self._c;return t("thead",[t("tr",[t("th"),t("th",[e._v("Location")]),t("th",[e._v("Time Zone")]),t("th",[e._v("Lat")]),t("th",[e._v("Lng")])])])}],S={name:"SearchMarkerList",data(){return{markersPerPage:10,currentPage:1,selectedMarkers:[]}},props:{searchMarkerList:Array},computed:{paginatedMarkers(){const e=(this.currentPage-1)*this.markersPerPage,t=e+this.markersPerPage;return this.searchMarkerList.slice(e,t)},totalPages(){return Math.ceil(this.searchMarkerList.length/this.markersPerPage)}},methods:{goToPage(e){e>=1&&e<=this.totalPages&&(this.currentPage=e)},clearSelections(){this.selectedMarkers=[]},deleteSelectedMarkers(){this.$emit("deleteSelectedMarkers",this.selectedMarkers),this.selectedMarkers=[],this.goToPage(1)}}},w=S,I=(0,h.Z)(w,P,b,!1,null,"d37d1084",null),T=I.exports,x=r(3153),D=r.n(x),Z=r.p+"img/current-marker.f1afc3c4.png",y="data:image/png;base64,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",B={name:"MapContainer",components:{SearchLocation:M,SearchMarkerList:T},data(){return{map:null,searchLatitude:0,searchLongitude:0,searchPlace:[],currentMarkerIcon:null,searchMarkerIcon:null,currentMarker:null,searchMarkerList:[]}},props:{currentLatitude:Number,currentLongitude:Number,acquireClickCounter:Number},mounted(){this.initMap()},watch:{acquireClickCounter:function(){this.handleCurrentLocationChange()},searchLatitude:function(){this.handleSearchLocationChange()}},methods:{initMap(){this.map=D().map("map-container").setView([50.1304,-98.3468],1),D().tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"Map data © OpenStreetMap contributors"}).addTo(this.map);const e=D().latLng(-89.98155760646617,-180),t=D().latLng(89.99346179538875,180),r=D().latLngBounds(e,t);this.map.setMaxBounds(r),this.currentMarkerIcon=D().icon({iconUrl:Z,iconSize:[96,96],iconAnchor:[48,96]}),this.searchMarkerIcon=D().icon({iconUrl:y,iconSize:[50,50],iconAnchor:[25,50]})},handleCurrentLocationChange(){this.currentMarker&&this.currentMarker.removeFrom(this.map),this.map.setView([this.currentLatitude,this.currentLongitude],3),this.currentMarker=D().marker([this.currentLatitude,this.currentLongitude],{icon:this.currentMarkerIcon}).addTo(this.map)},handleSearchLocationChange(){this.map.setView([this.searchLatitude,this.searchLongitude],3),this.updateMarkerList(D().marker([this.searchLatitude,this.searchLongitude],{title:this.searchPlace,icon:this.searchMarkerIcon}).addTo(this.map))},deleteSelectedMarkers(e){const t=this.searchMarkerList.filter((t=>e.includes(t.options.title[2])));t.forEach((e=>{e.removeFrom(this.map)})),this.searchMarkerList=this.searchMarkerList.filter((t=>!e.includes(t.options.title[2]))),this.map.setView([50.1304,-98.3468],1)},updateMarkerList(e){this.searchMarkerList.push(e)},updateSearchLocation(e,t,r){this.searchLatitude=e,this.searchLongitude=t,this.searchPlace=r}}},E=B,_=(0,h.Z)(E,p,A,!1,null,"1ae91f4a",null),N=_.exports,F={name:"App",components:{CurrentLocation:d,MapContainer:N},data(){return{currentLatitude:0,currentLongitude:0,acquireClickCounter:0}},methods:{updateCurrentLocation(e,t){this.currentLatitude=e,this.currentLongitude=t,this.acquireClickCounter+=1}}},q=F,z=(0,h.Z)(q,n,i,!1,null,null,null),G=z.exports;a.ZP.config.productionTip=!1,new a.ZP({render:e=>e(G)}).$mount("#app")}},t={};function r(a){var n=t[a];if(void 0!==n)return n.exports;var i=t[a]={exports:{}};return e[a].call(i.exports,i,i.exports,r),i.exports}r.m=e,function(){var e=[];r.O=function(t,a,n,i){if(!a){var s=1/0;for(h=0;h<e.length;h++){a=e[h][0],n=e[h][1],i=e[h][2];for(var o=!0,c=0;c<a.length;c++)(!1&i||s>=i)&&Object.keys(r.O).every((function(e){return r.O[e](a[c])}))?a.splice(c--,1):(o=!1,i<s&&(s=i));if(o){e.splice(h--,1);var u=n();void 0!==u&&(t=u)}}return t}i=i||0;for(var h=e.length;h>0&&e[h-1][2]>i;h--)e[h]=e[h-1];e[h]=[a,n,i]}}(),function(){r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,{a:t}),t}}(),function(){r.d=function(e,t){for(var a in t)r.o(t,a)&&!r.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})}}(),function(){r.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){r.p="/location-finder/"}(),function(){var e={143:0};r.O.j=function(t){return 0===e[t]};var t=function(t,a){var n,i,s=a[0],o=a[1],c=a[2],u=0;if(s.some((function(t){return 0!==e[t]}))){for(n in o)r.o(o,n)&&(r.m[n]=o[n]);if(c)var h=c(r)}for(t&&t(a);u<s.length;u++)i=s[u],r.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return r.O(h)},a=self["webpackChunklocation_finder"]=self["webpackChunklocation_finder"]||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))}();var a=r.O(void 0,[998],(function(){return r(7838)}));a=r.O(a)})();
//# sourceMappingURL=app.086cd9e8.js.map