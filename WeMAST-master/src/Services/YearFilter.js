export const selectYearByData = ({ store_structure, UserSelections }) => {
  let years = [];
  Object.keys(store_structure).forEach(key => {
    let indicator_key = key.split("_")[0];
    if (UserSelections?.subindicator === indicator_key) {
      years = new Set([...years, ...store_structure[key]]);
    }
  });
  // console.log(years, 'year list')
  return Array.from(years)
    .sort()
    .reverse();
   
};

export const selectSeasonByData = ({ store_structure, UserSelections }) => {
  if (process.env.DEV)
    console.log("UserSelections  selectSeasonByData", UserSelections);
  if (!UserSelections.year) return;
  if (process.env.DEV)
    console.log("UserSelections  selectSeasonByData 17", UserSelections);
  let seasons = [];
  Object.keys(store_structure).forEach(key => {
    if (key.startsWith(UserSelections.subindicator)) {
      if (store_structure[key].includes(UserSelections.year)) {
        if (
          key.split("_")[1] === "dryseason" &&
          !seasons.find(item => item.label === "Dry")
        )
          seasons.push({
            label: "Dry",
            value: "dryseason"
          });
        if (
          key.split("_")[1] === "wetseason" &&
          !seasons.find(item => item.label === "Wet")
        )
          seasons.push({
            label: "Wet",
            value: "wetseason"
          });
      }
    }
  });
  return seasons;
};
