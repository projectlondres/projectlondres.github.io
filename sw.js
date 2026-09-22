/* Project Londres — hors connexion */
var V="pl-v4-1",CORE=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(V).then(function(c){return c.addAll(CORE);}).then(function(){return self.skipWaiting();}));});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==V;}).map(function(x){return caches.delete(x);}));}).then(function(){return self.clients.claim();}));});
self.addEventListener("fetch",function(e){var u=new URL(e.request.url);
 if(e.request.method!=="GET"||u.origin!==location.origin)return;
 e.respondWith(fetch(e.request).then(function(r){var c=r.clone();caches.open(V).then(function(ca){ca.put(e.request,c);});return r;}).catch(function(){return caches.match(e.request).then(function(r){return r||caches.match("index.html");});}));});
