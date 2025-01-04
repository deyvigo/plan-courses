import { create } from 'zustand'

export const useDataStore = create((set) => ({
  data: [],
  setData: (data) => set({ data }),
  circles: [],
  setCircles: (circles) => set({ circles }),
  listTooltips: [],
  setListTooltips: (listTooltips) => set({ listTooltips }),
}))