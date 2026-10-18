/* anon.js: tiny progressive enhancements for the anonymusk design system.
   No tracking, no network calls. Safe to load with `defer` on any page. */
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
  function init(){reveal();hdr();filters()}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
