<template>
  <div>
    <DashboardNav
      @show_search_input="handleShowSearch"
      @show_login_form="handleShowLoginForm"
      @handleRequest="handleRequest"
    />
    <Login v-if="show_login_form" />
    <!-- {{ opacity_value }} || {{ UserSelections }} || {{ CompareSelections }} ||
    clear_compare
    {{ clear_compare }} -->

    <div class="col-md  WeMast_top_logos" id="logos" style="height:20px;">
        <MainNavLogos class="" />
      </div>

    <div class="mapwrap">
      <div id="more_options">
        <div class="more_options_group">
          <div
            class="filters"
            @click="handleMoreOptionsClicked('filter')"
            :style="
              more_options_selected === `filter`
                ? ` border-left: 35px solid steelblue;`
                : ``
            "
          >
            <p style="white-space: nowrap; caret-color: transparent">
              {{ $t("advanced_filter") }}
            </p>
            <div class="q-pa-none" v-if="more_options_selected === `filter`">
              <AdvancedFilters
                @close_card="close_card"
                @handleRequest="handleRequest"
              />
            </div>
          </div>
          <div
            class="compare"
            @click="handleMoreOptionsClicked('compare')"
            :style="
              more_options_selected === `compare`
                ? ` border-left: 35px solid steelblue;`
                : ``
            "
          >
            <p>{{ $t("compare") }}</p>
            <div class="q-pa-none" v-if="more_options_selected === `compare`">
              <Compare
                @close_card="close_card"
                @handleCompareEmit="handleCompareEmit"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="mapContainer"></div>
    <SideNavLeaflet />
    <div id="sidenav" class="sidenav bg-white">
      <div id="mySidenav" style="height: 100%">
        <div id="protrusion" class="bg-white protrusion">
          <div @click.stop="toggle_nav">
            <img id="close" src="uiIcons/drawer.svg" v-if="!show_sidenav" />
            <img id="open" src="uiIcons/drawer.svg" v-if="show_sidenav" />
          </div>
        </div>
        <div class="sidenav_body" v-if="!show_sidenav">
          <div class="row">
            <div class="col-lg-8 offset-lg-2 col-md-10 offset-md-1">
              <div class="row" v-if="show_search">
                <div class="col-xs-6 offset-3">
                  <q-input dense outlined v-model="search" label="Search" />
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="q-pa-xs">
                    <div
                      class="text-weight-bolder text-h6"
                      @click="handleAnalysisMetaSwap('data_analysis')"
                      style="cursor: pointer"
                    >
                      <span
                        :class="
                          analysis_swap_toggle === 'data_analysis'
                            ? 'side_nav_swap'
                            : ''
                        "
                        >Data Analysis</span
                      >
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="q-pa-xs">
                    <div
                      class="text-weight-bolder text-h6"
                      @click="handleAnalysisMetaSwap('metadata')"
                      style="cursor: pointer"
                    >
                      <span
                        :class="
                          analysis_swap_toggle === 'metadata'
                            ? 'side_nav_swap'
                            : ''
                        "
                        >Metadata</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="analysis_swap_toggle === 'data_analysis'">
            <Summary v-if="metadata">
              <!-- {{ summary_text }} -->
              {{ metadata.description }}
            </Summary>
            <br />

            <div class="row" v-if="'stats' in stats">
              <div class="col-xs-8">
                <label class="text-bold" style="font-family: Montserrat">
                  {{ chart_title }}
                </label>
              </div>
              <div class="col">
                <div class="float-right">
                  <img
                    src="uiIcons/insert_photo-24px.svg"
                    style="height: 30px; cursor: pointer"
                    @click="download_chart('PieCanvas')"
                  />
                  <img
                    src="uiIcons/file_download-24px.svg"
                    style="height: 30px; cursor: pointer"
                    @click="downloadcsv()"
                  />
                </div>
              </div>
            </div>
            <PieChart
              :height="200"
              :width="200"
              :chart-id="`PieCanvas`"
              :Stats="stats"
              class="q-pt-md q-pb-md bg-grey-2 q-mb-sm q-pr-md"
            />

            <br />
            <div class="row" v-if="'stats' in stats">
              <div class="col-xs-8">
                <label class="text-bold" style="font-family: Montserrat">
                  {{ line_chart_title }}</label
                >
              </div>
              <div class="col">
                <div class="row float-right">
                  <!--  v-if="check_if_timeseries_data" -->
                  <q-btn
                    v-if="check_if_timeseries_data"
                    color="primary"
                    style="height: 23px; margin-top:4px;"
                    @click="getTimeseries"
                  >
                    <span class="material-icons" style="margin-bottom:16px;">
                      show_chart
                    </span>
                    <q-tooltip>Time Series</q-tooltip>
                  </q-btn>
                  <img
                    src="uiIcons/insert_photo-24px.svg"
                    style="height: 30px; cursor: pointer"
                    @click="download_chart('BarCanvas')"
                  />
                  <img
                    src="uiIcons/file_download-24px.svg"
                    style="height: 30px; cursor: pointer"
                    @click="downloadcsv()"
                  />
                </div>
              </div>
            </div>
            <BarChart
              v-if="!timeseries_stats"
              :Stats="stats"
              :height="250"
              :chart-id="`BarCanvas`"
              :width="180"
              class="q-pt-lg q-pr-lg bg-grey-2"
            />
            <LineChart
              v-if="timeseries_stats"
              :Stats="timeseries_data"
              :height="250"
              :chart-id="`BarCanvas`"
              :width="180"
              class="q-pt-lg q-pr-lg bg-grey-2"
            />
          </div>
          <div class="q-pa-none" v-if="analysis_swap_toggle === 'metadata'">
            <!-- {{ metadata }} -->
            <Metadata :metadata="metadata" />
          </div>
          <!-- <LineChart :height="250" :width="250" /> -->
          <!-- <div class="logos_container "> -->
          <div :class="sidenavlogos">
            <SideNavLogos />
          </div>
          <!-- alert to select polygon  -->
          <q-dialog v-model="alert">
            <q-card class="bg-primary">
              <q-card-section
                class="text-weight-bold text-white text-h6 text-center"
              >
                Time Series Alert
              </q-card-section>
              <q-card-section class="q-pt-xs text-weight-bold text-white">
                Please select a small polgygon and try again
              </q-card-section>

              <q-card-actions align="right">
                <q-btn flat label="OK" color="white" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </div>
      </div>
    </div>


    <!-- <form action='#' @submit="false;">
    <input type='file' id='fileinput'>
    <input type='button' id='btnLoad' value='Load' @click='loadFile()'>
</form>  -->
  </div>
</template>
<script>
  var wemast_base_url = 'http://169.1.31.169'
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "src/assets/map.css";
import { leaflet_custom_controls } from "src/CustomMapControls/LeafletCustomControls";
import { close_nav, open_nav } from "src/CustomMapControls/SideNavControls";
import "leaflet-sidebar-v2";
import "leaflet-sidebar-v2/css/leaflet-sidebar.css";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw-src.css";
import "leaflet.control.opacity/dist/L.Control.Opacity.css";
import "leaflet-draw";
import "leaflet-wms-header";
import "leaflet.control.opacity";
import "leaflet.wms"

//trial custom shapefile

// import "leaflet-draw/lib/leaflet-src";
// import "leaflet-draw/lib/leaflet.draw-src";
// import "leaflet-draw/lib/leaflet.shapefile/shp";
// import "leaflet-draw/lib/leaflet.shapefile/leaflet.shapefile";
// import "leaflet-draw/leaflet.draw-shapefile";
// import "leaflet-draw/leaflet.draw-shapefile.css";

// import shp from "shpjs/dist/shp";
// import "shpjs/lib/parseShp.js"
// import "shpjs"

import "src/CustomMapControls/measure/measure.css";
import "src/CustomMapControls/measure/MeasureTool";
import { uid } from "quasar";
import { download_chart } from "src/DownloadUtils/DownloadChart";
import { downloadCSV } from "src/DownloadUtils/Download_CSV";
import "leaflet-side-by-side";
import { negative } from "src/Services/Notifications";
export default {
  name: "Map",
  data() {
    return {
      center: [-11.981, 24.916], // set initial map center
      map: null, //instance of map object,
      more_options_selected: "", //selects which option is clicked
      sidebar: null, //holds leflet sidebar instance
      show_sidenav: false, //holds variable to toggle side nav when clicked
      show_base_layers: true, //used to toggle visibility of the base layer list
      previous_wemast_ctrl_id: null, //holds the id of the element clicked  prevously
      baseMaps: {}, // holds base layers array
      current_raster_layer: null, //holds curren requested layer geoserver
      opacityCtrl: null, //holds instance of opacity control
      current_geojson: null, //holds curren requested geometry
      raster_layers: [], //holds the layers fetched from backend
      editableLayers: null, //draw control
      sideByside: null, //instance of swap
      show_draw_control: false, //toggles draw control visibility
      analysis_swap_toggle: "data_analysis", // toggles between analysis and meta data
      current_top_base_layer: null, //holds the current later at the top
      search: "", //holds the search item
      show_search: false, // show search input
      show_login_form: false, // show search input
      compare_legend_link: "", // holds the legend link from geoserver
      legend: null, //holds instance of leaflet legend
      compare_legend: null, //holds instance of leaflet legend
      stats: {}, //holds sorted chart data
      chart_title: "title", //holds the chart title
      year: null, //holds current year
      line_chart_title: "Vegatation Cover", //
      metadata: null, //holds metadata
      response_data: null, //holds response data from findData function
      summary_text: ` Land use land cover maps monitor the land use in a specific year. The
      integration of the biophysical and human factors plays a leading role in
      causing land-use changes, and is used to explain the dynamics of land use
      that occur within a river region or a wetland. The study of land cover may
      also be used to predict future trends of an ecosystem while understanding
      its sustainability.`,
      opacity_value: 0, //holds opacity value
      main_params: {},
      compare_params: {},
      clear_compare: false,
      show_swap_control: false,
      custom_geojson: null, // holds custom polygon after draw
      timeseries_data: {}, //holds time series stats
      alert: false //show alert
    };
  },
  components: {
    MainNavLogos: require("src/components/MainNavLogos").default,
    DashboardNav: require("src/components/DashboardNav").default,
    AdvancedFilters: require("src/components/AdvancedFilters").default,
    Compare: require("src/components/Compare").default,
    SideNavLeaflet: require("src/components/SideNavLeaflet").default,
    SideNavLogos: require("src/components/SideNavLogos").default,
    Summary: require("src/components/Summary").default,
    PieChart: require("src/components/Charts/PieChart").default,
    LineChart: require("src/components/Charts/LineChart").default,
    BarChart: require("src/components/Charts/BarChart").default,
    Login: require("src/components/Login").default,
    Metadata: require("src/components/Metadata").default
  },
  computed: {
    UserSelections() {
      return this.$store.getters["WemastSelections/getUserSelections"];
    },
    selectedGeojson() {
      return this.$store.getters["Geojson/getGeojson"];
    },

    getStandardGeojson() {
      return this.$store.getters["Geojson/getStandardGeojson"];
    },
    CompareSelections() {
      return this.$store.getters["WemastSelections/getCompareSelections"];
    },

    sidenavlogos() {
      if (window.innerHeight > 900 && this.metadata)
        return `logos_container_large_with_metadata`;

      if (window.innerHeight > 900 && !this.metadata)
        return `logos_container_large`;
      return "row q-mt-md";
    },
    check_if_timeseries_data() {
      const timeseries = this.UserSelections?.timeseries;
      console.log(this.UserSelections?.timeseries, 'user selections timeseries')
      if (timeseries.includes(this.main_params.indicator)) {
        return true;
      }

      return false;
    },
    timeseries_stats() {
      if (this.timeseries_data.stats && this.timeseries_data.stats.length > 0) {
        // this.line_chart_title = `${this.UserSelections.region.label}  ${this.UserSelections?.subindicator_name}-${this.stats.year} (Time series)`;
        return true;
      }
      return false;
    }
  },
  watch: {
    selectedGeojson: {
      deep: true,
      handler(val) {
        this.handleGeojson(val);
      }
    }
  },
  methods: {

//     loadFile() {

// var input = document.getElementById('fileinput');
// if (!input.files[0]) {
//     bodyAppend("p", "Please select a file before clicking 'Load'");
// }
// else {
//     var file = input.files[0];

//     var fr = new FileReader();
//     fr.onload = receiveBinary;
//     fr.readAsArrayBuffer(file);
// }
// function receiveBinary() {
//     var result = fr.result
//     var shpfile = new L.shp(result);
//     shpfile.addTo(this.map);
// }
// },
    handleMainSelections(val) {
      if (this.compare_legend) {
        this.map.removeControl(this.compare_legend); //destroy legend everytime new data come in
      }
      if (this.sideByside !== null) {
        this.map.removeControl(this.sideByside);
      }
      this.clear_compare = true;

      if (this.more_options_selected === "compare") this.close_card(); //close advanced filters component
      const opacityctrl = document.getElementsByClassName("myRange");
      opacityctrl[0].style.visibility = "hidden";
      const swap = document.getElementById("wemast_swap");
      swap.style.display = "none";
      //remove any layers
      this.raster_layers.forEach(layer => {
        this.map.removeLayer(layer);
      });
      this.raster_layers = []; //clear all layers in array

      console.log(val.store_structure.Exposure['Land Cover'].year[0], 'val')

      var subindicator = Object.keys(val.store_structure.Exposure) 
      console.log(subindicator, 'SUBINDIATOR')

      this.year = val.store_structure.Exposure['Land Cover'].year[0];
     
      // if (process.env.DEV)
       console.log("Selections ", val);
      this.tiff_title = `${val?.region?.label}_${val?.sub_indicator}_${val?.year}`;
      console.log(this.tiff_title, 'tiff title')
      if ("year" in val && !val.has_seasons.includes(val.subindicator)) {
        console.log(this.UserSelections, 'user selections')
        const params = {
          region: this.UserSelections?.region?.value,
          indicator: this.UserSelections?.subindicator,
          year: this.UserSelections?.year,
          geometry: JSON.stringify(this.selectedGeojson?.geojson)
        };
        this.main_params = params;
        this.findData(params);
      }
      if ("season" in val) {
        const params = {
          region: this.UserSelections?.region?.value,
          indicator: `${this.UserSelections?.subindicator}_${this.UserSelections?.season}`,
          year: this.UserSelections?.year,
          geometry: JSON.stringify(this.selectedGeojson?.geojson)
        };
        this.main_params = params;
        this.findData(params);
      }
    },
    handleCompare(val) {
      console.log("handleCompare ====== ", val);
      const slider = document.getElementById("myRange");
      slider.value = 60;
      slider.dispatchEvent(new Event("input"));
      const rangeControl = document.getElementsByClassName(
        "leaflet-control-layers-range"
      )[0];
      rangeControl.dispatchEvent(new Event("input"));
      rangeControl.value = slider.value;
      if (!this.raster_layers.length)
        return negative(
          "You can only compare when there is another layer",
          3000
        );
      if (Object.keys(val).length === 0) return;
      const swap = document.getElementById("wemast_swap");
      swap.style.display = "inline-block";
      this.clear_compare = false;

      this.year = val.year;
      if (this.clear_compare === true) return;
      this.tiff_title = `${val?.region?.label}_${val?.subindicator}_${val?.year}`;
      if (
        "year" in val &&
        !this.UserSelections?.has_seasons.includes(val.subindicator)
      ) {
        // console.log("klkllkl ,", val)
        const params = {
          region: val?.region?.value,
          indicator: val?.subindicator,
          type: val?.indicator,
          year: val?.year,
          geometry: JSON.stringify(this.selectedGeojson.geojson)
        };
        this.compare_params = params;
        this.findData(params);
      }
      if ("season" in val) {
        const params = {
          region: val?.region?.value,
          indicator: `${val?.subindicator}_${val?.season}`,
          year: val?.year,
          geometry: JSON.stringify(this.selectedGeojson.geojson)
        };
        this.compare_params = params;
        this.findData(params);
      }
    },
    wemast_swap() {
      this.show_swap_control = !this.show_swap_control;
      if (this.sideByside !== null && !this.show_swap_control) {
        this.map.removeControl(this.sideByside);
        return;
      }
      this.ShowSideBySide();
    },
    handleRequest(val) {
      //called when request button is clicked in selections and advanced filters
      this.handleMainSelections(this.UserSelections);
        this.findData()



    },
    handleCompareEmit(val) {
      //called when compare  button is clicked in compare
      this.handleCompare(this.CompareSelections);
    },
    handleGeojson(val) {
      this.raster_layers.forEach(layer => {
        this.map.removeLayer(layer);
      });
      if (this.sideByside !== null) {
        this.map.removeControl(this.sideByside);
      }
      const swap = document.getElementById("wemast_swap");
      swap.style.display = "none";
      const opacityctrl = document.getElementsByClassName("myRange");
      opacityctrl[0].style.visibility = "hidden";

      if (val.custom) return;
      this.editableLayers.removeLayer(this.custom_geojson);
      if (this.current_geojson) this.map.removeLayer(this.current_geojson);
      this.current_geojson = L.geoJSON(val.geojson, {
        color: "black",
        // "weight": 5,
        fillColor: "none",
        opacity: 1
      });
      this.current_geojson.addTo(this.map);
      this.map.fitBounds(this.current_geojson.getBounds(), {
        padding: [50, 50]
      });
    },

    handleAnalysisMetaSwap(value) {
      this.analysis_swap_toggle = value;
    },
    wemast_zoom_ctrl_in() {
      this.map.setZoom(this.map.getZoom() + 1);
    },
    wemast_zoom_ctrl_out() {
      this.map.setZoom(this.map.getZoom() - 1);
    },
    async wemast_download_map() {
      this.$q.loading.show();
      let mapElement = document.getElementById("mapContainer");
      this.closeNav();
      setTimeout(async () => {
        const dataURL = await domtoimage.toPng(mapElement, {
          width: mapElement.width,
          height: mapElement.height
        });

        let link = document.createElement("a");
        link.setAttribute("href", dataURL);
        link.setAttribute("download", `${this.tiff_title}.png`);
        document.body.appendChild(link); // Required for FF
        link.click();
        document.body.removeChild(link);
        this.$q.loading.hide();
      }, 1500);
    },
    async wemast_download() {
      try {
        this.$q.loading.show({
          message: `Downloading ${this.tiff_title}.tiff`
        });
        const response = await fetch(
          `${this.response_data.geoserver}/${this.response_data.downloadurl}`,
          {
            headers: {
              sdf09rt2s: "locateit"
            }
          }
        );
        fetch(response.url, {
          headers: {
            sdf09rt2s: "locateit"
          }
        })
          .then(response => {
            if (process.env.DEV)
              console.log("wemast_download response ", response);
            return response.blob();
          })
          .then(blob => {
            var url = window.URL.createObjectURL(blob);
            var a = document.createElement("a");
            a.href = url;
            a.download = `${this.tiff_title}.tiff`;
            document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
            a.click();
            a.remove(); //afterwards we remove the element again
            this.$q.loading.hide();
          });
        if (process.env.DEV) console.log("wemast_download response ", tiff);
      } catch (error) {
        if (process.env.DEV) console.log("wemast_download error ", error);
        this.$q.loading.hide();
      }
    },
    wemast_base_layers() {
      if (!this.show_base_layers)
        document.getElementById("show_base_layers").style.display = "none";
      if (this.show_base_layers) {
        document.getElementById("show_base_layers").style.display = "block";
        document.getElementById("show_base_layers").style.marginRight = "-4px";

        //create the base map list and render
        const base_layers = Object.keys(this.baseMaps);
        let layer_html = `<ul class=base_layer_list>`;
        base_layers.forEach((layer, i) => {
          layer_html += `<li id=base_layer-${layer}>
          <div class=row>
          <div class="col-xs-1" ><input type="radio" name="base_map" id="checkbox-${layer}" ${
            this.current_top_base_layer === layer ? "checked" : ""
          } ></div>
          <div class="col-xs-10 q-ml-sm">
           ${layer} ${
            base_layers.length - 1 != i ? "<hr class=full-width> " : ""
          }
           </div>
          </div>
           </li>`;
        });
        layer_html += `</ul>`;
        document.getElementById("show_base_layers").innerHTML = layer_html;

        document
          .getElementById("base_layer_wrapper")
          .addEventListener("mouseleave", e => {
            document.getElementById("show_base_layers").style.display = "none";
          });
      }

      this.show_base_layers = !this.show_base_layers;
    },
    wemast_draw() {
      if (!this.show_draw_control) {
        const draw_ctrl = document.getElementsByClassName("leaflet-draw");
        draw_ctrl[0].style.visibility = "hidden";
      } else {
        const draw_ctrl = document.getElementsByClassName("leaflet-draw");
        draw_ctrl[0].style.visibility = "visible";
      }
      this.show_draw_control = !this.show_draw_control;
    },
    change_base_layer(id) {
      this.current_top_base_layer = id;
      const base_map = id.split("-")[1];
      this.current_top_base_layer = base_map;
      const index = Object.keys(this.baseMaps).indexOf(base_map);

      const layerControlElement = document.getElementsByClassName(
        "leaflet-control-layers"
      )[0];
      layerControlElement.getElementsByTagName("input")[index].click();

      this.map.eachLayer(function(layer) {});
    },

    AddCustomRightControls() {
      const leaflet_controls = L.control({ position: "topright" });
      leaflet_controls.onAdd = () => {
        let div = L.DomUtil.create("div", "WeMAST_zoom");
        div.innerHTML = leaflet_custom_controls;
        return div;
      };

      leaflet_controls.addTo(this.map);
      const right_ctrls = document.querySelector(".WeMAST_leaflet_controls");
      right_ctrls.addEventListener("click", event => {
        const id = event.target.id;
        event.stopPropagation();
        if (process.env.DEV) console.log("target id ", id);

        if (id === "wemast_measure") {
          document
            .getElementsByClassName("leaflet-control-measure")[0]
            .dispatchEvent(new Event("click"));
        }
        if (this[`${id}`]) {
          this[id]();
        }
        if (id.startsWith("checkbox")) {
          this.change_base_layer(id);
        }
        if (
          (this.previous_wemast_ctrl_id &&
            this.previous_wemast_ctrl_id != id) ||
          (this.previous_wemast_ctrl_id && this.previous_wemast_ctrl_id === id)
        ) {
          document.getElementById(
            this.previous_wemast_ctrl_id
          ).style.backgroundColor = "white";
        }

        this.previous_wemast_ctrl_id = id;
      });
    },
    AddSideLeafletSideBar() {
      this.sidebar = L.control.sidebar({
        container: "sidebar",
        position: "right"
      });
      this.map.addControl(this.sidebar);
    },
    setupLeafletMap() {
      let osm = L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          maxZoom: 19,
          attribution:
            '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
        }
      );

      let mapbox = L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
        {
          attribution:
            'Map data (c) <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
          // maxZoom: 18,
          id: "mapbox/streets-v11",
          accessToken:
            "pk.eyJ1IjoiY2hyaXNiYXJ0IiwiYSI6ImNrZTFtb3Z2bDAweTMyem1zcmthMGY0ejQifQ.3PzoCgSiG-1-sV1qJvO9Og"
        }
      );
      let mapboxSatellite = L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}{r}?access_token={accessToken}",
        {
          attribution:
            'Map data (c) <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',

          id: "mapbox/satellite-v9",
          accessToken:
            "pk.eyJ1IjoiY2hyaXNiYXJ0IiwiYSI6ImNrZTFtb3Z2bDAweTMyem1zcmthMGY0ejQifQ.3PzoCgSiG-1-sV1qJvO9Og"
        }
      );
      this.baseMaps = {
        OpenStreetMap: osm,
        MapBox: mapbox,
        MapBoxSatellite: mapboxSatellite
      };
      this.map = L.map("mapContainer", {
        zoomControl: false,
        layersControl: false,
        center: this.center,
        // minZoom: 4.4,
        // maxZoom: 17,
        zoom: 10,
        layers: [mapboxSatellite]
      }); // add the basemaps to the controls
      L.control.layers(this.baseMaps).addTo(this.map);
      L.control.scale().addTo(this.map);

      this.current_top_base_layer = "MapBoxSatellite";
      this.AddSideLeafletSideBar();
    },
    handleMoreOptionsClicked(option) {
      if (process.env.DEV) console.log("handleMoreOptionsClicked ", option);
      if (option === "compare") {
        return (this.more_options_selected = "compare");
      }
      if (option === "filter") {
        this.$store.dispatch("WemastSelections/handleUserSelections", {
          close_advanced: false
        });
        return (this.more_options_selected = "filter");
      }
    },
    //close the more options
    close_card() {
      this.more_options_selected = "";
    },
    toggle_nav(e) {
      const cmd = e.target.id;
      if (cmd === "close") return this.closeNav();
      return this.openNav();
    },
    openNav() {
      this.sidebar.open("home");
      this.show_sidenav = false;
      open_nav();
    },

    closeNav() {
      this.sidebar.close("home");
      close_nav();
      this.show_sidenav = true;
    },
    addDrawCtrl() {
      //we add the polygon draw feature to map as seen  below
      this.editableLayers = new L.FeatureGroup();
      this.map.addLayer(this.editableLayers);
      let options = {
        position: "topright",
        draw: {
          polyline: false,
        //   shapefile: {
				// shapeOptions:{
			  //   	color: 'black',
			  //   	weight: 3,
			  //   	opacity: 1,
			  //   	fillOpacity: 0					
				// }
		    // },
          polygon: {
            allowIntersection: false, // Restricts shapes to simple polygons
            showArea: true,
            drawError: {
              color: "#e1e100", // Color the shape will turn when intersects
              message: "<strong>Oh snap!<strong> you can't draw that!" // Message that will show when intersect
            },
            shapeOptions: {
              color: "black",
              fillColor: "none"
            }
          },
          circle: false, // Turns off this drawing tool
          rectangle: false,
          marker: false,
          circlemarker: false
        },
        edit: {
          featureGroup: this.editableLayers, //REQUIRED!!
          edit: true
        }
      };
      let drawControl = new L.Control.Draw(options);
      this.map.addControl(drawControl);

      this.map.on(L.Draw.Event.CREATED, e => {
        if (this.custom_geojson)
          this.editableLayers.removeLayer(this.custom_geojson);
        this.custom_geojson = e.layer;

        this.editableLayers.addLayer(this.custom_geojson);
        console.log(this.custom_geojson.toGeoJSON().geometry, 'custom drawn geojson')
        if (process.env.DEV)
          console.log(JSON.stringify(this.custom_geojson.toGeoJSON().geometry));
        this.$store.dispatch("Geojson/StoreGeojson", {
          custom: true,
          geojson: this.custom_geojson.toGeoJSON().geometry //didnt use the stringified version
        });
        this.$store.dispatch("WemastSelections/handleUserSelections", {
          region: {
            value: "custom",
            label: "AOI"
          }
        });
        if (this.current_geojson) this.map.removeLayer(this.current_geojson); //remove previous layers
        this.handleMainSelections(this.UserSelections);
      });

      this.map.on(L.Draw.Event.EDITSTOP, e => {
        if (process.env.DEV) console.log("stop edit", e);
      });
      this.map.on(L.Draw.Event.DELETED, e => {
        const StandardGeojson = this.getStandardGeojson;
        if (process.env.DEV)
          console.log(StandardGeojson, " deleted polygon", e);
        //
        if (!StandardGeojson) return;
        this.$store.dispatch("WemastSelections/handleUserSelections", {
          region: StandardGeojson.region
        });
        this.$store.dispatch("Geojson/StoreGeojson", {
          geojson: StandardGeojson.geojson,
          region: StandardGeojson.region
        });

        //remove the control from map and remove focus on the draw icon by changing color
        this.wemast_draw();
        document.getElementById("wemast_draw").style.backgroundColor = "white";
      });
    },
    async findData(params) { //params as parameter lol
      try {
        // if (!params.geometry)
        //   return negative("Please select a basin or wetland for analysis");

        // if (params.indicator === "rainfall")
        //   return this.handleAncillary(params);
        this.$q.loading.show();

        
       var params = {
                        ...params,
                        geometry: JSON.stringify(this.selectedGeojson.geojson),
                        indicator: this.UserSelections?.indicator,
                       sub_indicator: this.UserSelections?.sub_indicator,
                        year: this.UserSelections?.year,
                      };


                      console.log(params.indicator, 'PARAMETER INDICATOR')
        const response = await this.$axios.post(
          // `${wemast_base_url}/wemast-api-back-end-0.1/api/dataserver/finddata`,
          'http://149.248.57.97:8700/wemast-api-back-end-0.2/api/dataserver/finddata/',
          // `${this.$store.getters["settings/backend_api_url"]}wemast-api-back-end-0.1/api/dataserver/finddata`,
          params,
          // params = {
          //   ...params,
          //   geometry: JSON.stringify(this.selectedGeojson.geojson),
          //               indicator: this.UserSelections?.indicator,
          //              sub_indicator: this.UserSelections?.sub_indicator,
          //               year: this.UserSelections?.year,

          // }
          

          // {
          //   headers: {
          //     sdf09rt2s: "locateit"
          //   }
          // }
        );
       

        
        // if (process.env.DEV)
         console.log("find data response ", response.data);
        // if (response.data?.status === "ERROR") {
        //   this.$q.loading.hide();
        //   return negative("Could not get requested data");
        // }
                                                this.response_data = response.data;
                                                console.log(response.data, 'find data')
                                                await this.getWMS_Layer({
                                                  base_url: response.data.geoserver,
                                                  layers: response.data.layername,
                                                  style: response.data.sldname,
                                                });

        // await this.getLegend({
        //   base_url: response.data.geoserver,
        //   legend_url: response.data.legendurl
        // });
        // if (!this.clear_compare) {
        //   this.$q.loading.hide();
        //   return;
        // // }
        //               params = {
        //                 ...params,
        //                 geometry: JSON.stringify(this.selectedGeojson.geojson),
        //                 indicator: this.UserSelections?.indicator,
        //                sub_indicator: this.UserSelections?.sub_indicator,
        //                 year: this.UserSelections?.year,
        //               };
        // await this.getStatistics(params);
        // this.$q.loading.hide();
        // this.getMetaData(response.data.metadataid);
      } catch (error) {
        if (process.env.DEV) console.log("find data error ", error);
        this.$q.loading.hide();
      }
    },
    async handleAncillary() {
      // this.stats={}
      this.compare_params.range = [0, 0];
      this.getTimeseries({
        data: this.compare_params
      }); 
    },
    async CreateLegend() {
      if (this.legend) {
        this.map.removeControl(this.legend); //destroy legend everytime new data comes in
      }
      this.legend = L.control({
        position: "bottomright",
        name: this.legendTitle
      });
      this.legend.onAdd = map => {
        //create legend based on data, translatios have been included
        let div = L.DomUtil.create("div", "legend");
        div.innerHTML += `<div > 
        <img src=${this.legend_link}  />
       
        </div >`;

        let draggable = new L.Draggable(div); //the legend can be dragged around the div
        draggable.enable();
        return div;
      };
      this.legend.addTo(this.map);
    },
    async CreateCompareLegend() {
      if (this.compare_legend) {
        this.map.removeControl(this.compare_legend); //destroy legend everytime new data come in
      }
      this.compare_legend = L.control({
        position: "bottomleft",
        name: this.legendTitle
      });
      this.compare_legend.onAdd = map => {
        //create legend based on data, translatios have been included
        let div = L.DomUtil.create("div", "compare_legend");
        div.innerHTML += `<div > 
        <img src=${this.compare_legend_link} />
       
        </div >`;

        let draggable = new L.Draggable(div); //the legend can be dragged around the div
        draggable.enable();
        return div;
      };
      this.compare_legend.addTo(this.map);
    },
    // async getLegend({ base_url, legend_url }) {
    //   fetch(`${base_url}/${legend_url}`, {
    //     headers: {
    //       sdf09rt2s: "locateit"
    //     }
    //   })
    //     .then(response => response.blob())
    //     .then(blob => {
    //       //
    //       const reader = new FileReader();
    //       reader.readAsDataURL(blob);
    //       reader.onloadend = () => {
    //         if (!this.clear_compare) {
    //           this.compare_legend_link = reader.result;
    //           this.CreateCompareLegend();
    //           // this.ShowSideBySide();
    //         } else {
    //           this.legend_link = reader.result;
    //           this.CreateLegend();
    //         }
    //       };
    //     });
    // },
    async getStatistics(params) {
      try {
        this.stats = {};
        this.timeseries_data = {};
        const response = await this.$axios.post(
          `${wemast_base_url}/wemast-api-back-end-0.1/api/dataserver/findstats`,
          // `${this.$store.getters["settings/backend_api_url"]}wemast-api-back-end-0.1/api/dataserver/findstats`,
          params,

          // {
          //   headers: {
          //     sdf09rt2s: "locateit"
          //   }
          // }
        );
        this.stats = response.data;

        const { labels, stats, status } = this.stats; 
        if (status === "ERROR") {
          //remove any layers
          this.raster_layers.forEach(layer => {
            this.map.removeLayer(layer);
          });
          return negative("Data does not exist", 0);
        }
        const chart_stats = [];
        stats.forEach(stat => {
          labels.find(label => {
            if (parseFloat(label.quantity) === stat.value) {
              chart_stats.push({ ...stat, ...label });

              const numbers3 = [1, 2, 3, 4, 5];
              const new_array = numbers3.map( item => 
                 item * 2
                
              )
              // console.log(new_array, 'new array doubled')
              const passed_filter =  numbers3.find(item =>
                 item > 2
                // return console.log(passed_filter, 'pass') 
               
              )
              //  console.log(passed_filter, 'passed filter')
              
            }
          });
        });
        this.stats.chart_stats = chart_stats;
        if (process.env.DEV)
          console.log(
            " chart response.data ",
            response.data,
            " chart_stats ",
            chart_stats,
            " Chart Data",
            this.stats
          );
        this.chart_title = `${this.UserSelections.region.label}  ${this.UserSelections?.subindicator_name}-${this.stats.year}
          (Pie chart)`;
        this.line_chart_title = `${this.UserSelections.region.label}  ${this.UserSelections?.subindicator_name}-${this.stats.year}`;
      } catch (error) {
        if (process.env.DEV) console.log("get stats error ", error);
      }
    },
    async getMetaData(id) {
      try {
        const response = await this.$axios.get(
          `${wemast_base_url}/wemast-api-back-end-0.1/api/dataserver/metadata/${id}`,
          // `${this.$store.getters["settings/backend_api_url"]}wemast-api-back-end-0.1/api/dataserver/metadata/${id}`,
          // {
          //   headers: {
          //     sdf09rt2s: "locateit"
          //   }
          // }
        );
        this.metadata = response.data.metadata;
        if (process.env.DEV) console.log("getMetaData response", response.data);
      } catch (error) {
        if (process.env.DEV) console.log("get metadata error ", error);
      }
    },
    async getWMS_Layer({ layers }) {
      console.log(this.response_data.geoserver, 'WMS  url') //'http://149.248.57.97:8080/geoserver/wms?'
      console.log(`${layers}`, 'WMS HEADER LAYERS') //"wemast_datasets:Exposure_Land Cover___2016"
      console.log(this.response_data.sldname, 'WMS  HEADER STYLE') //'Exposure_Land Cover_cuv' // 'http://149.248.57.97:8080/geoserver/wms?',
      try {
        const wmsLayer = L.tileLayer.wms(
          // 'http://149.248.57.97:8080/geoserver/wms?',
          `${this.response_data.geoserver}`,
          {
            layers:`${layers}`,
            format: "image/png",
            transparent: true,
            crs: L.CRS.EPSG4326,
            opacity:1,
            styles: `${this.response_data.sldname}`
          },
          // [{ header: "sdf09rt2s", value: "locateit" }],
          null
        );

        if (this.raster_layers.length >= 2) {
          this.map.removeLayer(this.raster_layers[1]);
          this.raster_layers.splice(1, 1);
        }

        if (this.opacityCtrl) this.map.removeControl(this.opacityCtrl);
        wmsLayer.uuid = uid();
        this.raster_layers.push(wmsLayer);

        let top_raster = null;
        this.map.eachLayer(layer => {
          if (process.env.DEV)
            console.log(this.clear_compare, "  raster_layers ", layer.uuid);
          if (
            this.raster_layers[0].uuid === layer.uuid &&
            this.clear_compare === false
          ) {
            top_raster = layer;
            top_raster.addTo(this.map);
            layer.bringToFront();
          } else {
            top_raster = wmsLayer;
            top_raster.addTo(this.map);
            top_raster.bringToFront();
          }
        });
        this.current_raster_layer = wmsLayer;
        this.opacityCtrl = L.control.opacity(
          { wms: top_raster },
          {
            label: "Layers Opacity"
          }
        );
        this.opacityCtrl.addTo(this.map);
        this.handleChangeOpacity();
      } catch (error) {
        if (process.env.DEV) console.log("getWMS_Layer error ", error);
      }
    },
    handleShowSearch(val) {
      this.show_search = val;
    },
    handleShowLoginForm(val) {
      this.show_login_form = val;
    },
    async handleChangeOpacity() {
      const draw_ctrl = document.getElementsByClassName("myRange");
      draw_ctrl[0].style.visibility = "visible";

      const slider = document.getElementById("myRange");
      const rangeControl = document.getElementsByClassName(
        "leaflet-control-layers-range"
      )[0];
      let is_above = false;
      let is_below = false;
      slider.oninput = async () => {
        rangeControl.dispatchEvent(new Event("input"));
        rangeControl.value = slider.value;
        this.opacity_value = slider.value;
        if (this.opacity_value > 45 && this.raster_layers.length > 1) {
          const params = {
            ...this.main_params,
            geometry: JSON.stringify(this.selectedGeojson.geojson)
          };
          if (!is_above) {
            this.getStatistics(params);
            is_above = true;
          }
          is_below = false;
        }
        if (this.opacity_value < 45 && this.raster_layers.length > 1) {
          const params = {
            ...this.compare_params,
            geometry: JSON.stringify(this.selectedGeojson.geojson)
          };
          if (!is_below) {
            if (process.env.DEV)
              console.log("compare data ", this.CompareSelections);
            await this.getStatistics(params);
            this.chart_title = `${this.CompareSelections.region.label}  ${this.CompareSelections?.indicator}-${this.stats.year}
          (Pie chart)`;
            this.line_chart_title = `${this.CompareSelections.region.label}  ${this.CompareSelections?.indicator}-${this.stats.year}`;
            is_below = true;
          }
          is_above = false;
        }
      };
    },
    download_chart(id) {
      let name = id === "PieCanvas" ? this.chart_title : this.line_chart_title;
      let chartImg = document.getElementById(id).toDataURL("image/png");
      download_chart(chartImg, name);
    },
    downloadcsv() {
      let csv_data = [];
      if (process.env.DEV) console.log("downloadcsv ", this.stats);
      this.stats.stats.forEach((data, i) => {
        csv_data.push({
          Class: this.stats.labels[i].label,
          Color: `${this.stats.labels[i].color.split("#")[1]}`,
          "Change (M2)": data.nb
        });
      });
      let name = `${this.tiff_title}.csv`;
      downloadCSV({ filename: name, data: csv_data });
    },
    ShowSideBySide() {
      if (this.sideByside !== null) {
        this.map.removeControl(this.sideByside);
      }
      this.sideByside = L.control.sideBySide(
        this.raster_layers[this.raster_layers.length - 1], //left
        this.raster_layers[0] //right
      );
      this.sideByside.addTo(this.map);
      this.sideByside.on("dividermove", e => {
        if (process.env.DEV) console.log("sidebyside ", e);
      });
    },
    async getTimeseries({ data }) {
      try {
        let params = null;
        if (data) params = data;
       
        else params = this.main_params;
        if (params.region != "custom") {
          this.alert = true;
          return;
        }

        this.$q.loading.show();

        const response = await this.$axios.post(
          // ${wemast_base_url}/wemast-api-back-end-0.1/api/dataserver/metadata/${id}
          `${wemast_base_url}/wemast-api-back-end-0.1/api/dataserver/findtimeseries`,
          {
            ...params,
            range: params.range || [-5, 5] //years to pull
          },
          console.log(params, 'time series params'),
          {
            headers: {
              sdf09rt2s: "locateit"
            }
          }
        );
        this.$q.loading.hide();
        this.timeseries_data = { ...response.data };
        console.log(response.data , 'time series  response data') //same
        console.log({...response.data } , 'time series  destructured response data') // data structure
        
        this.line_chart_title = `${params.indicator} ${params.year}`;
        if (this.timeseries_data.stats.length === 0)
          negative(this.timeseries_data.errors);
      } catch (error) {
        this.$q.loading.hide();
        if (process.env.DEV) console.log("get timeseries error ", error);
      }
    }
  },

  mounted() {
    this.setupLeafletMap();
    this.AddCustomRightControls();
    const opacityctrl = document.getElementsByClassName("myRange");
    opacityctrl[0].style.visibility = "hidden";
    const swap = document.getElementById("wemast_swap");
    swap.style.display = "none";
    this.closeNav();
    document
      .getElementById("wemast_base_layers")
      .addEventListener("mouseover", e => {
        this.show_base_layers = true;
        this.wemast_base_layers();
      });

    document.getElementById("myRange").addEventListener("mouseover", e => {
      this.map.dragging.disable();
    });
    document.getElementById("myRange").addEventListener("mouseleave", e => {
      this.map.dragging.enable();
    });

    this.addDrawCtrl(); //adds draw control to map
    this.wemast_draw(); //hides draw controls

    // this.map.on("baselayerchange", e => {
    //   if (this.current_raster_layer) {
    //     this.current_raster_layer.bringToFront(); //current_raster can be tracked and brought to front
    //   }
    // });

    const plugin = L.control
      .measure({
        //  control position
        position: "topleft",
        //  weather to use keyboard control for this plugin
        keyboard: true,
        //  shortcut to activate measure
        activeKeyCode: "M".charCodeAt(0),
        //  shortcut to cancel measure, defaults to 'Esc'
        cancelKeyCode: 27,
        //  line color
        lineColor: "red",
        //  line weight
        lineWeight: 2,
        //  line dash
        lineDashArray: "6, 6",
        //  line opacity
        lineOpacity: 1,
        formatDistance: "km"
        //  distance formatter
        // formatDistance: function (val) {
        //   return Math.round(1000 * val / 1609.344) / 1000 + 'mile';
        // }
      })
      .addTo(this.map);

  }
};
</script>

<style scoped>
.WeMast_top_logos {
  position: absolute;
  top: 89vh;
  left: 8vw;
  z-index:1000 ;
 
 
  /* margin-top: 35px; */
}

#mapwrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  top: -10.5vh;
  background-color: rgb(26, 209, 56);
}
#wemast_base_layers {
  margin-top: 70px;
}
#mapContainer >>> .leaflet-control-layers {
  display: none;
}
#mapContainer >>> .leaflet-control-measure {
  display: none;
}
#mapContainer >>> .leaflet-sbs-range {
  width: 100%;

  height: 0;
  padding: 0;

  border: 0;
}

#mapContainer >>> .leaflet-sbs-divider {
  margin-left: 2px;
}

@media screen and (min-height: 900px) {
  #mapContainer {
    width: 100%;
    height: 77.5vh;
    margin-top: -30px;
  }
}

@media screen and (max-height: 720px) {
  #mapContainer {
    width: 100%;
    height: 62vh;
    margin-top: -30px;
  }
  #mapContainer >>> .leaflet-sbs-divider {
    margin-left: -2px;
  }
}
@media screen and (min-height: 800px) and (max-height: 899px) {
  #mapContainer {
    width: 100%;
    height: 73vh;
    margin-top: -30px;
  }
}

.compare p {
  left: -47px;
  caret-color: transparent;
}
.options-card {
  margin-top: -38px;
  width: 288px;
}
#mapContainer >>> .WeMAST_leaflet_controls {
  font-size: 30px;
  position: sticky;
  top: 40%;
}
#mapContainer >>> .WeMAST_leaflet_controls img {
  padding-right: 5px;
  padding-left: 5px;
  padding-top: 5px;
  padding-bottom: 5px;
  background-color: white;
}

/* from hapa ni side nav */
.sidenav {
  height: 100%;
  position: fixed;
  z-index: 3000;
  top: 90px;
  right: 0;
  caret-color: transparent;
}
#mySidenav {
  transition: width 0.3s;
}
.sidenav_body {
  height: 90%;

  margin-left: 20px;
  overflow-y: scroll;
  position: relative;
  scrollbar-width: thin;
  scrollbar-color: steelblue white;
}
.sidenav_body::-webkit-scrollbar {
  width: 0.8px;
}
.sidenav_body::-webkit-scrollbar-track {
  background: white; /* color of the tracking area */
}

.sidenav_body::-webkit-scrollbar-thumb {
  background-color: steelblue; /* color of the scroll thumb */
  /* border-radius: 10px; roundness of the scroll thumb */
  /* border: 1px solid rgb(224, 213, 193); creates padding around scroll thumb */
}
@media screen and (max-height: 720px) {
  .protrusion {
    top: 174px;
    position: absolute;
    border-radius: 50%;
    width: 45px;
    height: 45px;
    cursor: pointer;
  }
}
@media screen and (min-width: 1280px) {
  .protrusion {
    top: 112px;
    position: absolute;
    border-radius: 50%;
    width: 45px;
    height: 45px;
    cursor: pointer;
  }
}

#close {
  margin-top: 9px;
  margin-left: 8px;
}
#open {
  margin-top: 9px;
  margin-left: 8px;
  transform: rotate(180deg);
}
@media screen and (max-height: 800px) {
  .logos_container {
    margin-bottom: 25px;
    margin-top: 10px;
  }
}

.logos_container_large {
  position: absolute;
  bottom: 0;
  margin-left: 25%;
  margin-bottom: -5px;
  margin-top: 20px;
}
.logos_container_large_with_metadata {
  position: relative;
  bottom: 0;
  margin-left: 12%;
  margin-bottom: -5px;
  margin-top: 20px;
}

#mapContainer >>> .base_layer_list {
  list-style: none;
  font-size: 15px;
  padding: 5px;
}
.side_nav_swap {
  color: #1481c3;
  border-bottom: solid 3px #1481c3;
  padding-bottom: 6px;
}

.slider {
  -webkit-appearance: none;
  width: 100%;
  height: 25px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
}

.slider:hover {
  opacity: 1;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  background: #4caf50;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  background: #4caf50;
  cursor: pointer;
}

#mapContainer >>> .wemast_swap .tooltiptext {
  visibility: hidden;
  width: 80px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  font-size: 13px;
  /* Position the tooltip */
  position: absolute;
  z-index: 1;
  top: 90%;
  left: 50%;
  margin-left: -60px;
}

#mapContainer >>> .wemast_swap:hover .tooltiptext {
  visibility: visible;
}
#mapContainer >>> .wemast_download_map .tooltiptext {
  visibility: hidden;
  width: 80px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  font-size: 13px;
  /* Position the tooltip */
  position: absolute;
  z-index: 1;
  top: 90%;
  left: 50%;
  margin-left: 9px;
}

#mapContainer >>> .wemast_download_map:hover .tooltiptext {
  visibility: visible;
}

#mapContainer >>> .wemast_download .tooltiptext {
  visibility: hidden;
  width: 80px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  font-size: 13px;
  /* Position the tooltip */
  position: absolute;
  z-index: 1;
  top: 90%;
  left: 50%;
  margin-left: -30px;
}
#mapContainer >>> .wemast_download:hover .tooltiptext {
  visibility: visible;
}

#mapContainer >>> .wemast_measure .tooltiptext {
  visibility: hidden;
  width: 80px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  font-size: 13px;
  /* Position the tooltip */
  position: absolute;
  z-index: 1;
  top: 90%;
  left: 50%;
  margin-left: 45px;
}
#mapContainer >>> .wemast_measure:hover .tooltiptext {
  visibility: visible;
}

#mapContainer >>> .wemast_draw .tooltiptext {
  visibility: hidden;
  width: 80px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  font-size: 13px;
  /* Position the tooltip */
  position: absolute;
  z-index: 1;
  top: 90%;
  left: 50%;
  margin-left: 120px;
}
#mapContainer >>> .wemast_draw:hover .tooltiptext {
  visibility: visible;
}

#mapContainer >>> .wemast_help .tooltiptext {
  visibility: hidden;
  width: 80px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  font-size: 13px;
  /* Position the tooltip */
  position: absolute;
  z-index: 1;
  top: 90%;
  left: 67%;
  margin-left: 120px;
}
#mapContainer >>> .wemast_help:hover .tooltiptext {
  visibility: visible;
}
.legend{
  border-radius: 20px;
}
</style>
