(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[14],{109:function(e,a,t){"use strict";t.d(a,"a",(function(){return n}));var n=function(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];return a.find((function(a){return a._id===e}))}},129:function(e,a,t){"use strict";t.d(a,"a",(function(){return l}));var n=t(38),l=function(){return n.a.language||"undefined"!==typeof window&&window.localStorage.i18nextLng||"uz"}},404:function(e,a){},434:function(e,a,t){"use strict";t.r(a);var n=t(0),l=t.n(n),r=t(37),i=t(109),c=t(379),u=t.n(c),o=t(232),d=t(129);a.default=function(e){var a,t,c,s,v,m=Object(n.useContext)(r.a),b=m.zones,f=m.selectedZoneId,k=Object(i.a)(f,b);switch(Object(d.a)()){case"uz":v=null===k||void 0===k||null===(a=k.properties)||void 0===a?void 0:a.restrictionsUz;break;case"ru":v=null===k||void 0===k||null===(t=k.properties)||void 0===t?void 0:t.restrictionsRu;break;default:v=null===k||void 0===k||null===(c=k.properties)||void 0===c?void 0:c.restrictionsUz}return l.a.createElement(o.a,{mt:4,mb:4},function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return null===e||void 0===e?void 0:e.map((function(e,a){var t,r,i,c=u()(e.data.text);switch(null===e||void 0===e?void 0:e.type){case"delimiter":i=l.a.createElement("br",null);break;case"header":switch(null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.level){case 1:i=l.a.createElement("h1",null,c);break;case 2:i=l.a.createElement("h2",null,c);break;case 3:i=l.a.createElement("h3",null,c);break;case 4:i=l.a.createElement("h4",null,c);break;case 5:i=l.a.createElement("h5",null,c);break;case 6:i=l.a.createElement("h6",null,c);break;default:i=l.a.createElement("h4",null,c)}break;case"paragraph":i=l.a.createElement("p",null,c);break;case"list":var o=e.data.items.map((function(e){return l.a.createElement("li",{key:e},u()(e))}));switch(null===e||void 0===e||null===(r=e.data)||void 0===r?void 0:r.style){case"unordered":i=l.a.createElement("ul",null,o);break;case"ordered":i=l.a.createElement("ol",null,o);break;default:i=l.a.createElement("ol",null,o)}break;case"image":var d=e.data.caption?e.data.caption:"Image";i=l.a.createElement("img",{src:e.data.file.url,alt:d});break;default:i=l.a.createElement(l.a.Fragment,null)}return l.a.createElement(n.Fragment,{key:a},i)}))}(null===(s=v)||void 0===s?void 0:s.blocks))}}}]);
//# sourceMappingURL=Restrictions.bb2eaf6d.chunk.js.map