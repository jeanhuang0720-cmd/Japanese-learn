const $=s=>document.querySelector(s);
const modal=$("#modal"),toast=$("#toast");
function openModal(){modal.classList.add("show");modal.setAttribute("aria-hidden","false");document.body.style.overflow="hidden"}
function closeModal(){modal.classList.remove("show");modal.setAttribute("aria-hidden","true");document.body.style.overflow=""}
function showToast(t){toast.textContent=t;toast.classList.add("show");clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>toast.classList.remove("show"),2200)}
$("#startBtn").onclick=openModal;$("#ctaBtn").onclick=openModal;$("#close").onclick=closeModal;$(".backdrop").onclick=closeModal;
$("#menuBtn").onclick=()=>$("#nav").classList.toggle("open");
$("#moreBtn").onclick=()=>{$("#extra").classList.toggle("show");$("#moreBtn").textContent=$("#extra").classList.contains("show")?"收起":"更多"};
document.querySelectorAll(".choices button").forEach(b=>b.onclick=()=>{showToast("已選擇「"+b.dataset.topic+"」");location.hash="resources"});
document.querySelectorAll(".levels button").forEach(b=>b.onclick=()=>{showToast("已選擇："+b.textContent.trim()+"，下一步可以選擇學習目標！");closeModal()});
document.querySelectorAll("nav a").forEach(a=>a.onclick=()=>$("#nav").classList.remove("open"));
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});