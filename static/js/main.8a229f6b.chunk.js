(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{18:function(t,a,e){},19:function(t,a,e){},21:function(t,a,e){},22:function(t,a,e){},24:function(t,a,e){},25:function(t,a,e){},26:function(t,a,e){"use strict";e.r(a);var n=e(5),c=e.n(n),s=e(8),i=e.n(s),h=(e(18),e(19),e(7)),d=e.n(h),r=e(4),l=e(9),o=e(3),u=e(0),b=e(10),j=e(11),O=e(2),p=e(13),m=e(12),f=(e(21),e(22),e(1));var g=function(t){var a=t.card.value+t.card.suit,e=t.card.faceUp,n=t.opacity;return e?Object(f.jsx)("img",{alt:"card",className:"play-card",width:61.5,height:87.8,src:"/blackjack/images/"+a+".png",style:{opacity:n}}):Object(f.jsx)("img",{alt:"card",className:"play-card",width:61.5,height:87.8,src:"/blackjack/images/back.png"})};function v(){function t(t){for(var a=0;a<1e3;a++){var e=Math.floor(Math.random()*t.length),n=Math.floor(Math.random()*t.length),c=t[e];t[e]=t[n],t[n]=c}}this.deck=function(){for(var a=["d","c","h","s"],e=["A","2","3","4","5","6","7","8","9","10","J","Q","K"],n=[1,2,3,4,5,6,7,8,9,10,10,10,10],c=[],s=0;s<a.length;s++)for(var i=0;i<e.length;i++){var h={value:e[i],suit:a[s],num:n[i]};c.push(h)}var d=c.concat(c);return t(d),d}(),this.burn=[],this.shuffle=function(a){t(a)}}v.prototype.deal=function(t){if(this.deck.length){var a=this.deck.pop();return this.burn.push(a),t?Object(u.a)(Object(u.a)({},a),{},{faceUp:!0}):Object(u.a)(Object(u.a)({},a),{},{faceUp:!1})}this.shuffle(this.burn),this.deck=this.burn,this.burn=[];var e=this.deck.pop();return this.burn.push(e),t?Object(u.a)(Object(u.a)({},e),{},{faceUp:!0}):Object(u.a)(Object(u.a)({},e),{},{faceUp:!1})},v.prototype.getDeck=function(){return this.deck};var k=v,S=(e(24),function(t){var a=Math.floor(t/100);t-=100*a;var e=Math.floor(t/50);t-=50*e;var n=Math.floor(t/25);t-=25*n;for(var c=Math.floor(t/5),s=[],i=[a,e,n,c,t-=5*c],h=[100,50,25,5,1],d=0;d<i.length;d++)for(var r=0;r<i[d];r++)s.push(h[d]);return s});var x=function(t){var a=t.bank,e=82.5,n=t.bet,c=t.allIn,s=t.clearBet;return Object(f.jsxs)(f.Fragment,{children:[Object(f.jsxs)("div",{className:"bank-total col-4",children:[Object(f.jsxs)("div",{className:"bank-total-text",children:[Object(f.jsx)("b",{children:"Bank:"})," $",a]}),Object(f.jsx)("div",{className:"bank-all-in",children:a>0?Object(f.jsx)("button",{className:"all-in-button btn btn-success",onClick:c,children:"ALL IN"}):Object(f.jsx)("button",{className:"all-in-button btn btn-success",onClick:s,children:"CLEAR BET"})})]}),a>0?Object(f.jsx)("div",{className:"bank-chip col-3",children:Object(f.jsx)("input",{type:"image",src:"/blackjack/images/1.png",width:e,height:75,value:1,onClick:n,className:"chip btn"})}):null,a>=5?Object(f.jsx)("div",{className:"bank-chip col-3",children:Object(f.jsx)("input",{type:"image",src:"/blackjack/images/5.png",width:e,height:75,value:5,onClick:n,className:"chip btn"})}):null,a>=25?Object(f.jsx)("div",{className:"bank-chip col-3",children:Object(f.jsx)("input",{type:"image",src:"/blackjack/images/25.png",width:e,height:75,value:25,onClick:n,className:"chip btn"})}):null,a>=50?Object(f.jsx)("div",{className:"bank-chip col-3",children:Object(f.jsx)("input",{type:"image",src:"/blackjack/images/50.png",width:e,height:75,value:50,onClick:n,className:"chip btn"})}):null,a>=100?Object(f.jsx)("div",{className:"bank-chip col-3",children:Object(f.jsx)("input",{type:"image",src:"/blackjack/images/100.png",width:e,height:75,value:100,onClick:n,className:"chip-1 btn"})}):null]})};e(25);var P=function(t){var a=t.pot,e=t.pArray,n=e[e.length-1],c=t.remove;return Object(f.jsxs)(f.Fragment,{children:[Object(f.jsxs)("div",{className:"pot-title col-6",children:[Object(f.jsx)("b",{children:"Pot:"})," $",a]}),e.length?Object(f.jsx)("div",{className:"pot-chip col-6",children:Object(f.jsx)("input",{type:"image",src:"/blackjack/images/"+n+".png",width:82.5,height:75,value:n,onClick:c,className:"chip btn"})}):Object(f.jsx)("div",{className:"col-6",children:Object(f.jsxs)("div",{className:"empty-pot",style:{color:"white"},children:[" YOUR POT ",Object(f.jsx)("br",{}),"HERE"]})})]})};function y(t){var a=t.pots,e=t.hand,n=t.gameStatus.hand;return a[n]<=t.bank&&2===e["handP"+n].length?Object(f.jsx)("button",{className:"btn btn-success col-4",onClick:t.double,children:"(2X)Double "}):null}function H(t){return t.deal?Object(f.jsxs)(f.Fragment,{children:[Object(f.jsxs)("button",{className:"btn btn-success col-3",onClick:t.hit,children:[Object(f.jsx)("i",{className:"fa fa-plus-square-o","aria-hidden":"true"})," Hit"]})," ",Object(f.jsx)(y,{pots:t.pots,gameStatus:t.gameStatus,hand:t.hand,bank:t.bank,double:t.double})," ",Object(f.jsxs)("button",{className:"btn btn-success col-4",onClick:t.stand,children:[Object(f.jsx)("i",{className:"fa fa-hand-paper-o","aria-hidden":"true"})," Stand "]})]}):null}var N={deckInstance:new k,hand:{handP1:[],handP2:[],handH:[]},bank:900,pot1:100,pot2:0,lastBet:100,pArray:[100],gameStatus:{deal:!1,split:!1,hand:1,op1:1,op2:1}},A=function(t){Object(p.a)(e,t);var a=Object(m.a)(e);function e(t){var n;return Object(b.a)(this,e),(n=a.call(this,t)).state=N,n.deal=n.deal.bind(Object(O.a)(n)),n.getVal=n.getVal.bind(Object(O.a)(n)),n.sameVal=n.sameVal.bind(Object(O.a)(n)),n.isSplit=n.isSplit.bind(Object(O.a)(n)),n.split=n.split.bind(Object(O.a)(n)),n.nextRound=n.nextRound.bind(Object(O.a)(n)),n.compareHand=n.compareHand.bind(Object(O.a)(n)),n.revealHand=n.revealHand.bind(Object(O.a)(n)),n.hit=n.hit.bind(Object(O.a)(n)),n.bet=n.bet.bind(Object(O.a)(n)),n.allIn=n.allIn.bind(Object(O.a)(n)),n.clearBet=n.clearBet.bind(Object(O.a)(n)),n.remove=n.remove.bind(Object(O.a)(n)),n.stand=n.stand.bind(Object(O.a)(n)),n.double=n.double.bind(Object(O.a)(n)),n}return Object(j.a)(e,[{key:"bet",value:function(t){var a=parseInt(t.currentTarget.value);this.setState((function(t,e){return Object(u.a)(Object(u.a)({},t),{},{bank:t.bank-a,pot1:t.pot1+a,pArray:[].concat(Object(o.a)(t.pArray),[a])})}))}},{key:"allIn",value:function(){this.setState((function(t,a){return Object(u.a)(Object(u.a)({},t),{},{bank:0,pot1:t.pot1+t.bank,pArray:S(t.pot1+t.bank)})}))}},{key:"clearBet",value:function(){this.setState((function(t,a){return Object(u.a)(Object(u.a)({},t),{},{bank:t.pot1+t.bank,pot1:0,pArray:[]})}))}},{key:"remove",value:function(){var t=this.state.pArray[this.state.pArray.length-1];this.setState((function(a,e){return Object(u.a)(Object(u.a)({},a),{},{bank:t+a.bank,pot1:a.pot1-t,pArray:a.pArray.slice(0,-1)})}))}},{key:"getVal",value:function(t){var a=t.some((function(t){return 1===t.num})),e=t.reduce((function(t,a){return{num:t.num+a.num}}));if(a){var n=!1,c=t.reduce((function(t,a,e){return 1===e&&1===t.num?(n=!0,{num:11+a.num}):1!==a.num||n?{num:t.num+a.num}:(n=!0,{num:t.num+11})}));return c.num<=21?c.num:e.num}return e.num}},{key:"sameVal",value:function(t){return t[0].num===t[1].num}},{key:"isSplit",value:function(){return this.state.gameStatus.deal&&!1===this.state.gameStatus.split&&this.state.bank>=this.state.pot1&&2===this.state.hand.handP1.length&&0===this.state.hand.handP2.length&&this.sameVal(this.state.hand.handP1)}},{key:"deal",value:function(){var t=this;if(this.state.deckInstance.getDeck().length<56)this.setState((function(t,a){return Object(u.a)(Object(u.a)({},t),{},{deckInstance:new k})}),(function(){var a=new Array(t.state.deckInstance.deal(!0),t.state.deckInstance.deal(!1),t.state.deckInstance.deal(!0),t.state.deckInstance.deal(!0));t.setState((function(t,e){return Object(u.a)(Object(u.a)({},t),{},{hand:Object(u.a)(Object(u.a)({},t.hand),{},{handP1:[a[0],a[2]],handH:[a[1],a[3]]}),gameStatus:Object(u.a)(Object(u.a)({},t.gameStatus),{},{deal:!0}),lastBet:t.pot1})}),(function(){21===t.getVal([a[0],a[2]])&&setTimeout((function(){alert("BLACKJACK!!"),t.revealHand()}),500)}))}));else{var a=new Array(this.state.deckInstance.deal(!0),this.state.deckInstance.deal(!1),this.state.deckInstance.deal(!0),this.state.deckInstance.deal(!0));this.setState((function(t,e){return Object(u.a)(Object(u.a)({},t),{},{hand:Object(u.a)(Object(u.a)({},t.hand),{},{handP1:[a[0],a[2]],handH:[a[1],a[3]]}),gameStatus:Object(u.a)(Object(u.a)({},t.gameStatus),{},{deal:!0}),lastBet:t.pot1})}),(function(){21===t.getVal([a[0],a[2]])&&setTimeout((function(){alert("BLACKJACK!!"),t.revealHand()}),500)}))}}},{key:"split",value:function(){var t=this,a=Object(u.a)(Object(u.a)({},this.state.hand),{},{handP1:[this.state.hand.handP1[0]],handP2:[this.state.hand.handP1[1]]}),e=this.state.bank-this.state.pot1,n=this.state.pot1,c=this.state.pArray.concat(S(this.state.pot1));this.setState((function(t,s){return Object(u.a)(Object(u.a)({},t),{},{hand:a,bank:e,pot2:n,pArray:c,gameStatus:Object(u.a)(Object(u.a)({},t.gameStatus),{},{split:!0,op2:.5})})}),(function(){setTimeout((function(){var a=t.state.deckInstance.deal(!0);t.setState((function(t,e){return Object(u.a)(Object(u.a)({},t),{},{hand:Object(u.a)(Object(u.a)({},t.hand),{},{handP1:[].concat(Object(o.a)(t.hand.handP1),[a])})})}),(function(){21===t.getVal(t.state.hand.handP1)&&setTimeout((function(){alert("BLACKJACK!!");var a=t.state.deckInstance.deal(!0);t.setState((function(t,e){return Object(u.a)(Object(u.a)({},t),{},{gameStatus:Object(u.a)(Object(u.a)({},t.gameStatus),{},{hand:2,op1:.5,op2:1}),hand:Object(u.a)(Object(u.a)({},t.hand),{},{handP2:[].concat(Object(o.a)(t.hand.handP2),[a])})})}),(function(){21===t.getVal(t.state.hand.handP2)&&(alert("BLACKJACK!!"),t.revealHand())}))}),500)}))}),500)}))}},{key:"nextRound",value:function(){if(0===this.state.bank)alert("Game Over!!"),this.setState(Object(u.a)(Object(u.a)({},N),{},{deckInstance:new k}));else{var t=this.state.lastBet<=this.state.bank?this.state.lastBet:this.state.bank,a=S(t),e=this.state.bank-t;this.setState((function(n,c){return Object(u.a)(Object(u.a)({},n),{},{hand:Object(u.a)({},N.hand),pot1:t,pot2:0,bank:e,pArray:a,gameStatus:Object(u.a)({},N.gameStatus)})}))}}},{key:"compareHand",value:function(){var t=Object(l.a)(d.a.mark((function t(a,e,n){var c,s,i,h=this;return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return c={1:this.state.pot1,2:this.state.pot2},s={1:"1",2:"2"},t.next=4,new Promise((function(t){if(e>a){if(e<=21)return alert("Dealer wins against Hand".concat(n,"! You lose $").concat(c[n],"!")),h.setState((function(t,a){return Object(u.a)(Object(u.a)({},t),{},Object(r.a)({},"pot"+s[n],0))})),t("loss");alert("Dealer BUST! You win $".concat(c[n]," for Hand ").concat(n,"!"));var i=h.state.bank+2*c[n];return h.setState((function(t,a){return Object(u.a)(Object(u.a)({},t),{},Object(r.a)({bank:i},"pot"+s[n],0))})),t("dealer bust you win")}if(!(e<17)){if(e===a){alert("It's a push/tie for Hand ".concat(n,"! You keep $").concat(c[n],"!"));var d=h.state.bank+c[n];return h.setState((function(t,a){return Object(u.a)(Object(u.a)({},t),{},Object(r.a)({bank:d},"pot"+s[n],0))})),t("tie")}alert("You win $".concat(c[n]," for Hand ").concat(n,"!"));var l=h.state.bank+2*c[n];return h.setState((function(t,a){return Object(u.a)(Object(u.a)({},t),{},Object(r.a)({bank:l},"pot"+s[n],0))})),t("win")}var o=h.state.hand.handH.concat([h.state.deckInstance.deal(!0)]);h.setState((function(t,a){return Object(u.a)(Object(u.a)({},t),{},{hand:Object(u.a)(Object(u.a)({},t.hand),{},{handH:o})})}),(function(){setTimeout((function(){var e=h.getVal(o);if(e>21){alert("Dealer BUST! You win $".concat(c[n]," for Hand ").concat(n,"!"));var i=h.state.bank+2*c[n];return h.setState((function(t,a){return Object(u.a)(Object(u.a)({},t),{},Object(r.a)({bank:i},"pot"+s[n],0))})),t("dealer bust you win")}return t(h.compareHand(a,e,n))}),500)}))}));case 4:return i=t.sent,t.abrupt("return",i);case 6:case"end":return t.stop()}}),t,this)})));return function(a,e,n){return t.apply(this,arguments)}}()},{key:"revealHand",value:function(){var t=this;this.setState((function(t,a){return Object(u.a)(Object(u.a)({},t),{},{hand:Object(u.a)(Object(u.a)({},t.hand),{},{handH:[Object(u.a)(Object(u.a)({},t.hand.handH[0]),{},{faceUp:!0}),t.hand.handH[1]]})})}),(function(){var a=t.getVal(t.state.hand.handH),e=t.getVal(t.state.hand.handP1),n=t.state.hand.handP2.length?t.getVal(t.state.hand.handP2):0;setTimeout((function(){t.state.gameStatus.split?0===t.state.pot1?t.compareHand(n,a,2).then((function(a){t.nextRound()})):0===t.state.pot2?t.setState((function(t,a){return Object(u.a)(Object(u.a)({},t),{},{gameStatus:Object(u.a)(Object(u.a)({},t.gameStatus),{},{op2:.5,op1:1})})}),(function(){t.compareHand(e,a,1).then((function(a){t.nextRound()}))})):t.compareHand(n,a,2).then((function(){a=t.getVal(t.state.hand.handH),t.setState((function(t,a){return Object(u.a)(Object(u.a)({},t),{},{gameStatus:Object(u.a)(Object(u.a)({},t.gameStatus),{},{op2:.5,op1:1})})}),(function(){setTimeout((function(){t.compareHand(e,a,1).then((function(a){t.nextRound()}))}),500)}))})):t.compareHand(e,a,1).then((function(a){t.nextRound()}))}),500)}))}},{key:"hit",value:function(){var t=this;if(this.state.gameStatus.split){if(1===this.state.gameStatus.hand){var a=this.state.hand.handP1.concat([this.state.deckInstance.deal(!0)]);this.setState((function(t,e){return Object(u.a)(Object(u.a)({},t),{},{hand:Object(u.a)(Object(u.a)({},t.hand),{},{handP1:a})})}),(function(){t.getVal(a)>21?setTimeout((function(){alert("Hand 1 BUST! You lose $".concat(t.state.pot1,"!"));var a=t.state.deckInstance.deal(!0);t.setState((function(t,e){return Object(u.a)(Object(u.a)({},t),{},{pot1:0,gameStatus:Object(u.a)(Object(u.a)({},t.gameStatus),{},{hand:2,op1:.5,op2:1}),hand:Object(u.a)(Object(u.a)({},t.hand),{},{handP2:[].concat(Object(o.a)(t.hand.handP2),[a])})})}),(function(){21===t.getVal(t.state.hand.handP2)&&setTimeout((function(){alert("BLACKJACK!!"),t.revealHand()}),500)}))}),500):21===t.getVal(a)&&setTimeout((function(){alert("You hit 21!");var a=t.state.deckInstance.deal(!0);t.setState((function(t,e){return Object(u.a)(Object(u.a)({},t),{},{gameStatus:Object(u.a)(Object(u.a)({},t.gameStatus),{},{hand:2,op1:.5,op2:1}),hand:Object(u.a)(Object(u.a)({},t.hand),{},{handP2:[].concat(Object(o.a)(t.hand.handP2),[a])})})}),(function(){21===t.getVal(t.state.hand.handP2)&&setTimeout((function(){alert("BLACKJACK!!"),t.revealHand()}),500)}))}),500)}))}else if(2===this.state.gameStatus.hand){var e=this.state.hand.handP2.concat([this.state.deckInstance.deal(!0)]);this.setState((function(t,a){return Object(u.a)(Object(u.a)({},t),{},{hand:Object(u.a)(Object(u.a)({},t.hand),{},{handP2:e})})}),(function(){t.getVal(e)>21?setTimeout((function(){alert("Hand 2 BUST! You lose $".concat(t.state.pot2,"!")),t.setState((function(t,a){return Object(u.a)(Object(u.a)({},t),{},{pot2:0})}),(function(){t.state.pot1?t.setState((function(t,a){return Object(u.a)(Object(u.a)({},t),{},{gameStatus:Object(u.a)(Object(u.a)({},t.gameStatus),{},{op1:1,op2:.5})})}),(function(){t.revealHand()})):t.nextRound()}))}),500):21===t.getVal(e)&&setTimeout((function(){alert("You hit 21!"),t.revealHand()}),500)}))}}else if(!1===this.state.gameStatus.split){var n=this.state.hand.handP1.concat([this.state.deckInstance.deal(!0)]);this.setState((function(t,a){return Object(u.a)(Object(u.a)({},t),{},{hand:Object(u.a)(Object(u.a)({},t.hand),{},{handP1:n})})}),(function(){t.getVal(n)>21?setTimeout((function(){alert("Hand 1 BUST! You lose $".concat(t.state.pot1,"!")),t.setState((function(t,a){return Object(u.a)(Object(u.a)({},t),{},{pot1:0})}),(function(){t.nextRound()}))}),500):21===t.getVal(n)&&setTimeout((function(){alert("You hit 21!"),t.revealHand()}),500)}))}}},{key:"stand",value:function(){var t=this;if(this.state.gameStatus.split)if(2===this.state.gameStatus.hand)this.revealHand();else{var a=this.state.deckInstance.deal(!0);this.setState((function(t,e){return Object(u.a)(Object(u.a)({},t),{},{gameStatus:Object(u.a)(Object(u.a)({},t.gameStatus),{},{hand:2,op1:.5,op2:1}),hand:Object(u.a)(Object(u.a)({},t.hand),{},{handP2:[].concat(Object(o.a)(t.hand.handP2),[a])})})}),(function(){21===t.getVal(t.state.hand.handP2)&&setTimeout((function(){alert("BLACKJACK!!"),t.revealHand()}),500)}))}else this.revealHand()}},{key:"double",value:function(){var t=this;if(this.state.gameStatus.split){if(1===this.state.gameStatus.hand){var a=this.state.deckInstance.deal(!0),e=2*this.state.pot1,n=this.state.bank-this.state.pot1;this.setState((function(t,c){return Object(u.a)(Object(u.a)({},t),{},{pot1:e,bank:n,hand:Object(u.a)(Object(u.a)({},t.hand),{},{handP1:[].concat(Object(o.a)(t.hand.handP1),[a])})})}),(function(){if(t.getVal(t.state.hand.handP1)>=21)setTimeout((function(){if(t.getVal(t.state.hand.handP1)>21){alert("Hand 1 BUST! You lose $".concat(t.state.pot1,"!"));var a=t.state.deckInstance.deal(!0);t.setState((function(t,e){return Object(u.a)(Object(u.a)({},t),{},{pot1:0,gameStatus:Object(u.a)(Object(u.a)({},t.gameStatus),{},{hand:2,op1:.5,op2:1}),hand:Object(u.a)(Object(u.a)({},t.hand),{},{handP2:[].concat(Object(o.a)(t.hand.handP2),[a])})})}),(function(){21===t.getVal(t.state.hand.handP2)&&setTimeout((function(){alert("BLACKJACK!!"),t.revealHand()}),500)}))}else if(21===t.getVal(t.state.hand.handP1)){alert("You hit 21!");var e=t.state.deckInstance.deal(!0);t.setState((function(t,a){return Object(u.a)(Object(u.a)({},t),{},{gameStatus:Object(u.a)(Object(u.a)({},t.gameStatus),{},{hand:2,op1:.5,op2:1}),hand:Object(u.a)(Object(u.a)({},t.hand),{},{handP2:[].concat(Object(o.a)(t.hand.handP2),[e])})})}),(function(){21===t.getVal(t.state.hand.handP2)&&setTimeout((function(){alert("BLACKJACK!!"),t.revealHand()}),500)}))}}),500);else{var a=t.state.deckInstance.deal(!0);t.setState((function(t,e){return Object(u.a)(Object(u.a)({},t),{},{gameStatus:Object(u.a)(Object(u.a)({},t.gameStatus),{},{hand:2,op1:.5,op2:1}),hand:Object(u.a)(Object(u.a)({},t.hand),{},{handP2:[].concat(Object(o.a)(t.hand.handP2),[a])})})}),(function(){21===t.getVal(t.state.hand.handP2)&&setTimeout((function(){alert("BLACKJACK!!"),t.revealHand()}),500)}))}}))}else if(2===this.state.gameStatus.hand){var c=this.state.deckInstance.deal(!0),s=2*this.state.pot2,i=this.state.bank-this.state.pot2;this.setState((function(t,a){return Object(u.a)(Object(u.a)({},t),{},{pot2:s,bank:i,hand:Object(u.a)(Object(u.a)({},t.hand),{},{handP2:[].concat(Object(o.a)(t.hand.handP2),[c])})})}),(function(){t.getVal(t.state.hand.handP2)>=21?setTimeout((function(){t.getVal(t.state.hand.handP2)>21?(alert("Hand 2 BUST! You lose $".concat(t.state.pot2,"!")),t.setState((function(t,a){return Object(u.a)(Object(u.a)({},t),{},{pot2:0})}),(function(){t.state.pot1?t.setState((function(t,a){return Object(u.a)(Object(u.a)({},t),{},{gameStatus:Object(u.a)(Object(u.a)({},t.gameStatus),{},{op1:1,op2:.5})})}),(function(){t.revealHand()})):t.nextRound()}))):21===t.getVal(t.state.hand.handP2)&&(alert("You hit 21!"),t.revealHand())}),500):setTimeout((function(){t.revealHand()}),500)}))}}else if(!this.state.gameStatus.split){var h=this.state.deckInstance.deal(!0),d=2*this.state.pot1,r=this.state.bank-this.state.pot1;this.setState((function(t,a){return Object(u.a)(Object(u.a)({},t),{},{pot1:d,bank:r,hand:Object(u.a)(Object(u.a)({},t.hand),{},{handP1:[].concat(Object(o.a)(t.hand.handP1),[h])})})}),(function(){t.getVal(t.state.hand.handP1)>=21?setTimeout((function(){t.getVal(t.state.hand.handP1)>21?(alert("Hand 1 BUST! You lose $".concat(t.state.pot1,"!")),t.setState((function(t,a){return Object(u.a)(Object(u.a)({},t),{},{pot1:0})}),(function(){t.nextRound()}))):21===t.getVal(t.state.hand.handP1)&&(alert("You hit 21!"),t.revealHand())}),500):setTimeout((function(){t.revealHand()}),500)}))}}},{key:"render",value:function(){var t=this,a=this.state.hand.handP1.map((function(a,e){return Object(f.jsx)(g,{card:a,opacity:t.state.gameStatus.op1},e+"p0card")})),e=this.state.hand.handP2.map((function(a,e){return Object(f.jsx)(g,{card:a,opacity:t.state.gameStatus.op2},e+"p1card")})),n=this.state.hand.handH.map((function(t,a){return Object(f.jsx)(g,{card:t},a+"p1card")}));return Object(f.jsxs)("div",{className:"home container",children:[Object(f.jsxs)("div",{className:"home-items",children:[Object(f.jsxs)("div",{className:"deck-row row",children:[Object(f.jsx)("div",{className:"game-banner col-7",children:Object(f.jsx)("img",{alt:"game banner",height:35,width:180,src:"/blackjack/images/banner.png"})}),Object(f.jsx)("div",{className:"deck-pic col-2",children:Object(f.jsx)("img",{alt:"deck dummy",width:30,height:35,src:"/blackjack/images/dummy.png"})}),Object(f.jsx)("div",{className:"total-number col-3",style:{color:"white"},children:this.state.deckInstance.getDeck().length})]}),Object(f.jsxs)("div",{className:"dealer-hand-row row",children:[Object(f.jsx)("div",{className:"dealer-hand-title col-12",children:"DEALER'S HAND"}),Object(f.jsxs)("div",{className:"dealer-hand-card col-6",children:[Object(f.jsx)("div",{className:"dealer-cards",style:{width:61.5+11.5*(this.state.hand.handH.length-1)},children:n}),this.state.hand.handH.length&&this.state.hand.handH[0].faceUp?Object(f.jsxs)("div",{className:"dealer-hand-total",children:["TOTAL: ",this.getVal(this.state.hand.handH)]}):null]})]}),Object(f.jsxs)("div",{className:"player-hand-row row",children:[Object(f.jsx)("div",{className:"player-hand-title col-12",children:"PLAYER'S HAND"}),Object(f.jsxs)("div",{className:"player-hand-card col-6",children:[a,this.state.hand.handP1.length?Object(f.jsxs)("div",{className:"player-hand-total",children:["TOTAL: ",this.getVal(this.state.hand.handP1)]}):null,this.state.hand.handP1.length?Object(f.jsxs)("div",{className:"player-hand-value",children:["VALUE: ",this.getVal(this.state.hand.handP1)<=21?Object(f.jsxs)("span",{children:["$",this.state.pot1]}):Object(f.jsx)("span",{children:"BUST!"})]}):null]}),Object(f.jsxs)("div",{className:"player-hand-card col-6",children:[e,this.state.hand.handP2.length?Object(f.jsxs)("div",{className:"player-hand-total",children:["TOTAL: ",this.getVal(this.state.hand.handP2)]}):null,this.state.hand.handP2.length?Object(f.jsxs)("div",{className:"player-hand-value",children:["VALUE: ",this.getVal(this.state.hand.handP2)<=21?Object(f.jsxs)("span",{children:["$",this.state.pot2]}):Object(f.jsx)("span",{children:"BUST!"})]}):null]})]}),Object(f.jsxs)("div",{className:"action-row row",children:[!this.state.gameStatus.deal&&this.state.pot1?Object(f.jsx)("button",{className:"btn btn-info col-3",onClick:this.deal,children:"Deal"}):null,Object(f.jsx)(H,{pots:{1:this.state.pot1,2:this.state.pot2},gameStatus:this.state.gameStatus,hand:this.state.hand,bank:this.state.bank,deal:this.state.gameStatus.deal,hit:this.hit,stand:this.stand,double:this.double}),this.isSplit()?Object(f.jsx)("button",{className:"splt-btn btn btn-success col-7",onClick:this.split,children:"Split"}):null]}),Object(f.jsx)("div",{className:"pot-row row",children:this.state.gameStatus.deal?Object(f.jsxs)(f.Fragment,{children:[Object(f.jsxs)("div",{className:"pot-title col-4",children:[Object(f.jsx)("b",{children:"Pot:"})," $",this.state.pot1+this.state.pot2]}),Object(f.jsxs)("div",{className:"bank-total-text col-4",children:[Object(f.jsx)("b",{children:"Bank:"})," $",this.state.bank]})]}):Object(f.jsx)(P,{bank:this.state.bank,pot:this.state.pot1,pArray:this.state.pArray,remove:this.remove})})]}),Object(f.jsx)("div",{className:"footer row",children:this.state.gameStatus.deal?null:Object(f.jsx)(x,{bank:this.state.bank,pot:this.state.pot1,pArray:this.state.pArray,allIn:this.allIn,clearBet:this.clearBet,bet:this.bet})})]})}}]),e}(c.a.Component);var V=function(){return Object(f.jsx)("div",{className:"App",children:Object(f.jsx)(A,{})})};i.a.render(Object(f.jsx)(c.a.StrictMode,{children:Object(f.jsx)(V,{})}),document.getElementById("root"))}},[[26,1,2]]]);
//# sourceMappingURL=main.8a229f6b.chunk.js.map