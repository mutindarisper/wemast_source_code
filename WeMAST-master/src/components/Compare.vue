<template>
  <q-card class="options-card">
    <!-- {{ CompareSelections }} -->
    <div class="bg-grey-1">
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
      <div class="q-pa-xs row">
        <div class="q-ml-md">
          <q-radio
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
            val="time"
            @input="handleRadioSelection"
          />
          <br />
          <label class="">{{ $t("time") }}</label>
        </div>
      </div>
    </div>
    <!-- year and season selection  -->
    <div
      class="card_selections q-pa-xs q-pb-sm"
      v-if="radio_selection === 'time'"
    >
      <div class="q-pa-sm q-ml-md compare_selections">
        <label class="text-weight-bold">{{ $t("wemast_select_year") }}</label>
        <q-select
          dense
          outlined
          rounded
          v-model="year"
          :options="years"
          @input="handleYear"
          :options-dense="true"
          class="select"
        />
      </div>
      <div class="q-pa-sm q-ml-md compare_selections" v-if="hasSeason">
        <label class="text-weight-bold">{{ $t("wemast_select_season") }}</label>
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
      </div>
      <div class="q-pa-sm q-ml-md">
        <q-btn
          unelevated
          rounded
          color="primary"
          class="select"
          label="Compare"
          @click="handleCompareEmit"
        />
      </div>
    </div>
    <!-- parameters selections -->
    <div
      class="card_selections q-pa-xs q-pb-sm"
      v-if="radio_selection === 'parameters'"
    >
      <div class="q-pa-sm q-ml-md compare_selections">
        <label class="text-weight-bold" v-if="indicator.value != 'ancillary'">{{
          $t("wemast_select_indicator")
        }}</label>

        <label class="text-weight-bold" v-if="indicator.value === 'ancillary'"
          >Select ancillary Data</label
        >
        <q-select
          dense
          outlined
          rounded
          @input="handleIndicator"
          v-model="indicator"
          :options="indicators"
          :options-dense="true"
          class="select"
        />
      </div>
      <div class="q-pa-sm q-ml-md compare_selections">
        <label class="text-weight-bold" v-if="indicator.value != 'ancillary'"
          >{{ $t("wemast_select_subindicator") }}
        </label>
        <label class="text-weight-bold" v-if="indicator.value === 'ancillary'"
          >Select Data
        </label>
        <q-select
          dense
          outlined
          rounded
          v-model="sub_indicator"
          :options="sub_indicators"
          @input="handleSubIndicator"
          :options-dense="true"
          class="select"
        />
      </div>

      <div class="q-pa-sm q-ml-md compare_selections" v-if="hasParameter">
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
          class="select"
        />
      </div>
    </div>
  </q-card>
</template>

<script>
import { selectYearByData, selectSeasonByData } from "src/Services/YearFilter";
import { parameterSelections } from "src/Services/ParameterSelections";

export default {
  data() {
    return {
      radio_selection: "parameters",
      indicator: "", //holds the selected indicator
      sub_indicator: null, //holds the selected sub_indicator
      year: null, //holds the selected year
      season: null, //holds the selected year
      parameter: null, //
      has_seasons: [
        "ndvi",
        "ndwi",
        "gndvi",
        "ndti",
        "smi",
        "spi",
        "nssdi",
        "wwpi"
      ]
    };
  },
  computed: {
    seasons() {
      return selectSeasonByData({
        store_structure: this.UserSelections?.store_structure,
        UserSelections: this.CompareSelections
      });
      // return [
      //   { label: this.$t("dryseason"), value: "dryseason" },
      //   { label: this.$t("wetseason"), value: "wetseason" }
      // ];
    },
    indicators() {
      return [
        { label: this.$t("exposure"), value: "exposure" },
        { label: this.$t("sensitivity"), value: "sensitivity" },
        { label: this.$t("resiliance"), value: "resiliance" },
        { label: this.$t("Ancillary Data"), value: "ancillary" }
      ];
    },
    sub_indicators() {
      if (this.indicator?.value === "exposure")
        return [
          { label: this.$t("land_cover"), value: "lulc" },
          { label: "Vegetation Cover", value: "ndvi" },
          { label: this.$t("wetland_inventory"), value: "wetland_inventory" }
        ];
      if (this.indicator?.value === "sensitivity")
        return [
          { label: this.$t("water_quality"), value: "water_quality" },
          {
            label: this.$t("soil_moisture_index"),
            value: "smi"
          },
          { label: this.$t("water_extent"), value: "water_extent" }
        ];
      if (this.indicator?.value === "resiliance")
        return [
          { label: this.$t("burnt_area"), value: "burnt_area" },
          { label: "Prec Index", value: "spi" },
          { label: this.$t("Undulation"), value: "twi" }
        ];
      if (this.indicator?.value === "ancillary")
        return [{ label: this.$t("Rainfall"), value: "rainfall" }];
    },
    parameters() {
      const parameters = parameterSelections(this.sub_indicator?.value);
      return parameters;
    },
    years() {
      if (!this.UserSelections?.store_structure) return;
      return selectYearByData({
        store_structure: this.UserSelections?.store_structure,
        UserSelections: this.CompareSelections
      });
    },
    UserSelections() {
      return this.$store.getters["WemastSelections/getUserSelections"];
    },
    CompareSelections() {
      return this.$store.getters["WemastSelections/getCompareSelections"];
    },
    hasParameter() {
      if (this.sub_indicator?.value === "wetland_inventory") return true;
      if (this.sub_indicator?.value === "water_quality") return true;
      return false;
    },
    hasSeason() {
      if (this.has_seasons.includes(this.sub_indicator?.value)) return true;
      if (this.has_seasons.includes(this.parameter?.value)) return true;

      return false;
    }
  },
  mounted() {
    this.$store.dispatch("WemastSelections/handleCompareSelections", {
      clear_compare: "false"
    });
  },
  beforeDestroy() {
    let selection = {};
    Object.keys(this.CompareSelections).forEach(key => {
      selection[key] = null;
    });
    this.$store.dispatch("WemastSelections/handleCompareSelections", {
      clear_compare: true,
      ...selection
    });
  },
  methods: {
    close_card() {
      this.$emit("close_card", true);
    },
    handleRadioSelection(selection) {
      if (selection === "time") {
        this.year = null; //holds the selected year
        this.season = null;

        this.handleYear(null);
        this.handleSeason({ value: null });
      } else {
        this.parameter = "";
        this.sub_indicator = "";
      }
    },
    handleIndicator(selection) {
      this.$store.dispatch("WemastSelections/handleCompareSelections", {
        indicator: selection.value
      });
      if (selection.value === "rainfall")
        this.$store.dispatch("WemastSelections/handleCompareSelections", {
          subindicator: selection.value,
          sub_indicator: selection.value,
          subindicator_name: selection.label
        });
      this.sub_indicator = null;
    },
    handleSubIndicator(selection) {
      this.$store.dispatch("WemastSelections/handleCompareSelections", {
        subindicator: selection.value
      });
    },
    handleYear(selection) {
      this.$store.dispatch("WemastSelections/handleCompareSelections", {
        year: selection
      });
    },
    handleSeason(selection) {
      this.$store.dispatch("WemastSelections/handleCompareSelections", {
        season: selection.value
      });
    },
    handleParameter(selection) {
      this.$store.dispatch("WemastSelections/handleCompareSelections", {
        subindicator: selection.value
      });
    },
    handleCompareEmit() {
      this.$emit("handleCompareEmit", true);
    }
  }
};
</script>

<style scoped>
.select {
  width: 203px;
  height: 39px;
}
.compare_selections >>> .q-field--auto-height .q-field__native {
  justify-content: center;
}
</style>
