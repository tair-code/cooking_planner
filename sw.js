// Network first so updates show up; cached copy when offline.
const C="planner-v9";
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(['./','index.html','manifest.webmanifest','icon-192.png'])))});
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.hostname==='api.anthropic.com')return;
  e.respondWith(fetch(e.request).then(r=>{if(r.ok&&(u.origin===location.origin||u.hostname.endsWith('gstatic.com')||u.hostname.endsWith('googleapis.com'))){const c=r.clone();caches.open(C).then(x=>x.put(e.request,c))}return r}).catch(()=>caches.match(e.request,{ignoreSearch:true})))});
