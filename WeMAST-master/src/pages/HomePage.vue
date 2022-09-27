<template>
  <div class="q-pl-xl q-pt-md q-pr-xl">
    <!-- <div class="row">
      <div class="col">
        <div class="q-pa-md float-right">
          <LanguageSelection />
        </div>
      </div>
    </div> -->

    <!-- nav icons -->

    <div class="row">
      <!-- logos -->
      <div class="col-md-7">
        <div class="row">
          <img
            :src="require('assets/logos/SASSCAL.png')"
            class="WeMast_Dashboard_logos"
          />
          <div class="">
            <img
              :src="require('assets/logos/Gmes.png')"
              class="WeMast_Dashboard_logos"
            />

            <img
              :src="require('assets/logos/Au.png')"
              class="WeMast_Dashboard_logos"
            />

            <img
              :src="require('assets/logos/EU.png')"
              class="WeMast_Dashboard_logos"
            />
          </div>
        </div>
      </div>
      <div class="col">
        <div class="float-right ">
          <div class="col-xs-12">
            <div class=" flex">
              <div class="nav-icons">
                <router-link to="/">
                  <q-icon
                    color="red"
                    :name="
                      $route.path === '/'
                        ? 'img:/uiIcons/home-24px.svg'
                        : 'img:/uiIcons/home-inactive.svg'
                    "
                    size="37px"
                  />
                </router-link>

                <br />
                <label class="label_title">Home</label>
              </div>

              <div class="nav-icons">
                <router-link
                  to="/dashboard"
                  style="text-decoration:none;cursor:pointer"
                >
                  <q-icon
                    class="q-ml-md"
                    color="primary"
                    :name="
                      $route.path === '/dasboard'
                        ? 'img:/uiIcons/dashboard-24px.svg'
                        : 'img:/uiIcons/dashboard-inactive.svg'
                    "
                    size="37px"
                  />
                  <br />
                  <label class="label_title">Dashboard</label>
                </router-link>
              </div>
              <div class="nav-icons">
                <a
                  :href="
                    `${this.$store.getters['settings/backend_api_url']}bkeadmin/`
                  "
                >
                  <q-icon
                    color="primary"
                    name="img:/uiIcons/person-inactive.svg"
                    size="37px"
                  />
                </a>

                <br />
                <label class="label_title">Profile</label>
              </div>
              <!-- documentation -->

              <a
                :href="`${this.$store.getters['settings/documentation']}`"
                style="text-decoration:none; color:black; cursor:pointer"
              >
                <div class="nav-icons">
                  <q-icon
                    class="q-ml-lg"
                    name="img:/uiIcons/article-inactive.svg"
                    size="37px"
                  />

                  <br />
                  <label class="label_title">Documentation</label>
                </div>
              </a>

              <!-- contacts -->
              <div @click="scrollMeTo('contacts')">
                <q-icon
                  class="q-ml-sm"
                  name="img:/uiIcons/contacts-inactive.svg"
                  size="37px"
                />

                <br />
                <label class="label_title">Contact</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- banner div -->
    <div class="q-pt-md row">
      <div class="col">
        <div class="banner q-pa-md">
          <div class="row">
            <div class="gt-sm q-pt-lg q-pl-xl ">
              <q-icon
                class="bulb-img "
                color="primary"
                name="img:/uiIcons/challenge.svg"
              />
            </div>
            <div class="col ">
              <div class="banner-content">
                WETLAND MONITORING AND ASSESSMENT SERVICE FOR TRANSBOUNDARY
                BASINS IN SOUTHERN AFRICA<span class="abbreviation">
                  (WeMAST)
                </span>
              </div>
              <div class="action-button">
                <div class="button-text text-center">
                  <router-link
                    to="/dashboard"
                    style="text-decoration:none; color:white; cursor"
                  >
                    Visit Geo-Portal
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- highlghts  -->
    <div class="row">
      <div class="q-ma-md col-md">
        <div class="row">
          <div class="">
            <q-icon
              class="highlight-icon q-pt-md"
              color="primary"
              name="img:/uiIcons/challenge_hightlight.svg"
            />
          </div>
          <div class="q-mt-md q-ml-sm q-mb-sm">
            <div class="title">
              Geo-Data
            </div>
            <div class="highlight-text">
              Geo-Spatial data covering the River Basins
            </div>
          </div>
        </div>
        <div>
          <img src="images/geodata.png" class="hightlight-item" />
        </div>
      </div>

      <div class="q-ma-md col-md">
        <div class="row">
          <div class="">
            <q-icon
              class="highlight-icon q-pt-md"
              color="primary"
              name="img:/uiIcons/watch.svg"
            />
          </div>
          <div class="q-mt-md q-ml-sm q-mb-sm">
            <div class="title">
              Time-Series
            </div>
            <div class="highlight-text">
              Historical analytics of Geo- Spatial data
            </div>
          </div>
        </div>
        <div>
          <img src="images/timeseries.png" class="hightlight-item" />
        </div>
      </div>

      <div class="q-ma-md col-md">
        <div class="row">
          <div class="">
            <q-icon
              class="highlight-icon q-pt-md"
              color="primary"
              name="img:/uiIcons/article.svg"
            />
          </div>
          <div class="q-mt-md q-ml-sm q-mb-sm">
            <div class="title">
              Documentation & Manuals
            </div>
            <div class="highlight-text">
              Chronological instructions & processing chains
            </div>
          </div>
        </div>
        <div>
          <img src="uiIcons/documents.png" class="hightlight-item" />
        </div>
      </div>

      <div class="q-ma-md  col-md">
        <div class="row">
          <div class="">
            <q-icon
              class="highlight-icon q-pt-md"
              color="primary"
              name="img:/uiIcons/challenge_hightlight.svg"
            />
          </div>
          <div class="q-mt-md q-ml-sm q-mb-sm">
            <div class="title">
              Analytics
            </div>
            <div class="highlight-text">
              Statistical visualisation of Geo- Spatial data
            </div>
          </div>
        </div>
        <div>
          <img src="uiIcons/analytics.png" class="hightlight-item" />
        </div>
      </div>
    </div>
    <!-- wetlands in SADC -->
    <div class="q-mt-xl">
      <div class="sadc-title">
        Wetlands in SADC
      </div>
      <div class="sadc-heading q-mb-lg">
        Earth Observation Products and Services for Sustainable Wetland
        Management
      </div>
      <div class="sadc-text q-mb-lg">
        Earth Observation Products and Services for Sustainable Wetland
        Management The Wetland Monitoring and Assessment Service for
        Transboundary Basins (WeMAST) Project in Southern African Development
        Community (SADC) Project was developed and implemented with Earth
        Observation (EO) data to supports Sustainable Wetland Assessment and
        Monitoring Services, in order to support policy implementation and
        management practices in the region
      </div>
      <!-- sadc images -->
      <div class="row sadc-images">
        <div class="col-md ">
          <div class="q-pa-xs">
            <img src="images/sadc1.png" class="sadc-img" />
            <div class="sadc-caption">
              <q-icon
                class="sadc_icons"
                color="primary"
                name="img:/uiIcons/sadc_arrow_left.svg"
              />
              Wetland coverage & status analytics
            </div>
          </div>
        </div>
        <div class="col-md">
          <div class="q-pa-xs">
            <img src="images/sadc2.png" class="sadc-img" />
            <div class="sadc-caption">
              <q-icon
                class="sadc_icons"
                color="primary"
                name="img:/uiIcons/sadc_arrow_left.svg"
              />
              Wetland coverage & status analytics
            </div>
          </div>
        </div>
      </div>
      <!-- river Basins -->
      <div class="q-pa-sm">
        <div class="river-basin-title">
          RIVER BASINS
        </div>
        <div class="river-basin-heading">
          River Basins infographics
        </div>
      </div>
      <!-- basin-collage -->
      <div class="q-pa-sm q-mt-sm">
        <!-- first row -->
        <div class="row">
          <div class="col-md">
            <img src="images/sadc2.png" class="basin-images" />
          </div>
          <div class="col-md ">
            <div class="basin-wrapper">
              <div class="basin-row-title" ref="Cuvelai">
                The Cuvelai Basin
              </div>
              <div class="basin-content">
                The Cuvelai drainage system channels runoff from Angola’s summer
                rainfall through a complex system of ephemeral river channels,
                referred to as the Oshanas. When the system floods, the runoff
                flows through the shallow channels in a southerly direction to
                the Etosha pan in Namibia. <br />
                <br />
                During the wet season, the Oshanas of the Cuvelai drainage
                system are estimated to support around 30 to 40 % of Namibia’s
                population with subsistence farming and fishing on the seasonal
                wetlands. In addition, the flooded wetlands contain small fish,
                carried with the runoff from the North, which are joined by
                various pond fauna and draw various bird species, including
                flamingo, that will also breed in the Fischer’s Pan of the
                Etosha pan, and the threatened blue crane. Most of the Etosha
                pan itself is contained in the Etosha National Park, which hosts
                a number of rare and endangered mammals, including the black
                rhinoceros, and consequently contributes substantially to the
                local economy with tourism. The Etosha pan and the Cuvelai
                drainage system in Namibia are a Ramsar site.
              </div>
            </div>
          </div>
        </div>
        <!-- second row -->
        <div class="row">
          <div class="col-md ">
            <div class="basin-wrapper-limpopo">
              <div class="basin-row-title-limpopo" ref="Limpopo">
                The Limpopo Basin
              </div>
              <div class="basin-content-white">
                The majority of wetlands along the Limpopo basin are located in
                Mozambique and along the Changane River. There are three Ramsar
                wetland sites in the Limpopo basin: The Makuleke Wetlands, the
                Nylsvley Nature Reserve and the Verloren Valei Nature Reserve.
                All three wetland sites have conservation status and therefore
                contribute to the local economies with tourism. Most of the
                Makuleke wetlands are situated within the Kruger National Park.
                The wetlands are of floodplain vlei type and are intermittently
                filled by floods and rain. They sustain riverine ecosystems,
                including wildlife, well into the dry season. The floodplains
                also serve to attenuate floods, thereby reducing flood damage
                downstream. <br />
                <br />
                The Nylsvley Nature Reserve serves as a breeding ground for
                eight red-listed waterbirds and hosts the endangered roan
                antelope. It is also the only site where wild rice is found in
                South Africa. The Verloren Valei Nature Reserve is
                hydrologically significant as it functions like a sponge in the
                upper catchment, ensuring the gradual release of water to
                downstream areas during and after the rainy season. The area
                provides a refuge for the Wattled Crane and further hosts
                various vulnerable and threatened plant and mammal species.
              </div>
            </div>
          </div>
          <div class="col-md">
            <img src="images/hippo.png" class="basin-images" />
          </div>
        </div>
        <!-- third row -->
        <div class="row">
          <div class="col-md">
            <img src="images/waterfall.png" class="basin-images" />
          </div>
          <div class="col-md ">
            <div class="basin-wrapper">
              <div class="basin-row-title" ref="Okavango">
                The Okavango Basin
              </div>
              <div class="basin-content">
                The Okavango Basin’s main stream, the Okavango River, is
                southern Africa’s fourth longest river and is produced by
                seasonal flooding during the summer months. It begins as the Rio
                Cubango in Angola, flows south to form the border between Angola
                and Namibia and, in Botswana, it reaches the large swampy inland
                delta called the Okavango Delta, a UNESCO World Heritage Site.
                <br />
                <br />
                The Okavango River and the delta attract great concentrations of
                wildlife, including huge elephant and buffalo herds, and
                consequently fuel a lucrative tourism industry in Namibia and
                Botswana. <br />
                <br />
                Along all rivers and tributaries, the river-based communities
                rely on the perennial river for small-scale irrigation,
                subsistence farming and fishing.
              </div>
            </div>
          </div>
        </div>
        <!-- forth row -->
        <div class="row">
          <div class="col-md ">
            <div class="basin-wrapper-zambezi">
              <div class="basin-row-title" ref="Zambezi">
                The Zambezi Basin
              </div>
              <div class="basin-content-white">
                The Zambezi basin is the fourth-largest river basin of Africa
                with a large area covered by wetlands. These include the Barotse
                Floodplains in Zambia, the Chobe Swamps in northeastern Namibia,
                the Linyanti Swamp in Botswana, the Busanga Swamps on the Lunga
                River, the Lukanga Swamps and the Kafue Flats on the Luangwa
                River, and the Elephant Marsh near the town of Chiromo in
                Malawi. These wetlands are used for fisheries, including
                commercial fisheries, agriculture, wildlife management and
                transportation services. Moreover, these wetlands are important
                habitats for fish, and its riverine woodlands supports support
                wildlife and birds, by providing vegetative cover and suitable
                breeding and feeding grounds, which drive tourism activities,
                that include photography, bird watching and hunting.
                Furthermore, the wetlands provide hydrological services by
                decreasing downstream flood risks. <br />
                <br />
                The construction of the Kariba and Cahora Bassa dams has
                decreased the size of the floodplain of the lower Zambezi, and
                consequently the wetlands, but flooding remains perennial.
              </div>
            </div>
          </div>
          <div class="col-md">
            <img src="images/lion.png" class="basin-images" />
          </div>
        </div>
      </div>
      <!-- partner logos -->
      <div class="row q-pa-sm">
        <div class="col-md">
          <div class="label text-weight-bold">Partners</div>
          <div>
            <img src="images/main_logos.png" class="partner-logos" />
          </div>
        </div>
        <div class="col-md">
          <div class="project-name">
            <div class="label text-weight-bold q-ml-sm">Project Name</div>
            <img src="images/project_logo.png" class="project-logo" />
          </div>
        </div>
      </div>
      <!-- basin links and names -->
      <div class="row basin-links ">
        <div class="col-md">
          <div class="q-mt-md ">
            <div class="q-pa-md">
              <div class="basin_name_link" @click="scrollMeTo('Cuvelai')">
                The Cuvelai Basin
              </div>
              <div class="basin_line"></div>
            </div>

            <div class="q-pa-md">
              <div class="basin_name_link" @click="scrollMeTo('Limpopo')">
                The Limpopo Basin
              </div>
              <div class="basin_line"></div>
            </div>

            <div class="q-pa-md">
              <div class="basin_name_link" @click="scrollMeTo('Okavango')">
                The Okavango Basin
              </div>
              <div class="basin_line"></div>
            </div>

            <div class="q-pa-md">
              <div class="basin_name_link" @click="scrollMeTo('Zambezi')">
                The Zambezi Basin
              </div>
              <div class="basin_line"></div>
            </div>
          </div>
        </div>
        <div class="col-md" ref="contacts">
          <div class="text-white float-right q-pa-md">
            <div class="text-weight-bolder text-h6">
              WeMAST Project Coordination Team
            </div>
            <div class="text-subtitle">
              SASSCAL Regional Secretariat
            </div>

            <div class="text">
              28 Robert Mugabe Avenue, (c/o Robert Mugabe and Newton street)
            </div>
            <div class="text">
              Windhoek
            </div>
            <div class="text">
              Namibia
            </div>
            <div class="text">
              Tel 1: +264-(0)-61-223-997
            </div>
            <div class="text">
              Tel 2: +264-(0)-61-248-693
            </div>
            <div class="text-">
              Email: info.wemast@sasscal.org
            </div>
          </div>
        </div>
      </div>
      <!-- footer -->
      <div class="footer">
        <div class="row q-pt-lg q-pb-lg">
          <div class="col-md">
            <div class="copy_right q-pa-md">
              Copyright All Rights Reserved @2021
            </div>
          </div>

          <div class="col-md ">
            <div class="row  float-right">
              <div class="q-pa-md">
                <div class="copy_right">
                  Privacy Policy
                </div>
              </div>
              <div class="q-pa-md">
                <div class="copy_right float-right">
                  Terms of Use
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    SideNavLogos: require("src/components/SideNavLogos").default,
    Carousel: require("src/components/Carousel").default,
    LanguageSelection: require("src/components/LanguageSelection").default
  },
  mounted() {},
  methods: {
    scrollMeTo(refName) {
      let element = this.$refs[refName];

      let top = element.offsetTop;

      window.scrollTo(0, top);
    }
  }
};
</script>

<style scoped>
.WeMast_Dashboard_logos {
  height: 36px;

  margin-right: 5px;
}
@media screen and (min-width: 600px) {
  .WeMast_Dashboard_logos {
    height: 50px;
    margin-top: 10px;
    margin-right: 20px;
  }
}
.nav-icons {
  margin-right: 40px;
}
@media screen and (min-width: 600px) {
  .nav-icons {
    margin-right: 60px;
  }
}
.banner {
  background-color: #2e3192;
  min-height: 447px;
  /* border-radius: 10px; */
}
.bulb-img {
  width: 103.3px;
  height: 103.3px;

  object-fit: contain;
}
.banner-content {
  font-family: Roboto;
  font-size: 64px;
  margin: 51.6px 0 19px 53.6px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.2;
  letter-spacing: normal;
  text-align: left;
  color: #ffffff;
}
@media screen and (min-width: 600px) {
  /* .banner-content {
    font-family: Helvetica;
    font-size: 56px;

    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.2;
    letter-spacing: normal;
    text-align: left;
    color: #ffffff;
  } */
}
.abbreviation {
  font-weight: bold;
  color: #1481c3;
}
.action-button {
  width: 247px;
  height: 61px;
  margin-left: 51px;
  margin-top: 19px;
  margin-bottom: 19px;
  padding: 19px 44px 18px 45px;
  border-radius: 37px;
  border: solid 4px #1481c3;
}

.highlight-icon {
  width: 32.3px;
  height: 32.3px;
  margin-right: 1.5px;

  object-fit: contain;
  color: #2e3192;
}
.title {
  font-family: Montserrat;
  font-size: 17px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.18;
  letter-spacing: normal;

  color: #2e3192;
}
.highlight-text {
  font-family: Montserrat;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.18;
  letter-spacing: normal;
  text-align: left;
  color: #707070;
}

@media screen and (min-width: 769px) {
  .highlghts {
    display: flex;
    justify-content: space-evenly;
  }
}

.hightlight-item {
  width: 100%;
  height: 189px;
  object-fit: fill;
}
.sadc-title {
  font-family: Montserrat;
  font-size: 50px;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  text-align: left;
  color: #323690;
}
.sadc-heading {
  font-family: Roboto;
  font-size: 30px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.3;
  letter-spacing: normal;
  text-align: left;
  color: #050000;
}
.sadc-text {
  font-family: Roboto;
  font-size: 30px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.3;
  letter-spacing: normal;
  text-align: left;
  color: #707070;
}
.sadc-img {
  width: 100%;

  object-fit: contain;
}
.sadc_icons {
  font-size: 18px;
  margin-bottom: 2px;
}
.river-basin-title {
  font-family: Roboto;
  font-size: 50px;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  text-align: left;
  color: #323690;
}
.river-basin-heading {
  font-family: Roboto;
  font-size: 30px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.3;
  letter-spacing: normal;
  text-align: left;
  color: #050000;
}
.basin-images {
  width: 100%;
  height: 100%;
  /* object-fit:contain; */
}
.basin-content {
  font-family: Roboto;
  font-size: 23px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.22;
  letter-spacing: normal;
  text-align: left;
  color: #707070;
  padding: 30px;
}
.basin-row-title {
  font-family: Roboto;
  font-size: 40px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  text-align: left;
  color: #323690;
  margin-top: 20px;
  padding: 30px 0px 0px 30px;
}
.basin-wrapper {
  background-color: #e4e4e4;
  height: 100%;
  padding: 10px;
}
.basin-wrapper-limpopo {
  padding: 10px;
  height: 100%;
  background-color: #353996;
}
.basin-row-title-limpopo {
  font-family: Roboto;
  font-size: 40px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  text-align: left;
  color: #1481c3;
  padding: 30px 0px 0px 30px;
}
.basin-content-white {
  font-family: Roboto;
  font-size: 23px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.22;
  letter-spacing: normal;
  text-align: left;
  color: #ffffff;
  padding: 30px;
}
.basin-wrapper-zambezi {
  padding: 10px;
  background-color: #1481c3;
  height: 100%;
}

.project-logo {
  height: 73.8px;
  object-fit: contain;
}
@media screen and (max-width: 600px) {
  .partner-logos {
    height: 93.8px;
    width: 100%;
    object-fit: contain;
  }
}
.partner-logos {
  height: 93.8px;
  object-fit: contain;
}
@media screen and (min-width: 769px) {
  .project-logo {
    height: 93.8px;

    object-fit: contain;
  }
  .project-name {
    float: right;
  }
}

.basin-links {
  /* margin: 154.6px 0 112px; */
  padding: 10px;
  background-color: #151548;
}
.basin_name_link {
  /* height: 46px; */
  cursor: pointer;
  font-family: Roboto;
  font-size: 30px;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.3;
  letter-spacing: normal;
  text-align: left;
  color: #ffffff;
}
.basin_line {
  width: 324.4px;
  height: 0;
  margin: 1.7px 3.6px 0 0;
  border: solid 1px #ffffff;
}
.footer {
  background-color: #05051f;
}
.copy_right {
  font-family: Roboto;
  font-size: 21px;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  text-align: left;
  color: #ffffff;
}
/* class to show active  */
.active {
  border-bottom: solid 3px #1481c3;
  padding-bottom: 6px;
}
.button-text {
  font-size: 19px;
  margin-top: -4px;
}
.sadc-images {
  margin-bottom: 135px;
}
.label_title {
  color: black;
}
</style>
