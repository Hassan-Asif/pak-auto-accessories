import { defineStore } from 'pinia'
import {
  collection,
  getDocs,
  query,
  where
} from 'firebase/firestore'

import { db } from '../firebase/config'

export const useVehicleStore = defineStore('vehicles', {
  state: () => ({
    makes: [],
    models: [],
    years: [],

    selectedMake: '',
    selectedModel: '',
    selectedYear: '',

    loading: false
  }),

  actions: {
    async loadMakes() {
  this.loading = true

  try {
    const snap = await getDocs(collection(db, 'vehicle_models'))

    console.log("Vehicle Models:", snap.size)

    console.log(
      snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
    )

    const brands = [...new Set(
      snap.docs.map(doc => doc.data().brand)
    )]

    console.log("Brands:", brands)

    this.makes = brands.sort()

  } catch (err) {
    console.error(err)
  }

  this.loading = false
},

    async loadModels(make) {
      this.selectedMake = make
      this.selectedModel = ''
      this.selectedYear = ''
      this.years = []

      const snap = await getDocs(
        query(
          collection(db, 'vehicle_models'),
          where('brand', '==', make)
        )
      )

      this.models = snap.docs
        .map(doc => doc.data())
        .sort((a, b) => a.name.localeCompare(b.name))
    },

    async loadYears(model) {
      this.selectedModel = model
      this.selectedYear = ''

      const snap = await getDocs(
        query(
          collection(db, 'vehicle_generations'),
          where('brand', '==', this.selectedMake),
          where('model', '==', model)
        )
      )

      this.years = snap.docs
        .map(doc => doc.data())
        .sort((a, b) => a.year.localeCompare(b.year))
    },

    selectYear(year) {
      this.selectedYear = year
    }
  }
})