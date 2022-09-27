import {i18n} from 'src/boot/i18n'
export const parameterSelections =(sub_indicator)=>{
  
    if (sub_indicator === "wetland_inventory")
    return [
      { label: i18n.t("Wetland Extent"), value: "ndwi" },

      {
        label: i18n.t("Wetland Status"),
        value: "wwpi"
      }
    ];

  if (sub_indicator === "water_quality")
    return [
      {
        label: i18n.t("Nitrogen Content"),
        value: "gndvi"
      },
      { label: "Turbidity", value: "ndti" },
      { label: "Sus Sediments ", value: "nssdi" }
    ];

    //flooding
    if (sub_indicator === "flooding")
    return[
      { label: "Undulation", value: "twi" }
    ];
}