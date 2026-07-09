import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import fs from "fs";

const serviceAccount = JSON.parse(
  fs.readFileSync("./serviceAccountKey.json", "utf8")
);

const vehicles = JSON.parse(
  fs.readFileSync("./vehicle_models.json", "utf8")
);

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

async function uploadVehicles() {
  console.log(`Uploading ${vehicles.length} vehicles...`);

  for (const vehicle of vehicles) {
    await db.collection("vehicle_models").doc(vehicle.id).set(vehicle);
    console.log(`✅ ${vehicle.brand} - ${vehicle.name}`);
  }

  console.log("🎉 Upload Complete!");
}

uploadVehicles().catch(console.error);