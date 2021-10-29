import{W as x,P as y,S as M,B as p,M as S,C as P,a as z,b as v,c as h,E as B,R as C,A as L}from"./vendor.2890ec37.js";const R=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))w(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&w(l)}).observe(document,{childList:!0,subtree:!0});function n(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function w(e){if(e.ep)return;e.ep=!0;const o=n(e);fetch(e.href,o)}};R();const W=91099,H=.01;function A(c){return c.innerWidth/W}function E(){return H}const a=new x;a.setSize(window.innerWidth,window.innerHeight);a.setPixelRatio(window.devicePixelRatio*2);document.body.appendChild(a.domElement);const r=new y(45,window.innerWidth/window.innerHeight,1,500);r.position.set(0,0,5);r.lookAt(0,0,0);const u=new M,i=A(window),O=new p(i,i,i);new S({color:16777215,wireframe:!0});const f=new P(2,2,2,1,5,!0);f.computeBoundingBox();const b=new z({uniforms:{color1:{value:new v("purple")},color2:{value:new v("red")},bboxMin:{value:f.boundingBox.min},bboxMax:{value:f.boundingBox.max}},vertexShader:`
    uniform vec3 bboxMin;
    uniform vec3 bboxMax;
  
    varying vec2 vUv;

    void main() {
      vUv.y = (position.y - bboxMin.y) / (bboxMax.y - bboxMin.y);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }
  `,fragmentShader:`
    uniform vec3 color1;
    uniform vec3 color2;
  
    varying vec2 vUv;
    
    void main() {
      
      gl_FragColor = vec4(mix(color1, color2, vUv.y), 1.0);
    }
  `,wireframe:!1}),s=new h(O,b);s.material.transparent=!0;u.add(s);const j=new p(i*10,i*10,i*10),d=new h(j,b);u.add(d);const m=new B(a),U=new C(u,r);m.addPass(U);const F=new L(.99);m.addPass(F);g();function g(){const c=requestAnimationFrame(g);m.render();const t=E();s.rotation.x+=t,s.rotation.y+=t;let n=5;c%2==0,s.position.set(n%.005,-(-.2*n%.005^2+.1*n%6-.005),-(n%15)),r.rotation.z+=.01,d.rotation.x+=t,d.rotation.y+=t,d.rotation.z+=t}window.addEventListener("resize",()=>{r.aspect=window.innerWidth/window.innerHeight,r.updateProjectionMatrix(),a.setSize(window.innerWidth,window.innerHeight)});
