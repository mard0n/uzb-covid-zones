(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[10],{476:function(e,t,n){"use strict";n.r(t);var a=n(44),r=n(0),s=n.n(r),c=n(3),u=n(177),o=n.n(u);t.default=function(){var e=Object(c.g)(),t=Object(c.f)(),n=Object(r.useState)(""),u=Object(a.a)(n,2),i=u[0],p=u[1],l=Object(r.useState)(""),b=Object(a.a)(l,2),m=b[0],d=b[1],f=Object(r.useState)(""),g=Object(a.a)(f,2),j=g[0],O=g[1];return s.a.createElement(s.a.Fragment,null,j,s.a.createElement("input",{type:"text",onChange:function(e){return p(e.target.value)}}),s.a.createElement("input",{type:"password",onChange:function(e){return d(e.target.value)}}),s.a.createElement("button",{onClick:function(){O(""),function(e){var t=e.username,n=void 0===t?"":t,a=e.password,r=void 0===a?"":a;return o.a.post("/api/zones",{username:n,password:r})}({username:i,password:m}).then((function(n){n.data?(sessionStorage.setItem("token",n.data),t.replace(e.state.from)):O("Wrong credentials")}))}},"Submit"))}}}]);
//# sourceMappingURL=Login.5cc298fc.chunk.js.map