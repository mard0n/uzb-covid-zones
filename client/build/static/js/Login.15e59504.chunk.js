(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[10],{476:function(t,e,a){"use strict";a.r(e);var n=a(44),r=a(0),c=a.n(r),s=a(3),u=a(177),o=a.n(u);e.default=function(){var t=Object(s.g)(),e=Object(s.f)(),a=Object(r.useState)(""),u=Object(n.a)(a,2),i=u[0],p=u[1],l=Object(r.useState)(""),b=Object(n.a)(l,2),m=b[0],d=b[1],f=Object(r.useState)(""),h=Object(n.a)(f,2),g=h[0],j=h[1];return c.a.createElement(c.a.Fragment,null,g,c.a.createElement("input",{type:"text",onChange:function(t){return p(t.target.value)}}),c.a.createElement("input",{type:"password",onChange:function(t){return d(t.target.value)}}),c.a.createElement("button",{onClick:function(){j(""),function(t){var e=t.username,a=void 0===e?"":e,n=t.password,r=void 0===n?"":n;return o.a.post("http://localhost:4000/api/authenticate",{username:a,password:r})}({username:i,password:m}).then((function(a){a.data?(sessionStorage.setItem("token",a.data),e.replace(t.state.from)):j("Wrong credentials")}))}},"Submit"))}}}]);
//# sourceMappingURL=Login.15e59504.chunk.js.map