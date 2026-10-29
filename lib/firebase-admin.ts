import "server-only";
import { cert, getApps, initializeApp, type ServiceAccount } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

export function getEmailDatabase() {
  const existing = getApps().find(app => app.name === "dpd-marketing");
  if (existing) return getFirestore(existing);
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (!raw) throw new Error("Firebase email storage is not configured.");
  const account = JSON.parse(raw);
  if (account.project_id !== "dpding-22b5b") throw new Error("Unexpected Firebase project.");
  return getFirestore(initializeApp({ credential: cert(account as ServiceAccount) }, "dpd-marketing"));
}
