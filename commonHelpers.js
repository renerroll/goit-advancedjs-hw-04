import{a as h,S as w,i as v}from"./assets/vendor-3b56a289.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const a of e)if(a.type==="childList")for(const m of a.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&s(m)}).observe(document,{childList:!0,subtree:!0});function o(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerPolicy&&(a.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?a.credentials="include":e.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(e){if(e.ep)return;e.ep=!0;const a=o(e);fetch(e.href,a)}})();const L="45390731-4de91971590831384ce1e2f20",b="https://pixabay.com/api/",p=async(t,r=1,o=22)=>{const s={key:L,q:t,image_type:"photo",orientation:"horizontal",safesearch:"true",page:r,per_page:o};try{return(await h.get(b,{params:s})).data}catch(e){throw e}},y=document.querySelector(".gallery"),S=t=>new Promise((r,o)=>{const s=new Image;s.src=t,s.onload=()=>r(t),s.onerror=e=>o(e)}),u=async(t,r=!1)=>{r&&(y.innerHTML="");const o=t.map(e=>S(e.webformatURL));await Promise.all(o),y.innerHTML+=t.map(e=>`
    <a href="${e.largeImageURL}" class="gallery-item">
      <img src="${e.webformatURL}" alt="${e.tags}">
      <div class="info">
        <div>
          <p>Likes</p>
          <p>${e.likes}</p>
        </div>
        <div>
          <p>Views</p>
          <p>${e.views}</p>
        </div>
        <div>
          <p>Comments</p>
          <p>${e.comments}</p>
        </div>
        <div>
          <p>Downloads</p>
          <p>${e.downloads}</p>
        </div>
      </div>
    </a>
  `).join(""),new w(".gallery a",{captions:!0,captionsData:"alt",captionPosition:"bottom"}).refresh()},P={position:"topRight",messageColor:"white",iconColor:"white"},i=t=>{v.info({message:t,color:"#0099FF",...P})},f=document.querySelector(".search-form"),q=document.querySelector('.search-form input[name="search"]');document.querySelector(".gallery");const n=document.querySelector(".loader"),l=document.querySelector(".load-more");let d=1,g="",c=0;const I=async t=>{t.preventDefault();const r=q.value.trim();if(!r){i("Hey! enter a search query.");return}l.style.display="none",n.style.display="none",d=1,c=0,g=r;try{n.style.display="flex";const o=await p(r,d);if(c=o.hits.length,o.hits.length===0){i("Strange as it may seem, we did not find any images matching your search.");return}await u(o.hits,!0),c<o.totalHits?l.style.display="block":i("Strange as it may seem, we did not find any more images matching your search.")}catch{i("Damn! An error occurred while fetching images. Please try again later.")}finally{n.style.display="Woops! An error occurred while fetching images. Please try again later.",f.reset()}},x=async()=>{d+=1,l.style.display="none",n.style.display="flex";try{const t=await p(g,d);c+=t.hits.length,await u(t.hits);const{height:r}=document.querySelector(".gallery-item").getBoundingClientRect();window.scrollBy({top:r*2+48,behavior:"smooth"}),c>=t.totalHits?i("Strange as it may seem, we did not find any more images matching your search."):l.style.display="block"}catch{i("Damn! An error occurred while fetching images. Please try again later.")}finally{n.style.display="Woops! An error occurred while fetching images. Please try again later."}};f.addEventListener("submit",I);l.addEventListener("click",x);
//# sourceMappingURL=commonHelpers.js.map
