(this["webpackJsonpsafe-migrator"]=this["webpackJsonpsafe-migrator"]||[]).push([[85],{387:function(t,e,n){"use strict";n.r(e);var r=n(2),o=n.n(r),i=(n(114),n(140));n(72),n(116),n(115);function a(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function c(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?a(Object(n),!0).forEach((function(e){u(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function u(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function s(t,e,n,r,o,i,a){try{var c=t[i](a),u=c.value}catch(s){return void n(s)}c.done?e(u):Promise.resolve(u).then(r,o)}function l(t){return function(){var e=this,n=arguments;return new Promise((function(r,o){var i=t.apply(e,n);function a(t){s(i,r,o,a,c,"next",t)}function c(t){s(i,r,o,a,c,"throw",t)}a(void 0)}))}}e.default=function(){var t,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.heading,r=e.description,a=e.icon,u=e.html,s=e.button,f=!1;return i.c.subscribe((function(e){var n=e.walletCheckInProgress;!1===t&&!0===n&&(f=!1),t=n})),function(){var t=l(o.a.mark((function t(e){var p,w,h,b,v,d,k,y,m;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(p=e.network,w=e.appNetworkId,h=e.walletSelect,b=e.walletCheck,v=e.exit,d=e.stateSyncStatus,k=e.stateStore,y=e.wallet,null!==p){t.next=5;break}if(!d.network){t.next=5;break}return t.next=5,new Promise((function(t){d.network&&d.network.then(t),setTimeout((function(){null===p&&t(void 0)}),500)}));case 5:if(f||k.network.get()==w||"WalletConnect"===Object(i.h)(null===y||void 0===y?void 0:y.provider)){t.next=14;break}return t.prev=6,f=!0,t.next=10,null===y||void 0===y||null===(m=y.provider)||void 0===m?void 0:m.request({method:"wallet_switchEthereumChain",params:[{chainId:"0x"+(null===w||void 0===w?void 0:w.toString(16))}]});case 10:t.next=14;break;case 12:t.prev=12,t.t0=t.catch(6);case 14:if(k.network.get()==w){t.next=16;break}return t.abrupt("return",{heading:n||"You Must Change Networks",description:r||"We've detected that you need to switch your wallet's network from <b>".concat(Object(i.m)(p),"</b> to <b>").concat(Object(i.m)(w),'</b> for this Dapp. <br><br> <i style="font-size: inherit; font-family: inherit;">*Some wallets may not support changing networks. If you can not change networks in your wallet you may consider switching to a different wallet.</i>'),eventCode:"networkFail",button:s||{onclick:function(){var t=l(o.a.mark((function t(){var e,n;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return v(!1,{switchingWallets:!0}),t.next=3,h();case 3:if(e=t.sent,t.t0=e,!t.t0){t.next=9;break}return t.next=8,b();case 8:t.t0=t.sent;case 9:n=t.t0,i.c.update((function(t){return c(c({},t),{},{switchingWallets:!1,walletCheckCompleted:n})}));case 11:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),text:"Switch Wallet"},html:u,icon:a||i.j});case 16:case"end":return t.stop()}}),t,null,[[6,12]])})));return function(e){return t.apply(this,arguments)}}()}}}]);
//# sourceMappingURL=85.ada05d5e.chunk.js.map