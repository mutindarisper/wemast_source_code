<template>
  <div class="row q-pb-md q-mb-xs" style="background-color: #ddd; position: relative; top: -0.4vh;">
    <div class="WeMast_Options_selections q-pa-xs">
      <label  class="text-weight-bold">{{ $t("wemast_select_region") }}</label>
      <q-select
        dense
        outlined
        rounded
        v-model="region"
        :options="regions"
        @input="handleRegion"
        :options-dense="true"
        style="width: 130px"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey"> No results </q-item-section>
          </q-item>
        </template>
      </q-select>
    </div>
    <div class="WeMast_Options_selections q-pa-xs">
      <label class="text-weight-bold">{{
        $t("wemast_select_indicator")
      }}</label>
      <q-select
        dense
        outlined
        rounded
        @input="handleIndicator"
        v-model="indicator"
        :options="this.indicators_list"
        :options-dense="true"
      />
    </div>

    <div class="q-pa-xs WeMast_Options_selections">
      <label class="text-weight-bold">{{
        $t("wemast_select_subindicator")
      }}</label>
      <q-select
        dense
        outlined
        rounded
        v-model="sub_indicator"
        :options="this.sub_indicators_list"
        @input="handleSubIndicator"
        :options-dense="true"
        style="width: 180px"
      />
    </div>

    <div class="q-pa-xs WeMast_Options_selections" v-if="hasParameter">
      <label class="text-weight-bold">{{
        $t("wemast_select_parameter")
      }}</label>
      <q-select
        dense
        outlined
        rounded
        v-model="parameter"
        :options="parameters"
        @input="handleParameter"
        :options-dense="true"
      />
    </div>

    <div class="q-pa-xs WeMast_Options_selections">
      <label class="text-weight-bold">{{ $t("wemast_select_year") }}</label>
      <q-select
        dense
        rounded
        outlined
        v-model="year"
        @input="handleYear"
        :options="this.year_list"
        :options-dense="true"
        style="width: 130px"
      />
    </div>

    <div
      class="q-pa-xs WeMast_Options_selections justify-center"
      v-if="hasSeason"
    >
      <label class="text-weight-bold">{{ $t("wemast_select_season") }}</label>
      <q-select
        dense
        outlined
        rounded
        v-model="season"
        :options="seasons"
        @input="handleSeason"
        :options-dense="true"
        style="width: 130px"
      >
      </q-select>
    </div>
    <div class="q-pa-xs" style="margin-top: 20px">
      <q-btn
        unelevated
        rounded
        color="primary"
        style="height: 40px"
        @click="handleRequest"
        label="Request"
      />
    </div>

  


  </div>
</template>

<script>
   var wemast_base_url = 'http://169.1.31.169'
import { negative } from "src/Services/Notifications";
import { parameterSelections } from "src/Services/ParameterSelections";
import { selectYearByData, selectSeasonByData } from "src/Services/YearFilter";

export default {
  data() {
    return {
      language: null, //holds the selected language
      region: null, //holds the selected region
      indicator: null, //holds the selected indicator
      indicators_list:[],
      sub_indicator: null, //holds the selected sub_indicator,
      sub_indicators_list:[],
      year: null, //holds the selected year,
      year_list:[],
      season: null, //holds the selected year
      region_list: [],
      regions: null,
      parameter: null, //
      has_seasons: [
        "ndvi",
        "ndwi",
        "gndvi",
        "ndti",
        "smi",
        "spi",
        "nssdi",
        "wwpi",
      ],
      store_structure: null, //
      indicators: null
    };
  },
  computed: {
    seasons() {
     return selectSeasonByData({
        store_structure: this.UserSelections?.store_structure,
        UserSelections: this.UserSelections
      })
  
    },
    indicators() {
      // return [
      //   { label: this.$t("exposure"), value: "exposure" },
      //   { label: this.$t("sensitivity"), value: "sensitivity" },
      //   { label: this.$t("resiliance"), value: "resiliance" },
      //   // { label: this.$t("air_quality"), value: "air_quality"}
      
      // ];

    
    },
    sub_indicators() {
      // if (this.indicator?.value === "exposure")
      //   return [
      //     { label: this.$t("land_cover"), value: "lulc" },
      //     { label: "Vegetation Cover", value: "ndvi" },
      //     { label: this.$t("wetland_inventory"), value: "wetland_inventory" }
      //   ];
      // if (this.indicator?.value === "sensitivity")
      //   return [
      //     { label: this.$t("water_quality"), value: "water_quality" },
      //     {
      //       label: this.$t("soil_moisture_index"),
      //       value: "smi"
      //     }
      //   ];
      // if (this.indicator?.value === "resiliance")
      //   return [
      //     { label: this.$t("burnt_area"), value: "burntarea", disable: false },
      //     { label: "Prec Index", value: "spi" },
      //     { label: this.$t("Undulation"), value: "twi" }
      //   ];
      //   if (this.indicator?.value === "air_quality")
      //   return [
      //     { label: this.$t("nitrogen_dioxide"), value: "nitrogen_dioxide", disable: false },
      //     { label: "Sulphur Dioxide", value: "sulphur_dioxide" },
      //     { label: this.$t("carbon_monoxide"), value: "carbon_monoxide" }
      //   ];
        
    },
    parameters() {
      const parameters = parameterSelections(this.sub_indicator?.value);
      return parameters;
    },
    years() {
      if (!this.store_structure) return;
      return selectYearByData({
        store_structure: this.UserSelections?.store_structure,
        UserSelections: this.UserSelections
      });
    },
    UserSelections() {
      return this.$store.getters["WemastSelections/getUserSelections"];
    },
    hasParameter() {
      if (this.sub_indicator?.value === "wetland_inventory") return true;
      if (this.sub_indicator?.value === "water_quality") return true;
      return false;
    },
    hasSeason() {
      console.log(this.has_seasons, 'has seasons')
      if (this.has_seasons.includes(this.sub_indicator?.value)) return true;
      if (this.has_seasons.includes(this.parameter?.value)) return true;

      return false;
    },
    selectedGeojson() {
      return this.$store.getters["Geojson/getGeojson"];
    }
  },
  watch: {
    UserSelections: {
      deep: true,

      handler(val) {
        if (val?.clear_main_selection_region) {
          this.region = null;
        } else this.region = val?.region?.label;
      }
    }
  },
  async mounted() {
     await this.getStoreStructure();
    await this.getRegions();
   
    this.$store.dispatch("WemastSelections/handleUserSelections", {
      has_seasons: this.has_seasons
    });
  },
  methods: {


 
    async getStoreStructure() {
      try {
        const response = await this.$axios.post(
          // 'http://169.1.31.169/wemast-api-back-end-0.1/api/dataserver/getdatastorestructure',
          
          // `${wemast_base_url }/wemast-api-back-end-0.1/api/dataserver/getdatastorestructure`,
          'http://149.248.57.97:8700/wemast-api-back-end-0.2/api/dataserver/getdatastorestructure/',

          // {
          //   headers: {
          //     sdf09rt2s: "locateit"
          //   }
          // }
        );
        // console.log(response.data, 'get store response data')
        this.store_structure = response?.data?.indicators;
        console.log(this.store_structure, 'store structure ')
        this.$store.dispatch("WemastSelections/handleUserSelections", {
          store_structure: this.store_structure,
          timeseries:response?.data?.timeseries
        });
      } catch (error) {
        negative("Error getting store structure");
      }
    },
    async getRegions() {
      try {
        const response = await this.$axios.get(
          // 'http://169.1.31.169/wemast-api-back-end-0.1/api/regions/category/1',
          'http://149.248.57.97:8700/wemast-api-back-end-0.2/api/regions/category1/',
        
          // `${wemast_base_url }/wemast-api-back-end-0.1/api/regions/category/1`,

          // {
          //   // headers: {
          //   //   sdf09rt2s: "locateit"
          //   // }
          // }
        );
        if (process.env.DEV) console.log("regions response ", response.data);
        this.region_list = response.data;
        
        const region_dropdown_list = await this.region_list.map(region => {
          // console.log(region.features[0].properties.name, 'region')
          return {
            value: region.code,
            label: region.name
            // region_name: region.name   test
          };
        });
        this.regions = region_dropdown_list;
        this.handleSetDefault();
      } catch (error) {
        if (process.env.DEV) console.log("boundaries error ", error);
      }
    },
    handleRegion(selection) {
      if (this.UserSelections?.clear_main_selection_region) {
        this.region = null;
        return negative(
          "Clear advanced filter to continue basin analysis",
          2000
        );
      }
      this.$store.dispatch("WemastSelections/handleUserSelections", {
        region: selection 
      });
      this.$store.dispatch("WemastSelections/handleUserSelections", { //for the advanced filter component
        country: "",           //not
        wetland: "",          //defined
        close_advanced: true           //elsewhere
      });
      const selected_region = this.region_list.filter(region => {
        // console.log(selected_region, 'selected region')
        return region.code === selection.value;
      });
      if (process.env.DEV)
        console.log("selected region", selected_region[0]?.geom);
        
      this.$store.dispatch("Geojson/StoreGeojson", {
        geojson: selected_region[0]?.geom, //geometry of the selected region
        region: selection
      });
    },
    // http://149.248.57.97:8700/wemast-api-back-end-0.2/api/dataserver/productinfo/
   async handleIndicator(selection) {
      try {

        const response = await this.$axios.get(
          // 'http://169.1.31.169/wemast-api-back-end-0.1/api/regions/category/1',
          'http://149.248.57.97:8700/wemast-api-back-end-0.2/api/dataserver/productinfo/',
        
          // `${wemast_base_url }/wemast-api-back-end-0.1/api/regions/category/1`,

          // {
          //   // headers: {
          //   //   sdf09rt2s: "locateit"
          //   // }
          // }handleRequest
        );

        var indicator_list = response.data.indicators
        console.log(indicator_list, 'indicator list')
      this.indicators_list =  indicator_list
      console.log(this.indicators_list, 'this indicators list')

      this.indicators = response.data.indicators
      console.log(this.indicators, 'this.indicators ')

      var selected_indicator = selection
      console.log(selected_indicator, 'selected indicator ')
      this.indicator = selected_indicator
      

      window.indicator = selected_indicator

      console.log( window.indicator, 'global indicator')
      


      //update the store with selected indicator

            this.$store.dispatch("WemastSelections/handleUserSelections", {
        indicator: selected_indicator //selected indicator
      });

      this.sub_indicator = null; //selected subindicator
      this.parameter = null;
    
      this.handleSubIndicator({ value: null });


      // console.log(this.indicators_list.indicators , 'this.indicators_list')
      return this.indicators_list
        
        
      } catch (error) {
        console.log('error')
        
      }

      // this.$store.dispatch("WemastSelections/handleUserSelections", {
      //   indicator: selection.value //selected indicator
      // });
      // this.sub_indicator = null; //selected subindicator
      // this.parameter = null;
    
      // this.handleSubIndicator({ value: null });
    },
    
   async handleSubIndicator(selection) { //
      try {
        // var selected_indicator =  window.indicator 
        console.log(window.indicator , 'indicator in subindicator fn')

const response = await this.$axios.get(
  // 'http://169.1.31.169/wemast-api-back-end-0.1/api/regions/category/1',
  'http://149.248.57.97:8700/wemast-api-back-end-0.2/api/dataserver/productinfo/?get_sub_indicators=Exposure',

  // `${wemast_base_url }/wemast-api-back-end-0.1/api/regions/category/1`,

  // {
  //   // headers: {
  //   //   sdf09rt2s: "locateit"
  //   // }
  // }
);

var sub_indicator_list = response.data.sub_indicators
console.log(sub_indicator_list, 'sub indicator list')
this.sub_indicators_list = sub_indicator_list

var selected_sub_indicator = selection
console.log(selected_sub_indicator, 'selected  sub indicator ')
this.sub_indicator = selected_sub_indicator
console.log(this.sub_indicator , 'this.sub indicator')
// return this.indicator_list


this.$store.dispatch("WemastSelections/handleUserSelections", {
        subindicator: selected_sub_indicator,
        sub_indicator: selected_sub_indicator,
        subindicator_name: selection.label //supposed to be the parameter name
      });
      this.year = null;
      this.season = null;
      this.parameter = null;
      this.handleYear(null);
      this.handleSeason({ value: null });


} catch (error) {
console.log('error')

}
      // this.$store.dispatch("WemastSelections/handleUserSelections", {
      //   subindicator: selection.value,
      //   sub_indicator: selection.value,
      //   subindicator_name: selection.label
      // });
      // this.year = null;
      // this.season = null;
      // this.parameter = null;
      // this.handleYear(null);
      // this.handleSeason({ value: null });
    },
    handleParameter(selection) {
      this.year = null;
      this.season = null;
      this.handleYear(null);
      this.handleSeason({ value: null });
      this.$store.dispatch("WemastSelections/handleUserSelections", {
        subindicator: selection.value,
        subindicator_name: selection.label
      });
    },
   async handleYear(selection) { //


      try {
        // var selected_indicator =  window.indicator 
        console.log(window.indicator , 'indicator in subindicator fn')

const response = await this.$axios.get(
  // 'http://169.1.31.169/wemast-api-back-end-0.1/api/regions/category/1',
  'http://149.248.57.97:8700/wemast-api-back-end-0.2/api/dataserver/getproductinfo_years/?indicator=Exposure&sub_indicator=Land%20Cover',

  // `${wemast_base_url }/wemast-api-back-end-0.1/api/regions/category/1`,

  // {
  //   // headers: {
  //   //   sdf09rt2s: "locateit"
  //   // }
  // }
);

var year_list = response.data.years
console.log(year_list, 'year list')
this.year_list = year_list

var selected_year = selection
console.log(selected_year, 'selected year ')
this.year = selected_year
console.log(this.year , 'this. year')

this.$store.dispatch("WemastSelections/handleUserSelections", {
        year: selected_year 
      });
      this.season = null


} catch (error) {
console.log('error')

}

      // this.$store.dispatch("WemastSelections/handleUserSelections", {
      //   year: selected_year 
      // });
      // this.season = null
    },
    handleSeason(selection) {
      this.$store.dispatch("WemastSelections/handleUserSelections", {
        season: selection.value
      });
    },
    handleRequest() {
      this.$emit("handleRequest", true);
    },
    async handleSetDefault() { //parameters that load on site load
      this.region = this.regions[0];
      console.log(this.regions, 'list of regions')
      await this.handleRegion(this.region);


      console.log(this.indicators, 'DEFAULT this.indicators')

      this.indicator = this.indicators_list[0];
      // console.log(this.indicators_list, 'list of indicators')
      console.log(this.indicator, 'indicator first')
      await this.handleIndicator(this.indicator);

      this.sub_indicator = this.sub_indicators_list[0];
      await this.handleSubIndicator(this.sub_indicator);

      


      this.year = await selectYearByData({
        store_structure: this.UserSelections?.store_structure,
        UserSelections: this.UserSelections
      })[0];

      this.year = this.year_list[0];
      await this.handleYear(this.year)

      // this.handleYear(this.year);
      this.handleRequest()
    }
  }
};
</script>

<style scoped>
.WeMast_Options_selections >>> .q-field__control {
  background-color: white;
}
.q-select {
  width: 165px;
}
.WeMast_Options_selections >>> .q-field--auto-height .q-field__native {
  justify-content: center;
}
@media screen and (min-width: 1920px) {
  .q-select {
    width: 180px;
  }
}
</style>
