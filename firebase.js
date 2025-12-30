import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  initializeFirestore,
  persistentLocalCache,
  onSnapshotsInSync
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* ================= CONFIG ================= */
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "feriaslcg.firebaseapp.com",
  projectId: "feriaslcg",
  storageBucket: "feriaslcg.appspot.com",
  messagingSenderId: "SEU_ID",
  appId: "SEU_APP_ID"
};

/* ================= INIT ================= */
const app = initializeApp(firebaseConfig);

/* ================= FIRESTORE (NOVO MODELO) ================= */
const db = initializeFirestore(app, {
  localCache: persistentLocalCache()
});

/* 🔓 DISPONIBILIZA GLOBALMENTE */
window.db = db;

console.log("🔥 Firebase conectado com sucesso");
console.log("📴 Firestore Offline Sync ATIVO (novo modelo)");

/* ================= INDICADOR VISUAL ================= */
window.addEventListener("DOMContentLoaded", () => {

  let statusEl = document.getElementById("status-connection");

  if (!statusEl) {
    statusEl = document.createElement("div");
    statusEl.id = "status-connection";
    statusEl.className = "status online";
    statusEl.textContent = "🟢 Online";
    document.body.appendChild(statusEl);
  }

  function setStatus(type, text) {
    statusEl.className = `status ${type}`;
    statusEl.textContent = text;
  }

  setStatus(
    navigator.onLine ? "online" : "offline",
    navigator.onLine ? "🟢 Online" : "🔴 Offline"
  );

  window.addEventListener("online", () => {
    setStatus("online", "🟢 Online");
  });

  window.addEventListener("offline", () => {
    setStatus("offline", "🔴 Offline");
  });

  onSnapshotsInSync(db, () => {
    if (navigator.onLine) {
      setStatus("online", "🟢 Sincronizado");
    } else {
      setStatus("sync", "🟡 Dados locais");
    }
  });

});
