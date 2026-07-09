import { initializeApp, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import fs from 'fs'

const serviceAccount = JSON.parse(
  fs.readFileSync('./serviceAccountKey.json', 'utf8')
)

initializeApp({
  credential: cert(serviceAccount)
})

const db = getFirestore()

const generations = JSON.parse(
  fs.readFileSync('./vehicle_generations.json', 'utf8')
)

async function run() {
  console.log(`Importing ${generations.length} generations...`)

  for (const generation of generations) {
    await db
      .collection('vehicle_generations')
      .doc(generation.id)
      .set(generation)

    console.log(`✔ ${generation.displayName}`)
  }

  console.log('✅ Import complete!')
}

run().catch(console.error)