/* anon.js: tiny progressive enhancements for the anonymusk design system.
   No network calls of its own (page views are counted by GoatCounter, loaded separately in each page head;
   this file only adds click events to it). Safe to load with `defer` on any page. */
/* Signup forms (form[data-signup]): the one place to set the Formspree form id, site-wide.
   '' = forms open a pre-filled mailto: to the studio inbox (current). Set e.g. 'xayzabcd' to POST to https://formspree.io/f/<id>. */
var FORMSPREE_ID = 'mnpjrabb';
(function(){
  'use strict';
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Toasts: anonToast('Copied', 'ok'|'err'|'', ms)
  function host(){var h=document.querySelector('.toasts');if(!h){h=document.createElement('div');h.className='toasts';h.setAttribute('role','status');h.setAttribute('aria-live','polite');document.body.appendChild(h)}return h}
  window.anonToast=function(msg,type,ms){var t=document.createElement('div');t.className='toast'+(type?' '+type:'');t.textContent=msg;host().appendChild(t);
    setTimeout(function(){t.style.transition='opacity .25s';t.style.opacity='0';setTimeout(function(){t.remove()},260)},ms||2600);return t};
  // Staggered entrance for [data-reveal] (CSS animation; content is never hidden if JS fails)
  function reveal(){if(reduce)return;document.querySelectorAll('[data-reveal]').forEach(function(e,i){e.style.setProperty('--i',Math.min(i,14))})}
  // Header shadow once the page scrolls
  function hdr(){var h=document.querySelector('.site-header');if(!h)return;var on=false;
    function f(){var s=window.scrollY>4;if(s!==on){on=s;h.classList.toggle('scrolled',s)}}window.addEventListener('scroll',f,{passive:true});f()}
  // Tool grid filter (index)
  function filters(){var bar=document.querySelector('[data-filter-bar]');if(!bar)return;var cards=document.querySelectorAll('[data-cat]');
    bar.addEventListener('click',function(e){var b=e.target.closest('button[data-f]');if(!b)return;var f=b.getAttribute('data-f');
      bar.querySelectorAll('button').forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false')});
      cards.forEach(function(c){c.hidden=!(f==='all'||c.getAttribute('data-cat').split(' ').indexOf(f)>-1)})})}
  // Point signup forms at Formspree once FORMSPREE_ID is set
  function signup(){if(!FORMSPREE_ID)return;document.querySelectorAll('form[data-signup]').forEach(function(f){f.action='https://formspree.io/f/'+FORMSPREE_ID;f.removeAttribute('enctype')})}
  // GoatCounter click events: Gumroad links (click-gumroad-<slug>) and 'Send a brief' CTAs. No-op if count.js is blocked.
  function gcClicks(){document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[href]');if(!a)return;
      var gc=window.goatcounter,p=null,h=a.href||'';
      if(/^https?:\/\/([a-z0-9-]+\.)?gumroad\.com\//i.test(h)){var m=h.match(/\/l\/([A-Za-z0-9_-]+)/);p='click-gumroad-'+(m?m[1]:'store')}
      else if(/^\s*Send a brief/i.test(a.textContent||''))p='click-send-a-brief';
      if(p&&gc&&gc.count)try{gc.count({path:p,title:document.title,event:true})}catch(_){}},true)}
  function init(){reveal();hdr();filters();signup();gcClicks()}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
