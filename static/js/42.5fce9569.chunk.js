(this["webpackJsonpsafe-migrator"]=this["webpackJsonpsafe-migrator"]||[]).push([[42],{513:function(n,r){},514:function(n,r){},515:function(n,r){},516:function(n,r){},517:function(n,r){},518:function(n,r){},519:function(n,r){},520:function(n,r){},521:function(n,r){},698:function(n,r,i){"use strict";i.r(r),i.d(r,"generateAddresses",(function(){return f})),i.d(r,"isValidPath",(function(){return s}));var e=i(482),t=i(617),u=i.n(t),c=i(30),o=e.publicToAddress,a=e.toChecksumAddress;function f(n,r){var i=n.publicKey,e=n.chainCode,t=n.path,f=new u.a;f.publicKey=new c.Buffer(i,"hex"),f.chainCode=new c.Buffer(e,"hex");for(var s=[],d=r;d<5+r;d++){var h=f.deriveChild(d),p=o(h.publicKey,!0).toString("hex");s.push({dPath:"".concat(t,"/").concat(d),address:a("0x".concat(p))})}return s}function s(n){var r=n.split("/");if("m"!==r[0])return!1;if("44'"!==r[1])return!1;if(!["60'","1'","73799'","246'"].includes(r[2]))return!1;if(void 0===r[3]||"0'"===r[3])return!0;var i=Number(r[3].slice(0,-1));if(isNaN(i)||i<0||"'"!==r[3].slice(-1))return!1;if(void 0===r[4])return!0;var e=Number(r[4]);if(isNaN(e)||e<0)return!1;if(void 0===r[5])return!0;var t=Number(r[5]);return!(isNaN(t)||t<0)}}}]);
//# sourceMappingURL=42.5fce9569.chunk.js.map