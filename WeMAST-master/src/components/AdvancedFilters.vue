<template>
  <q-card class="options-card bg-white">
    <!-- {{ UserSelections }} -->
    <div class="row">
      <div class="col">
        <q-icon
          class="q-pa-xs float-right"
          size="20px"
          name="img:uiIcons/close.png"
          @click.stop="close_card"
        />
      </div>
    </div>
    <!-- select parameters or wetland -->
    <div class="q-pa-xs flex">
      <div class="q-ml-lg">
        <q-radio
        disable
          v-model="radio_selection"
          val="parameters"
          @input="handleRadioSelection"
        />
        <br />
        <label class="">{{ $t("parameters") }}</label>
      </div>
      <div class="q-ml-lg">
        <q-radio
          v-model="radio_selection"
          val="wetland"
          @input="handleRadioSelection"
        />
        <br />
        <label class="">{{ $t("Wetland") }}</label>
      </div>
    </div>
    <!-- wetland selections -->
    <div
      class="card_selections q-pa-xs q-pb-md"
      v-if="radio_selection === 'wetland'"
    >
      <div class="q-pa-sm q-ml-md advanced_selections">
        <label class="text-weight-bold">Select Country</label>
        <q-select
          dense
          outlined
          rounded
          v-model="country"
          :options="countries_list"
          @input="handleCountry"
          @filter="filterCountryFn"
         
          :options-dense="true"
          class="select"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey"> No results </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
      <div class="q-pa-sm q-ml-md advanced_selections">
        <label class="text-weight-bold">Select Wetland</label>
        <q-select
          dense
          outlined
          rounded
          v-model="wetland"
          :options="wetlands"
          @input="handleWetland"
          @filter="filterWetlandFn"
        
          :options-dense="true"
          class="select"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                {{ country_name }}
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>

      <div class="q-pa-sm q-ml-md advanced_selections">
        <label class="text-weight-bold">Select Platform</label>
        <q-select
          dense
          disable
          outlined
          rounded
          v-model="option"
          :options="options"
        
          :options-dense="true"
          class="select"
        />
      </div>
      <div class="q-pa-sm q-ml-md">
        <q-btn
          unelevated
          rounded
          @click="handleRequest"
          color="primary"
          class="select"
          label="Submit"
        />
      </div>
    </div>
    <div
      class="card_selections q-pa-xs q-pb-md"
      v-if="radio_selection === 'parameters'"
    >
      <div class="q-pa-sm q-ml-md advanced_selections" v-if="UserSelections.sub_indicator !=='burnt_area'" >
        <label class="text-weight-bold">Select Parameter</label>
        <q-select
        disable
          dense
          outlined
          rounded
          v-model="parameter"
          :options="parameters"
          @input="handleParameter"
          :options-dense="true"
          class="select"
        />
      </div>
     <div class="" v-if="UserSelections.sub_indicator==='burnt_area'"> 
         
        <BurntArea></BurntArea>
     </div>
      <!-- <div class="q-pa-sm q-ml-md" v-if="hasSeason">
        <label class="text-weight-bold">Select Season</label>
        <q-select
          dense
          outlined
          rounded
          v-model="season"
          :options="seasons"
          @input="handleSeason"
          :options-dense="true"
          class="select"
        />
      </div> -->
      <div class="q-pa-sm q-ml-md">
        <q-btn
          unelevated
          rounded
          @click="handleRequest"
          color="primary"
          class="select"
          label="Submit"
        />
      </div>
    </div>
  </q-card>
</template>

<script>
import { parameterSelections } from "src/Services/ParameterSelections";
export default {
  data() {
    return {
      radio_selection: "wetland",
      parameter: "",
      season: null, //holds the selected year
      options: ["Google", "Facebook", "Twitter", "Apple", "Oracle"],
      option: "",
      wetland: "",
      country: "",
      wetlands_list: [],
      countries_list: [],
      wetlands: null,
      countries: null
    };
  },
  components:{
    BurntArea: require('src/components/BurntAreaSelection').default,
  },
  computed: {
    country_name() {
      if (this.country) return `No results for ${this.country?.value?.name}`;
      return "No results";
    },
    UserSelections() {
      return this.$store.getters["WemastSelections/getUserSelections"];
    },
    parameters() {
      // if(!this.UserSelections?.subindicator) return
      const parameters = parameterSelections(
        this.UserSelections?.sub_indicator
      );
      return parameters;
    },
    seasons() {
      return [
        { label: this.$t("dryseason"), value: "dryseason" },
        { label: this.$t("wetseason"), value: "wetseason" }
      ];
    },
    hasSeason() {
      if (this.UserSelections?.has_seasons.includes(this.parameter?.value))
        return true;
      return false;
    }
  },
  watch: {
    UserSelections: {
      deep: true,
      immediate: true,
      handler(val) {
        if (val.close_advanced) return this.close_card();
        this.handlePopulate(this.UserSelections);
      }
    }
  },
  mounted() {
    this.getWetlands(
      `${this.$store.getters['settings/backend_api_url']}wemast-api-back-end-0.1/api/regions/category/2`
    );
    this.getCounties();
  },
  beforeDestroy() {
    this.$store.dispatch("WemastSelections/handleUserSelections", {
      clear_main_selection_region: false
    });
  },
  methods: {
    handleRadioSelection(selection) {},
    handlePopulate(val) {
      if (process.env.DEV) console.log("adbvancedfilter watcher ", val);
      this.wetland = val?.wetland;
      this.country = val?.country;
    },
    close_card() {
      this.$emit("close_card", true);
    },
    async getWetlands(url) {
      try {
        const response = await this.$axios.get(
          url,

          {
            headers: {
              sdf09rt2s: "locateit"
            }
          }
        );
        if (process.env.DEV) console.log("wetlands response ", response.data);
        this.wetlands_list = response.data;
      } catch (error) {
        if (process.env.DEV) console.log("wetlands error ", error);
      }
    },
    async getCounties() {
      try {
        const response = await this.$axios.get(
          `${this.$store.getters['settings/backend_api_url']}wemast-api-back-end-0.1/api/boundaries/1/sublevel`,

          {
            headers: {
              sdf09rt2s: "locateit"
            }
          }
        );
        if (process.env.DEV) console.log("countries response ", response.data);
        this.countries_list = response?.data?.map(country => {
          return {
            value: country,
            label: country.name
          };
        });
      } catch (error) {
        if (process.env.DEV) console.log("countries error ", error);
      }
    },
    filterWetlandFn(val, update, abort) {
      setTimeout(() => {
        update(async () => {
          const wetlands_dropdown_list = this.wetlands_list.map(wetland => {
            return {
              value: wetland.code,
              label: wetland.name
            };
          });
          this.wetlands = wetlands_dropdown_list;
        });
      }, 2000);
    },
    filterCountryFn(val, update, abort) {
      if (this.countries !== null) {
        update();
        return;
      }

      setTimeout(() => {
        update(async () => {
          const countries_dropdown_list = this.countries_list.map(wetland => {
            return {
              value: wetland.code,
              label: wetland.name
            };
          });
          this.countries = countries_dropdown_list;
        });
      }, 2000);
    },
    handleWetland(selection) {
      this.$store.dispatch("WemastSelections/handleUserSelections", {
        region: selection
      });
      this.$store.dispatch("WemastSelections/handleUserSelections", {
        wetland: selection
      });
      const selected_wetland = this.wetlands_list.filter(wetland => {
        return wetland.code === selection.value;
      });
      this.$store.dispatch("Geojson/StoreGeojson", {
        geojson: selected_wetland[0]?.geom,
        region: selection
      });
    },
    handleCountry(val) {
      this.wetlands = null;
      this.wetland = "";
      this.$store.dispatch("WemastSelections/handleUserSelections", {
        clear_main_selection_region: true
      });
      if (!val) {
        this.getWetlands(
          `${this.$store.getters['settings/backend_api_url']}wemast-api-back-end-0.1/api/regions/category/2`
        );
        return;
      }
      this.getWetlands(
        `${this.$store.getters['settings/backend_api_url']}wemast-api-back-end-0.1/api/regions/category/2/zone/${val.value.id}`
      );
      this.$store.dispatch("WemastSelections/handleUserSelections", {
        country: val
      });
      this.$store.dispatch("Geojson/StoreGeojson", {
        geojson: val.value.geom
      });
    },
    handleRequest() {
      this.$emit("handleRequest", true);
    },
    handleParameter(selection) {
      this.$store.dispatch("WemastSelections/handleUserSelections", {
        subindicator: selection.value
      });
    },
    handleSeason(selection) {
      this.$store.dispatch("WemastSelections/handleUserSelections", {
        season: selection.value
      });
    }
  }
};
</script>

<style scoped>
.select {
  width: 203px;
  height: 39px;
}
.advanced_selections >>> .q-field--auto-height .q-field__native {
  justify-content: center;
}
</style>
