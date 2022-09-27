export function StoreGeojson({ commit }, geojson) {
  if (process.env.DEV)
    console.log(!geojson.custom, " StoreGeojson action ", geojson);
  commit("geojson", geojson);
  if (!geojson.custom) {
    commit("standardgeojson", geojson);
  }
}
