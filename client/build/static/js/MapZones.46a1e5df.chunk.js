(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[11],{109:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var o=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];return t.find((function(t){return t._id===e}))}},114:function(e,t,n){"use strict";var o,l;n.d(t,"b",(function(){return o})),n.d(t,"a",(function(){return l})),function(e){e.DANGEROUS="DANGEROUS",e.RISKY="RISKY",e.SAFE="SAFE"}(o||(o={})),function(e){e.DISTRICT="DISTRICT",e.CITY="CITY",e.REGION="REGION",e.COUNTRY="COUNTRY"}(l||(l={}))},115:function(e,t,n){"use strict";var o=n(114);t.a=function(e,t){var n="",l="",a="",i="";switch(e){case o.b.DANGEROUS:n="#EA5C73",l="#FF4967",a=t&&t("selectedZoneName.statusBadge.dangerous"),i="#ff0c0c26";break;case o.b.RISKY:n="#EF7C38",l="#FF9635",a=t&&t("selectedZoneName.statusBadge.warning"),i="#ffeb0159";break;case o.b.SAFE:n="#87D03F",l="#87D03F",a=t&&t("selectedZoneName.statusBadge.safe"),i="#8ff8293d"}return{textInWhiteBg:n,textInBlueishBg:l,text:a,bgColor:i}}},116:function(e,t,n){"use strict";n.d(t,"a",(function(){return l}));var o=n(129),l=function(e){var t,n,l,a;switch(Object(o.a)()){case"uz":a=null===e||void 0===e||null===(t=e.properties)||void 0===t?void 0:t.displayNameUz;break;case"ru":a=null===e||void 0===e||null===(n=e.properties)||void 0===n?void 0:n.displayNameRu;break;default:a=null===e||void 0===e||null===(l=e.properties)||void 0===l?void 0:l.displayNameUz}return a}},129:function(e,t,n){"use strict";n.d(t,"a",(function(){return l}));var o=n(38),l=function(){return o.a.language||"undefined"!==typeof window&&window.localStorage.i18nextLng||"uz"}},167:function(e,t,n){"use strict";n.d(t,"a",(function(){return l}));var o=n(44),l=function(e){var t=Object(o.a)(e,4),n=t[0],l=t[1],a=t[2];return[[t[3],a],[l,n]]}},372:function(e,t,n){},373:function(e,t,n){"use strict";e.exports=function e(t,n){if(t===n)return!0;if(t&&n&&"object"==typeof t&&"object"==typeof n){if(t.constructor!==n.constructor)return!1;var o,l,a;if(Array.isArray(t)){if((o=t.length)!=n.length)return!1;for(l=o;0!==l--;)if(!e(t[l],n[l]))return!1;return!0}if(t.constructor===RegExp)return t.source===n.source&&t.flags===n.flags;if(t.valueOf!==Object.prototype.valueOf)return t.valueOf()===n.valueOf();if(t.toString!==Object.prototype.toString)return t.toString()===n.toString();if((o=(a=Object.keys(t)).length)!==Object.keys(n).length)return!1;for(l=o;0!==l--;)if(!Object.prototype.hasOwnProperty.call(n,a[l]))return!1;for(l=o;0!==l--;){var i=a[l];if(!e(t[i],n[i]))return!1}return!0}return t!==t&&n!==n}},429:function(e,t,n){"use strict";n.r(t);var o=n(44),l=(n(139),n(0)),a=n.n(l),i=n(1),r=n(18),s=n(14),u=n(6),c=n(19),p=n(112),f=n(29),d=n.n(f),m=Object(l.createContext)({}),h=m.Consumer,b=m.Provider,v=function(e){var t=function(t,n){return a.a.createElement(h,null,(function(o){return a.a.createElement(e,Object(i.a)({},t,{leaflet:o,ref:n}))}))},n=e.displayName||e.name||"Component";t.displayName="Leaflet("+n+")";var o=Object(l.forwardRef)(t);return d()(o,e),o},g=/^on(.+)$/i,O=function(e){function t(t){var n;return n=e.call(this,t)||this,Object(c.a)(Object(s.a)(n),"_leafletEvents",void 0),Object(c.a)(Object(s.a)(n),"leafletElement",void 0),n._leafletEvents=n.extractLeafletEvents(t),n}Object(u.a)(t,e);var n=t.prototype;return n.componentDidMount=function(){this.bindLeafletEvents(this._leafletEvents)},n.componentDidUpdate=function(e){this._leafletEvents=this.bindLeafletEvents(this.extractLeafletEvents(this.props),this._leafletEvents)},n.componentWillUnmount=function(){var e=this,t=this.leafletElement;t&&Object.keys(this._leafletEvents).forEach((function(n){t.off(n,e._leafletEvents[n])}))},n.extractLeafletEvents=function(e){return Object.keys(e).reduce((function(t,n){g.test(n)&&(null!=e[n]&&(t[n.replace(g,(function(e,t){return t.toLowerCase()}))]=e[n]));return t}),{})},n.bindLeafletEvents=function(e,t){void 0===e&&(e={}),void 0===t&&(t={});var n=this.leafletElement;if(null==n||null==n.on)return{};var o=Object(i.a)({},t);return Object.keys(t).forEach((function(l){null!=e[l]&&t[l]===e[l]||(delete o[l],n.off(l,t[l]))})),Object.keys(e).forEach((function(l){null!=t[l]&&e[l]===t[l]||(o[l]=e[l],n.on(l,e[l]))})),o},n.fireLeafletEvent=function(e,t){var n=this.leafletElement;n&&n.fire(e,t)},t}(l.Component),E=function(e){return void 0===e&&(e=""),e.split(" ").filter(Boolean)},y=function(e,t,n){null!=e&&n!==t&&(null!=t&&t.length>0&&function(e,t){E(t).forEach((function(t){p.DomUtil.removeClass(e,t)}))}(e,t),null!=n&&n.length>0&&function(e,t){E(t).forEach((function(t){p.DomUtil.addClass(e,t)}))}(e,n))};function j(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),o=1;o<t;o++)n[o-1]=arguments[o];return Object.keys(e).reduce((function(t,o){return-1===n.indexOf(o)&&(t[o]=e[o]),t}),{})}var w=["children","className","id","style","useFlyTo","whenReady"],x=function(e){return Array.isArray(e)?[e[0],e[1]]:[e.lat,e.lon?e.lon:e.lng]},C=function(e){function t(t){var n;return n=e.call(this,t)||this,Object(c.a)(Object(s.a)(n),"className",void 0),Object(c.a)(Object(s.a)(n),"contextValue",void 0),Object(c.a)(Object(s.a)(n),"container",void 0),Object(c.a)(Object(s.a)(n),"viewport",{center:void 0,zoom:void 0}),Object(c.a)(Object(s.a)(n),"_ready",!1),Object(c.a)(Object(s.a)(n),"_updating",!1),Object(c.a)(Object(s.a)(n),"onViewportChange",(function(){var e=n.leafletElement.getCenter();n.viewport={center:e?[e.lat,e.lng]:void 0,zoom:n.leafletElement.getZoom()},n.props.onViewportChange&&!n._updating&&n.props.onViewportChange(n.viewport)})),Object(c.a)(Object(s.a)(n),"onViewportChanged",(function(){n.props.onViewportChanged&&!n._updating&&n.props.onViewportChanged(n.viewport)})),Object(c.a)(Object(s.a)(n),"bindContainer",(function(e){n.container=e})),n.className=t.className,n}Object(u.a)(t,e);var n=t.prototype;return n.createLeafletElement=function(e){var t=e.viewport,n=Object(r.a)(e,["viewport"]);return t&&(t.center&&(n.center=t.center),"number"===typeof t.zoom&&(n.zoom=t.zoom)),new p.Map(this.container,n)},n.updateLeafletElement=function(e,t){this._updating=!0;var n=t.bounds,o=t.boundsOptions,l=t.boxZoom,a=t.center,i=t.className,r=t.doubleClickZoom,s=t.dragging,u=t.keyboard,c=t.maxBounds,p=t.scrollWheelZoom,f=t.tap,d=t.touchZoom,m=t.useFlyTo,h=t.viewport,b=t.zoom;if(y(this.container,e.className,i),h&&h!==e.viewport){var v=h.center?h.center:a,g=null==h.zoom?b:h.zoom;!0===m?this.leafletElement.flyTo(v,g,this.getZoomPanOptions(t)):this.leafletElement.setView(v,g,this.getZoomPanOptions(t))}else a&&this.shouldUpdateCenter(a,e.center)?!0===m?this.leafletElement.flyTo(a,b,this.getZoomPanOptions(t)):this.leafletElement.setView(a,b,this.getZoomPanOptions(t)):"number"===typeof b&&b!==e.zoom&&(null==e.zoom?this.leafletElement.setView(a,b,this.getZoomPanOptions(t)):this.leafletElement.setZoom(b,this.getZoomPanOptions(t)));c&&this.shouldUpdateBounds(c,e.maxBounds)&&this.leafletElement.setMaxBounds(c),n&&(this.shouldUpdateBounds(n,e.bounds)||o!==e.boundsOptions)&&(!0===m?this.leafletElement.flyToBounds(n,this.getFitBoundsOptions(t)):this.leafletElement.fitBounds(n,this.getFitBoundsOptions(t))),l!==e.boxZoom&&(!0===l?this.leafletElement.boxZoom.enable():this.leafletElement.boxZoom.disable()),r!==e.doubleClickZoom&&(!0===r||"string"===typeof r?(this.leafletElement.options.doubleClickZoom=r,this.leafletElement.doubleClickZoom.enable()):this.leafletElement.doubleClickZoom.disable()),s!==e.dragging&&(!0===s?this.leafletElement.dragging.enable():this.leafletElement.dragging.disable()),u!==e.keyboard&&(!0===u?this.leafletElement.keyboard.enable():this.leafletElement.keyboard.disable()),p!==e.scrollWheelZoom&&(!0===p||"string"===typeof p?(this.leafletElement.options.scrollWheelZoom=p,this.leafletElement.scrollWheelZoom.enable()):this.leafletElement.scrollWheelZoom.disable()),f!==e.tap&&(!0===f?this.leafletElement.tap.enable():this.leafletElement.tap.disable()),d!==e.touchZoom&&(!0===d||"string"===typeof d?(this.leafletElement.options.touchZoom=d,this.leafletElement.touchZoom.enable()):this.leafletElement.touchZoom.disable()),this._updating=!1},n.getZoomPanOptions=function(e){return{animate:e.animate,duration:e.duration,easeLinearity:e.easeLinearity,noMoveStart:e.noMoveStart}},n.getFitBoundsOptions=function(e){var t=this.getZoomPanOptions(e);return Object(i.a)(Object(i.a)({},t),e.boundsOptions)},n.componentDidMount=function(){var t=j.apply(void 0,[this.props].concat(w));this.leafletElement=this.createLeafletElement(t),this.leafletElement.on("move",this.onViewportChange),this.leafletElement.on("moveend",this.onViewportChanged),null!=t.bounds&&this.leafletElement.fitBounds(t.bounds,this.getFitBoundsOptions(t)),this.contextValue={layerContainer:this.leafletElement,map:this.leafletElement},e.prototype.componentDidMount.call(this),this.forceUpdate()},n.componentDidUpdate=function(t){!1===this._ready&&(this._ready=!0,this.props.whenReady&&this.leafletElement.whenReady(this.props.whenReady)),e.prototype.componentDidUpdate.call(this,t),this.updateLeafletElement(t,this.props)},n.componentWillUnmount=function(){e.prototype.componentWillUnmount.call(this),this.leafletElement.off("move",this.onViewportChange),this.leafletElement.off("moveend",this.onViewportChanged),!0===this.props.preferCanvas?(this.leafletElement._initEvents(!0),this.leafletElement._stop()):this.leafletElement.remove()},n.shouldUpdateCenter=function(e,t){return!t||(e=x(e),t=x(t),e[0]!==t[0]||e[1]!==t[1])},n.shouldUpdateBounds=function(e,t){return!t||!Object(p.latLngBounds)(e).equals(Object(p.latLngBounds)(t))},n.render=function(){return a.a.createElement("div",{className:this.className,id:this.props.id,ref:this.bindContainer,style:this.props.style},this.contextValue?a.a.createElement(b,{value:this.contextValue},this.props.children):null)},t}(O),Z=n(4),S=function(e){function t(t){var n;return n=e.call(this,t)||this,Object(c.a)(Object(s.a)(n),"contextValue",void 0),Object(c.a)(Object(s.a)(n),"leafletElement",void 0),n.leafletElement=n.createLeafletElement(t),n}Object(u.a)(t,e);var n=t.prototype;return n.createLeafletElement=function(e){throw new Error("createLeafletElement() must be implemented")},n.updateLeafletElement=function(e,t){},n.componentDidMount=function(){e.prototype.componentDidMount.call(this),this.layerContainer.addLayer(this.leafletElement)},n.componentDidUpdate=function(t){if(e.prototype.componentDidUpdate.call(this,t),this.props.attribution!==t.attribution){var n=this.props.leaflet.map;null!=n&&null!=n.attributionControl&&(n.attributionControl.removeAttribution(t.attribution),n.attributionControl.addAttribution(this.props.attribution))}this.updateLeafletElement(t,this.props)},n.componentWillUnmount=function(){e.prototype.componentWillUnmount.call(this),this.layerContainer.removeLayer(this.leafletElement)},n.render=function(){var e=this.props.children;return null==e?null:null==this.contextValue?a.a.createElement(l.Fragment,null,e):a.a.createElement(b,{value:this.contextValue},e)},Object(Z.a)(t,[{key:"layerContainer",get:function(){return this.props.leaflet.layerContainer||this.props.leaflet.map}}]),t}(function(e){function t(){return e.apply(this,arguments)||this}return Object(u.a)(t,e),t.prototype.getOptions=function(e){return null!=e.pane?e:null!=e.leaflet&&null!=e.leaflet.pane?Object(i.a)(Object(i.a)({},e),{},{pane:e.leaflet.pane}):e},t}(O)),L=v(function(e){function t(){return e.apply(this,arguments)||this}Object(u.a)(t,e);var n=t.prototype;return n.createLeafletElement=function(e){return new p.TileLayer(e.url,this.getOptions(e))},n.updateLeafletElement=function(t,n){e.prototype.updateLeafletElement.call(this,t,n),n.url!==t.url&&this.leafletElement.setUrl(n.url)},t}(function(e){function t(){return e.apply(this,arguments)||this}Object(u.a)(t,e);var n=t.prototype;return n.createLeafletElement=function(e){return new p.GridLayer(this.getOptions(e))},n.updateLeafletElement=function(e,t){var n=t.opacity,o=t.zIndex;n!==e.opacity&&this.leafletElement.setOpacity(n),o!==e.zIndex&&this.leafletElement.setZIndex(o)},n.getOptions=function(t){var n=Object(i.a)({},e.prototype.getOptions.call(this,t)),o=t.leaflet.map;return null!=o&&(null==n.maxZoom&&null!=o.options.maxZoom&&(n.maxZoom=o.options.maxZoom),null==n.minZoom&&null!=o.options.minZoom&&(n.minZoom=o.options.minZoom)),n},n.render=function(){return null},t}(S))),I=v(function(e){function t(){return e.apply(this,arguments)||this}Object(u.a)(t,e);var n=t.prototype;return n.createLeafletElement=function(e){var t=new p.Marker(e.position,this.getOptions(e));return this.contextValue=Object(i.a)(Object(i.a)({},e.leaflet),{},{popupContainer:t}),t},n.updateLeafletElement=function(e,t){t.position!==e.position&&this.leafletElement.setLatLng(t.position),t.icon!==e.icon&&this.leafletElement.setIcon(t.icon),t.zIndexOffset!==e.zIndexOffset&&this.leafletElement.setZIndexOffset(t.zIndexOffset),t.opacity!==e.opacity&&this.leafletElement.setOpacity(t.opacity),t.draggable!==e.draggable&&(!0===t.draggable?this.leafletElement.dragging.enable():this.leafletElement.dragging.disable())},n.render=function(){var e=this.props.children;return null==e||null==this.contextValue?null:a.a.createElement(b,{value:this.contextValue},e)},t}(S)),U=v(function(e){function t(){return e.apply(this,arguments)||this}return Object(u.a)(t,e),t.prototype.createLeafletElement=function(e){return new p.Control.Zoom(e)},t}(function(e){function t(t){var n;return n=e.call(this,t)||this,Object(c.a)(Object(s.a)(n),"leafletElement",void 0),n.leafletElement=n.createLeafletElement(n.props),n}Object(u.a)(t,e);var n=t.prototype;return n.createLeafletElement=function(e){throw new Error("createLeafletElement() must be implemented")},n.updateLeafletElement=function(e,t){t.position!==e.position&&this.leafletElement.setPosition(t.position)},n.componentDidMount=function(){this.leafletElement.addTo(this.props.leaflet.map)},n.componentDidUpdate=function(e){this.updateLeafletElement(e,this.props)},n.componentWillUnmount=function(){this.leafletElement.remove()},n.render=function(){return null},t}(l.Component))),N=n(373),R=n.n(N);var k,z=["stroke","color","weight","opacity","lineCap","lineJoin","dashArray","dashOffset","fill","fillColor","fillOpacity","fillRule","bubblingMouseEvents","renderer","className","interactive","pane","attribution"],B=function(e){function t(t){var n;return null==(n=e.call(this,t)||this).contextValue&&(n.contextValue=Object(i.a)(Object(i.a)({},t.leaflet),{},{popupContainer:n.leafletElement})),n}Object(u.a)(t,e);var n=t.prototype;return n.componentDidUpdate=function(t){e.prototype.componentDidUpdate.call(this,t),this.setStyleIfChanged(t,this.props)},n.getPathOptions=function(e){return t=e,z.reduce((function(e,n){return"undefined"!==typeof t[n]&&(e[n]=t[n]),e}),{});var t},n.setStyle=function(e){void 0===e&&(e={}),this.leafletElement.setStyle(e)},n.setStyleIfChanged=function(e,t){var n=this.getPathOptions(t);R()(n,this.getPathOptions(e))||this.setStyle(n)},t}(S),D=v(function(e){function t(){return e.apply(this,arguments)||this}Object(u.a)(t,e);var n=t.prototype;return n.createLeafletElement=function(e){var t=new p.FeatureGroup(this.getOptions(e));return this.contextValue=Object(i.a)(Object(i.a)({},e.leaflet),{},{layerContainer:t,popupContainer:t}),t},n.componentDidMount=function(){e.prototype.componentDidMount.call(this),this.setStyle(this.props)},t}(B)),T=v(function(e){function t(){return e.apply(this,arguments)||this}Object(u.a)(t,e);var n=t.prototype;return n.createLeafletElement=function(e){return new p.GeoJSON(e.data,this.getOptions(e))},n.updateLeafletElement=function(e,t){"function"===typeof t.style?this.leafletElement.setStyle(t.style):this.setStyleIfChanged(e,t)},t}(B)),F=n(37),V=n(47),_=n(109),A=n(114),P=n(115),M=n(105),W=(n(372),n(433)),Y=n(116),G=n(167);!function(e){e.AUTO="AUTO",e.COUNTRY="COUNTRY",e.REGION="REGION",e.CITY_DISTRICT="CITY_DISTRICT"}(k||(k={}));t.default=function(e){var t=e.closeBottomSheet,i=void 0===t?function(){}:t,r=Object(l.useContext)(F.a),s=r.zones,u=void 0===s?[]:s,c=r.selectedZoneId,p=r.dispatch,f=Object(_.a)(c,u),d=Object(l.useState)(6),m=Object(o.a)(d,2),h=m[0],b=(m[1],Object(l.useState)([40.92930626579717,64.61999498705462])),v=Object(o.a)(b,2),g=v[0],O=(v[1],Object(l.useState)(null)),E=Object(o.a)(O,2),y=E[0],j=E[1],w=Object(W.a)().t,x=Object(M.a)((function(e){return e.breakpoints.up("md")})),Z=Object(l.useRef)(null),S=function(e){var t,n=e.lat,o=e.lng,l=e.zoom,a=void 0===l?12:l,i=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];null===(t=Z.current)||void 0===t||t.leafletElement.setView({lat:n,lng:o},a,{animate:!0}),i&&j({lat:n,lng:o})};Object(l.useEffect)((function(){var e=n(112);delete e.Icon.Default.prototype._getIconUrl,e.Icon.Default.mergeOptions({iconRetinaUrl:n(213),iconUrl:n(214),shadowUrl:n(215)});var t=new URLSearchParams(window.location.search),o=t.get("lat"),l=t.get("lng"),a=t.get("zoom"),i=o&&parseFloat(o),r=l&&parseFloat(l),s=a&&parseFloat(a);i&&r&&s&&S({lat:i,lng:r,zoom:s},!1),p({type:V.a,payload:S})}),[]),Object(l.useEffect)((function(){var e;if(null===f||void 0===f||null===(e=f.bbox)||void 0===e?void 0:e.length){var t,n,o=Object(G.a)(null===f||void 0===f?void 0:f.bbox);null===(t=Z.current)||void 0===t||null===(n=t.leafletElement)||void 0===n||n.flyToBounds(o)}return function(){}}),[f]);return a.a.createElement(C,{ref:Z,preferCanvas:!0,center:g,zoom:h,zoomControl:!1,style:{width:"100%",height:"100%"},onmoveend:function(e){var t,n,o,l,a=null===(t=Z.current)||void 0===t||null===(n=t.leafletElement)||void 0===n?void 0:n.getZoom(),i=null===(o=Z.current)||void 0===o||null===(l=o.leafletElement)||void 0===l?void 0:l.getCenter();if((null===i||void 0===i?void 0:i.lat)&&(null===i||void 0===i?void 0:i.lng)&&a&&"URLSearchParams"in window){var r=new URLSearchParams(window.location.search);r.set("lat",JSON.stringify(i.lat)),r.set("lng",JSON.stringify(i.lng)),r.set("zoom",JSON.stringify(a)),r.toString();var s=window.location.pathname+"?"+r.toString();window.history.pushState(null,"",s)}}},a.a.createElement(L,{attribution:'\xa9 <a href="https://stadiamaps.com/">Stadia Maps</a>, \xa9 <a href="https://openmaptiles.org/">OpenMapTiles</a> \xa9 <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',url:"https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"}),y&&a.a.createElement(I,{position:{lat:y.lat,lng:y.lng}}),x&&a.a.createElement(U,{position:"bottomright"}),a.a.createElement(D,null,u.map((function(e){var t,n,o,l,r,s,c,f;(null===(t=e.properties)||void 0===t||null===(n=t.childZones)||void 0===n?void 0:n.length)?c=(null===(f=Z.current)||void 0===f?void 0:f.leafletElement.getBoundsZoom(Object(G.a)(e.bbox)))||18:c=18;var d,m=u.find((function(t){return t.properties.refId===e.properties.parentZone})),h=m&&(null===(o=Z.current)||void 0===o?void 0:o.leafletElement.getBoundsZoom(Object(G.a)(null===m||void 0===m?void 0:m.bbox)))||0,b=(null===(l=Z.current)||void 0===l||null===(r=l.leafletElement)||void 0===r?void 0:r.getZoom())||0;b<=c&&b>h&&(s=!!(null===(d=Z.current)||void 0===d?void 0:d.leafletElement.getBounds().overlaps(Object(G.a)(e.bbox))));return s&&a.a.createElement(T,{key:"zone-"+e._id,data:e,onEachFeature:function(t,n){x&&n.bindPopup("\n                      <style>\n                        .custom-popup-style .leaflet-popup-content-wrapper {\n                          background: #FFFFFF;\n                          box-shadow: 0px 4px 40px rgba(0, 30, 89, 0.09);\n                          border-radius: 11px;\n                        }\n                        .custom-popup-style .leaflet-popup-close-button {\n                          display: none\n                        }\n                        .custom-popup-style .leaflet-popup-tip-container {\n                        }\n                        .custom-popup-style .leaflet-popup-tip {\n                          box-shadow: 0px 4px 40px rgba(0, 30, 89, 0.09);\n                        }\n                        .custom-popup-style .title-container {\n                          display: flex;\n                          align-items: center;\n                          margin-bottom: 8px;\n                        }\n                        .custom-popup-style .zone-status-pin {\n                          display: inline-block;\n                          width: 8px;\n                          height: 8px;\n                          border-radius: 4px;\n                          margin-right: 5px;\n                          background-color: ".concat(Object(P.a)(e.properties.status).textInBlueishBg,";\n                        }\n                        .custom-popup-style .zone-name {\n                          font-family: Rubik;\n                          font-size: 16px;\n                          font-weight: 500;\n                          line-height: 16px;\n                          color: #242B43;\n                          margin: 0;\n                        }\n                        .custom-popup-style .data {\n                          font-family: Rubik;\n                          font-size: 14px;\n                          font-weight: 500;\n                          line-height: 20px;\n                          margin: 0;\n                        }\n                        .custom-popup-style .data.infected {\n                          color: ").concat(Object(P.a)(A.b.RISKY).textInWhiteBg,";\n                        }\n                        .custom-popup-style .data.recovered {\n                          color: ").concat(Object(P.a)(A.b.SAFE).textInWhiteBg,";\n                        }\n                        .custom-popup-style .data.dead {\n                          color: ").concat(Object(P.a)(A.b.DANGEROUS).textInWhiteBg,';\n                        }\n                      </style>\n\n                      <div class=\'title-container\'>\n                        <span class="zone-status-pin"></span>\n                        <h5 class="zone-name">').concat(Object(Y.a)(e),'</h5>\n                      </div>\n                      <p class="data infected">').concat(w("dataType.infected")," ").concat(e.properties.total.infectedNumber,'</p>\n                      <p class="data recovered">').concat(w("dataType.recovered")," ").concat(e.properties.total.recoveredNumber,'</p>\n                      <p class="data dead">').concat(w("dataType.dead")," ").concat(e.properties.total.deadNumber,"</p>\n\n                    "),{className:"custom-popup-style",autoPan:!1,keepInView:!0}),n.on({click:function(){return t=e,p({type:V.b,payload:t._id}),void i();var t},mouseover:function(e){x&&n.openPopup()}})},style:function(t){var n,o=null===e||void 0===e||null===(n=e.properties)||void 0===n?void 0:n.status,l=o===A.b.DANGEROUS?"rgb(237, 69, 67)":o===A.b.RISKY?"rgb(255, 210, 30)":"rgb(86, 219, 64)";return{fillColor:l,fillOpacity:.301961,color:l,weight:1.5}}})}))))}}}]);
//# sourceMappingURL=MapZones.46a1e5df.chunk.js.map