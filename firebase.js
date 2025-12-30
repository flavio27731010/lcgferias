import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  initializeFirestore,
  persistentLocalCache,
  onSnapshotsInSync
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "feriaslcg.firebaseapp.com",
  projectId: "feriaslcg",
  storageBucket: "feriaslcg.appspot.com",
  messagingSenderId: "SEU_ID",
  appId: "SEU_APP_ID"
};

const app = initializeApp(firebaseConfig);

const db = initializeFirestore(app, {
  localCache: persistentLocalCache()
});

window.db = db;

console.log("🔥 Firebase conectado");
console.log("📴 Firestore Offline Sync ativo");

window.addEventListener("DOMContentLoaded", () => {
  const el = document.getElementById("status-connection");

  const set = (c, t) => {
    el.className = "status " + c;
    el.textContent = t;
  };

  set(navigator.onLine ? "online" : "offline",
      navigator.onLine ? "🟢 Online" : "🔴 Offline");

  window.addEventListener("online", () => set("online", "🟢 Online"));
  window.addEventListener("offline", () => set("offline", "🔴 Offline"));

  onSnapshotsInSync(db, () => {
    if (navigator.onLine) set("online", "🟢 Sincronizado");
    else set("sync", "🟡 Dados locais");
  });
});
