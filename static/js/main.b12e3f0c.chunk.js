(this["webpackJsonpweb-g-client"]=this["webpackJsonpweb-g-client"]||[]).push([[0],{287:function(e,t,n){"use strict";n.r(t);var r,c,a,o=n(0),s=n.n(o),i=n(17),u=n.n(i),l=n(15),d=n.n(l),f=n(23),g=n(10),p=n(103),b=n(32),j=Object(b.b)({name:"gSignalingStatus",initialState:{userInfo:{userID:"",geoLocation:{latitude:0,longitude:0}},surroundingUserList:[],isRegister:!1,userID:""},reducers:{setUserInfoGeoLocation:function(e,t){var n=t.payload;e.userInfo.geoLocation=n},setSurroundingUserList:function(e,t){var n=t.payload;e.surroundingUserList=n},setIsRegister:function(e){e.isRegister=!e.isRegister},setUserID:function(e,t){var n=t.payload;e.userID=n}}}),h=j.actions,O=h.setUserInfoGeoLocation,v=h.setSurroundingUserList,x=h.setIsRegister,y=h.setUserID,w=j.reducer,S=n(16),m=function(){var e=Object(o.useState)({latitude:35.943218,longitude:139.621248}),t=Object(g.a)(e,2),n=t[0],r=t[1],c=Object(S.b)();return navigator.geolocation.watchPosition((function(e){r({latitude:Number(e.coords.latitude),longitude:Number(e.coords.longitude)}),c(O(n))}),(function(e){console.error(e),r({latitude:35.943218,longitude:139.621248}),c(O(n))})),n},D=function(){var e=Object(o.useState)(""),t=Object(g.a)(e,2),n=t[0],r=t[1],c=Object(o.useRef)(null),a=Object(o.useRef)(),s=Object(o.useRef)(),i=100;Object(o.useEffect)((function(){return function(){clearTimeout(s.current),clearTimeout(a.current)}}),[]);var u=function(){clearTimeout(a.current)},l=function(e){r(e.data)},p=function(e){console.error("WebSocket error: ",e),c.current.close()},b=function(e){console.log("WebSocket is closed :",e),i+=i,a.current=setTimeout(j,Math.min(1e4,i))},j=function(){c.current&&c.current.readyState!==WebSocket.CLOSED||h()},h=function(){console.log("connecting...."),c.current=new WebSocket("ws://118.27.20.107:8080/signaling"),c.current.addEventListener("open",u),c.current.addEventListener("message",l),c.current.addEventListener("error",p),c.current.addEventListener("close",b)};Object(o.useEffect)((function(){h()}),[]);var O=function(){var e=Object(f.a)(d.a.mark((function e(t){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:v((function(){try{c.current.send(String(t)),console.log(new Date,"message : ",t)}catch(e){console.error(e)}}),500);case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),v=function e(t,n){c.current.readyState===WebSocket.OPEN?t():s.current=setTimeout((function(){e(t,n)}),n)};return[n,O]},k=n(342),L=n(343),C=n(344),I=n(345),N=n(346),E=n(2),T=function(){return Object(E.jsx)(k.a,{sx:{flexGrow:1},children:Object(E.jsx)(L.a,{position:"static",children:Object(E.jsxs)(C.a,{children:[Object(E.jsx)(I.a,{size:"large",edge:"start",color:"inherit","aria-label":"g-client",sx:{mr:2}}),Object(E.jsx)(N.a,{variant:"h6",component:"div",sx:{flexGrow:1},children:"g-client"})]})})})},R=n(145),U=n(34),J=n(64),M=J.a.div(r||(r=Object(U.a)(['\n  background: #ffffff;\n  width: 200px;\n  height: 150px;\n  position: absolute;\n  top: -200px;\n  left: 0px;\n  transform: translate(-50%);\n  border-radius: 10px;\n\n  :after {\n    content: "";\n    position: absolute;\n    z-index: -1;\n    left: 0;\n    right: 0;\n    bottom: -24px;\n    display: block;\n    width: 0;\n    height: 0;\n    margin: 0 auto;\n    border-style: solid;\n    border-width: 25px 25px 0 25px;\n    border-color: #ffffff transparent transparent transparent;\n  }\n']))),A=J.a.div(c||(c=Object(U.a)(["\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translateY(-50%) translateX(-50%);\n  font-size: 12pt\n"]))),W=function(e){return Object(E.jsx)(M,{className:"scrollWindow",children:Object(E.jsx)(A,{children:"userID: "+e.userInfo.userID+"\nlat: "+e.userInfo.latitude+"\nlng: "+e.userInfo.longitude})})},z=J.a.div(a||(a=Object(U.a)(["\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: 18px;\n  height: 18px;\n  background-color: #000;\n  border: 2px solid #fff;\n  border-radius: 100%;\n  user-select: none;\n  transform: translate(-50%, -50%);\n\n  &:hover {\n    z-index: 1;\n  }\n\n"]))),G=function(e){var t=Object(o.useState)(!1),n=Object(g.a)(t,2),r=n[0],c=n[1],a=e.color,s=e.name;return Object(E.jsxs)("div",{onClick:function(){c(!r)},children:[Object(E.jsx)(z,{style:{backgroundColor:a,cursor:"pointer"},title:s}),r?Object(E.jsx)(W,{lat:e.lat,lng:e.lng,userInfo:e.userInfo}):null]})},P=function(e){return e.gSetting},V=function(e){return e.gSignalingState},F=function(e){return e.p2pState},Y=function(e){var t=Object(S.c)(V),n=t.surroundingUserList,r=t.userInfo.geoLocation,c=Object(S.c)(P).searchDistance,a=Object(o.useState)(!1),s=Object(g.a)(a,2),i=s[0],u=s[1],l={position:{lat:r.latitude,lng:r.longitude},zoom:15},p=function(){var e=Object(f.a)(d.a.mark((function e(){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:u(!0),setTimeout((function(){u(!1)}),100);case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();Object(o.useEffect)((function(){p().catch((function(e){return console.log(e)}))}),[c]);var b=n.map((function(e){return Object(E.jsx)(G,{lat:e.geoLocation.latitude,lng:e.geoLocation.longitude,color:"yellow",userInfo:e},e.userID)}));return Object(E.jsx)("div",{style:{height:"80vh",width:"100%"},children:!i&&Object(E.jsxs)(R.a,{bootstrapURLKeys:{key:""},defaultCenter:l.position,defaultZoom:l.zoom,onGoogleApiLoaded:function(e){var t=e.map;return new e.maps.Circle({strokeColor:"#FF0000",strokeOpacity:.8,strokeWeight:2,fillColor:"#FF0000",fillOpacity:.3,map:t,center:{lat:r.latitude,lng:r.longitude},radius:c})},children:[b,Object(E.jsx)(G,{lat:r.latitude,lng:r.longitude,text:"My Marker",color:"green"})]})})},B=Object(b.b)({name:"p2pStatus",initialState:{destinationUserID:""},reducers:{setDestinationUserID:function(e,t){var n=t.payload;e.destinationUserID=n}}}),K=B.actions.setDestinationUserID,X=B.reducer,Z=function(e,t,n,r,c,a){var s=Object(o.useState)(!1),i=Object(g.a)(s,2),u=i[0],l=i[1],d=Object(S.c)(V),f=d.isRegister,p=d.userInfo,b=Object(S.c)(P).searchDistance,j=Object(S.b)();Object(o.useEffect)((function(){if(console.log(new Date," : -----rawMessage-------"),console.log(e),""!==e)try{var o=JSON.parse(e);if("undefined"===typeof o)return void console.error("message is undefined");switch(o.type){case"ping":console.log(new Date,": ping"),t.sendPong();break;case"register":console.log(new Date,": registered");var s=JSON.parse(e);j(x()),j(y(s.userID));break;case"update":console.log(new Date,": update");var i=JSON.parse(e);console.log(new Date,i);break;case"search":console.log(new Date,": search");var u=JSON.parse(e);j(v(u.surroundingUserList));break;case"delete":console.log(new Date,": delete");var l=JSON.parse(e);console.log(new Date,l);break;case"offer":console.log(new Date,": offer");var d=JSON.parse(e);j(K(d.destination)),r(d.sdp,d.destination).catch((function(e){console.error(e)}));break;case"answer":console.log(new Date,": answer");var f=JSON.parse(e);c(f.sdp).catch((function(e){console.error(e)}));break;case"ice":console.log(new Date,": ice");var g=JSON.parse(e);console.log(g.ice);var p=JSON.parse(JSON.stringify(g.ice));console.log(p);var b=new RTCIceCandidate(p);n(b);break;case"close":console.log(new Date,": close");var h=JSON.parse(e);console.log(h.destination),a()}}catch(O){console.log(O)}else console.error("message is empty")}),[j,e]),Object(o.useEffect)((function(){var e=setInterval((function(){f&&t.sendUpdate(p)}),5e3),n=setInterval((function(){f&&t.sendStaticSearch(p.geoLocation,b)}),5e3);return function(){clearTimeout(e),clearTimeout(n)}}),[f]),Object(o.useEffect)((function(){f||u||(t.sendRegister(p),l(!0))}),[f,u])},q=Object(b.b)({name:"gSetting",initialState:{searchDistance:100,searchType:"STATIC"},reducers:{setSearchDistance:function(e,t){var n=t.payload;e.searchDistance=n},setStaticSearch:function(e){e.searchType="STATIC"},setDynamicSearch:function(e){e.searchType="DYNAMIC"}}}),H=q.actions,Q=H.setSearchDistance,$=H.setDynamicSearch,_=H.setStaticSearch,ee=q.reducer,te=n(338),ne=n(339),re=n(336),ce=n(337),ae=n(347),oe=n(334),se=function(){var e=Object(o.useRef)(),t=Object(S.c)(P),n=t.searchDistance,r=t.searchType,c=Object(S.c)(V),a=c.userInfo,s=c.surroundingUserList,i=c.userID,u=Object(S.b)();return Object(E.jsxs)("div",{style:{},children:[Object(E.jsx)("div",{children:a.geoLocation.latitude+" , "+a.geoLocation.longitude}),Object(E.jsx)("div",{children:"surroundingUserList size :"+s.length}),Object(E.jsx)("div",{children:"userID : "+i}),Object(E.jsx)(ce.a,{sx:{m:1,minWidth:80},children:Object(E.jsx)(te.a,{inputRef:e,id:"search-distance",label:"SearchDistance",defaultValue:n})}),Object(E.jsx)(ae.a,{variant:"contained",onClick:function(){var t,n;e.current&&(console.log(null===(t=e.current)||void 0===t?void 0:t.value),u(Q(Number(null===(n=e.current)||void 0===n?void 0:n.value))))},children:"SetDistance"}),Object(E.jsxs)(ce.a,{sx:{m:1,minWidth:200},children:[Object(E.jsx)(ne.a,{id:"demo-simple-select-autowidth-label",children:"SearchType"}),Object(E.jsxs)(oe.a,{labelId:"demo-simple-select-autowidth-label",id:"demo-simple-select-autowidth",value:"static",onChange:function(e){"static"===e.target.value?u(_()):u($())},autoWidth:!0,label:r,children:[Object(E.jsx)(re.a,{value:"static",children:"Static Search"}),Object(E.jsx)(re.a,{value:"dynamic",children:"Dynamic Search"})]})]})]})},ie=function(e){var t=Object(o.useState)(!1),n=Object(g.a)(t,2),r=n[0],c=n[1],a=function(){var e=Object(f.a)(d.a.mark((function e(t,n){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.srcObject=n,e.prev=1,e.next=4,t.play();case 4:c(!r),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(1),console.log(e.t0);case 10:case"end":return e.stop()}}),e,null,[[1,7]])})));return function(t,n){return e.apply(this,arguments)}}();return Object(E.jsxs)(E.Fragment,{children:[Object(E.jsx)("video",{ref:e.localVideoRef,autoPlay:!0,style:{width:"320px",height:"240px",border:"1px solid black"}}),Object(E.jsx)("video",{ref:e.remoteVideoRef,autoPlay:!0,style:{width:"320px",height:"240px",border:"1px solid black"}}),r?Object(E.jsx)("button",{onClick:function(e){e.pause(),c(!r)},children:"pauseVideo"}):Object(E.jsx)("button",{onClick:function(){return a},children:"playVideo"})]})},ue=n(20),le=n.n(ue),de=n(331),fe=n(332),ge=n(348),pe=n(349),be=n(333),je=(n(172),n(141)),he=n(142),Oe=le.a.icon({iconUrl:je.a,shadowUrl:he.a});le.a.Marker.prototype.options.icon=Oe;var ve=function(){var e=Object(S.c)(V),t=e.surroundingUserList,n=e.userInfo.geoLocation,r=t.map((function(e){return Object(E.jsx)(de.a,{position:new ue.LatLng(e.geoLocation.latitude,e.geoLocation.longitude)},e.userID)})),c=new ue.LatLng(n.latitude,n.longitude);return Object(E.jsxs)(fe.a,{center:c,zoom:15,style:{height:"80vh"},children:[Object(E.jsx)(ge.a,{attribution:'\xa9 <a href="https://osm.org/copyright">OpenStreetMap</a> contributors',url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}),Object(E.jsx)(pe.a,{center:c,radius:100}),r,Object(E.jsx)(de.a,{position:c,children:Object(E.jsx)(be.a,{children:"aaaaaa"})})]})},xe=n(50),ye=n(51),we=function(){function e(t){Object(xe.a)(this,e),this.sendMessage=t}return Object(ye.a)(e,[{key:"sendPong",value:function(){this.sendMessage(JSON.stringify({type:"pong"}))}},{key:"sendRegister",value:function(e){var t={type:"register",geoLocation:{latitude:e.geoLocation.latitude,longitude:e.geoLocation.longitude}};this.sendMessage(JSON.stringify(t))}},{key:"sendUpdate",value:function(e){var t={type:"update",userInfo:e};this.sendMessage(JSON.stringify(t))}},{key:"sendStaticSearch",value:function(e,t){var n={type:"search",searchType:"static",searchDistance:t,geoLocation:e};this.sendMessage(JSON.stringify(n))}},{key:"sendDynamicSearch",value:function(e,t){var n={type:"search",searchType:"dynamic",searchDistance:t,geoLocation:e};this.sendMessage(JSON.stringify(n))}},{key:"sendDelete",value:function(){this.sendMessage(JSON.stringify({type:"delete"}))}},{key:"sendSend",value:function(){this.sendMessage(JSON.stringify({type:"delete",message:"test"}))}},{key:"sendOffer",value:function(e,t){var n={type:"offer",sdp:e,destination:t};this.sendMessage(JSON.stringify(n))}},{key:"sendAnswer",value:function(e,t){var n={type:"answer",sdp:e,destination:t};this.sendMessage(JSON.stringify(n))}},{key:"sendClose",value:function(e){var t={type:"close",destination:e};this.sendMessage(JSON.stringify(t))}},{key:"sendCandidate",value:function(e){var t={type:"ice",ice:e};this.sendMessage(JSON.stringify(t))}}]),e}(),Se=function(e){var t=Object(o.useRef)();return Object(o.useEffect)((function(){navigator.mediaDevices.getUserMedia({audio:!1,video:!0}).then((function(n){e.current.srcObject=n,t.current=n})).catch((function(e){console.log(e)}))}),[]),t},me=function(e,t,n,r,c,a){var s=Object(o.useRef)(null),i=Object(o.useRef)(null),u=Object(S.c)(F).destinationUserID,l=function(){var e=Object(f.a)(d.a.mark((function e(t){var r;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log(new Date,"ontrack",t),console.log(n),n.current.srcObject=t.streams[0],e.next=5,null===(r=n.current)||void 0===r?void 0:r.play();case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),g=function(e){console.log(new Date,"candidate"),e&&e.candidate&&(console.log(e),r.sendCandidate(e.candidate),console.log(new Date,e.candidate))},p=function(){var e=Object(f.a)(d.a.mark((function e(){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log("negotiationneeded");case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),b=function(){console.log(new Date,"ice status has changed",s.current.iceConnectionState)},j=function(e){e.channel.addEventListener("open",h),e.channel.addEventListener("message",O),e.channel.addEventListener("close",v),e.channel.addEventListener("error",x),i.current=e.channel},h=function(){},O=function(e){a.current.value=" < "+e.data+"\n"+a.current.value},v=function(){},x=function(e){console.error(e)},y=function(){s.current=new RTCPeerConnection({iceServers:[{urls:"stun:stun.l.google.com:19302"}]}),console.log(new Date,"make"),s.current.addEventListener("track",l),s.current.addEventListener("icecandidate",g),s.current.addEventListener("negotiationneeded",p),s.current.addEventListener("iceconnectionstatechange",b),s.current.addEventListener("datachannel",j),e.current.getTracks().forEach((function(t){return s.current.addTrack(t,e.current)})),i.current=s.current.createDataChannel("message-data-channel"),i.current.addEventListener("open",h),i.current.addEventListener("message",O),i.current.addEventListener("close",v),i.current.addEventListener("error",x)},w=function(){var e=Object(f.a)(d.a.mark((function e(t,n){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return y(),e.next=3,s.current.setRemoteDescription({type:"offer",sdp:t}).catch((function(e){console.log(e)}));case 3:return e.next=5,m(n);case 5:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),m=function(){var e=Object(f.a)(d.a.mark((function e(t){var n;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s.current.createAnswer();case 2:return n=e.sent,e.next=5,s.current.setLocalDescription(n);case 5:console.log(new Date,"-----sendAnswer--------",n.type),r.sendAnswer(n.sdp,t);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),D=function(){var e=Object(f.a)(d.a.mark((function e(t){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s.current.setRemoteDescription({type:"answer",sdp:t});case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),k=function(){var e=Object(f.a)(d.a.mark((function e(t){var n;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return y(),e.next=3,s.current.createOffer();case 3:return n=e.sent,console.log(new Date,"sdp",n),e.next=7,s.current.setLocalDescription(n);case 7:r.sendOffer(n.sdp,t),console.log(new Date,"-----------------------------------connect-----------------");case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return[function(e){console.log(new Date,"add ICE candidate"),s.current.addIceCandidate(e).catch((function(e){console.log(e)}))},w,D,k,function(){s.current.close(),r.sendClose(u)},function(){if(s.current&&"connected"===s.current.connectionState){var e=c.current.value;c.current.value="",a.current.value=" > "+e+"\n"+a.current.value,i.current.send(e)}else console.error("rtcPeerConnection is null")}]};var De=function(){var e=Object(o.useRef)(null),t=Object(o.useRef)(null),n=Object(o.useRef)(null),r=Object(o.useRef)(null),c=Se(e);m();var a=D(),s=Object(g.a)(a,2),i=s[0],u=s[1],l=new we(u),b=me(c,e,t,l,n,r),j=Object(g.a)(b,6),h=j[0],O=j[1],v=j[2],x=j[3],y=j[4],w=j[5];Z(i,l,h,O,v,y);var S=Object(o.useState)(!0),k=Object(g.a)(S,2),L=k[0],C=k[1],I=Object(o.useState)("setDestination"),N=Object(g.a)(I,2),R=N[0],U=N[1];return Object(E.jsx)("div",{className:"App",style:{textAlign:"center"},children:Object(E.jsxs)(p.b,{children:[Object(E.jsxs)(p.a,{children:[Object(E.jsx)("meta",{charSet:"utf-8"}),Object(E.jsx)("title",{children:"web-g"}),Object(E.jsx)("link",{rel:"",href:"https://web-g"})]}),Object(E.jsx)(T,{}),L?Object(E.jsx)(Y,{connect:x}):Object(E.jsx)(ve,{}),Object(E.jsx)("button",{onClick:function(){C(!L)},children:"Change map"}),Object(E.jsx)("button",{onClick:Object(f.a)(d.a.mark((function e(){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",x(R));case 1:case"end":return e.stop()}}),e)}))),children:"Connect"}),Object(E.jsx)("textarea",{value:R,onChange:function(e){U(e.target.value)}}),Object(E.jsx)(se,{}),Object(E.jsx)(ie,{localVideoRef:e,remoteVideoRef:t}),Object(E.jsx)("textarea",{readOnly:!0,ref:r}),Object(E.jsx)("textarea",{ref:n}),Object(E.jsx)("button",{onClick:w,children:"SendDataChannel"})]})})},ke=n(28),Le=Object(b.b)({name:"wsConnection",initialState:{wsConnectionType:"CONNECTING"},reducers:{connecting:function(e){e.wsConnectionType="CONNECTING"},connected:function(e){e.wsConnectionType="CONNECTED"},reconnecting:function(e){e.wsConnectionType="RECONNECTING"},reconnected:function(e){e.wsConnectionType="RECONNECTED"}}}),Ce=Le.actions,Ie=(Ce.connecting,Ce.connected,Ce.reconnecting,Ce.reconnected,Le.reducer),Ne=Object(ke.b)({wsConnectionState:Ie,gSetting:ee,gSignalingState:w,p2pState:X}),Ee=Object(b.a)({reducer:Ne,devTools:!1}),Te=(S.c,n(143));Object(Te.whyDidYouUpdate)(s.a),u.a.render(Object(E.jsx)(s.a.StrictMode,{children:Object(E.jsx)(S.a,{store:Ee,children:Object(E.jsx)(De,{})})}),document.getElementById("root"))}},[[287,1,2]]]);
//# sourceMappingURL=main.b12e3f0c.chunk.js.map