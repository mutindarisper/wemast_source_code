<template>
  <div class="q-pa-none sticky">
    <div class="row q-mb-sm" id="navigation">
      <div class="co">
        <img :src="require('assets/logos/WeMAST.png')" class="WeMast_Img" />
      </div>
      <!-- <span id="wemast_2" class="text-weight-bold">WeMAST</span> -->
      <div class="col-md  WeMast_title ">
        
        <label class="text-weight-light" id="wemast_2"> {{ $t("wemast_title") }}</label>
      </div>
        <label for="" class="wemast_sub">{{$t("wemast_subtitle")}} <span class="wemast_bracket">{{$t("wemast_bracket")}}</span></label>
        
        <!-- <span id="wemast_2" class="text-primary text-weight-bold">WeMAST 2.0</span> -->
     
      <div class="col-md  WeMast_top_logos" style="height:20px; ">
        <MainNavLogos class="logos_main" />
      </div>
      <div class="q-pa-xs" id="change_lang"> 
             <!-- :select  -->
             <LanguageSelection /> 
           </div>

      <!-- <div class="  WeMast_right_items ">
        <div class="row float-right" >
          <div
            class="q-pa-sm q-mr-md wemast_nav_icons"
          >
            <router-link to="/">
              <q-icon
                color="primary"
                name="img:/uiIcons/home-inactive.svg"
                size="37px"
              />
            
            </router-link>
              <br />
              <label class="label_title">Home</label>
          </div>
          <div
            class=" q-pa-sm q-mr-md wemast_nav_icons"
          >
            <q-icon
            class="q-ml-md"
              color="primary"
            :name="$route.path === '/dashboard' ?'img:/uiIcons/dashboard-24px.svg':'img:/uiIcons/dashboard-inactive.svg'"
              size="37px"
            />
               <br />
              <label class="label_title">Dashboard</label>
          </div>
          <div
            class="q-pa-sm q-mr-md wemast_nav_icons"
            @click="show_login_form"
          >
            <a :href="'http://169.1.31.169/bkeadmin/'">
              <q-icon
                color="primary"
                name="img:/uiIcons/person-inactive.svg"
                size="37px"
              />
            </a>
               <br />
              <label class="label_title">Admin</label>
          </div>
          <div class="q-pa-sm q-mr-md wemast_nav_icons"> 
            <a :href="'http://169.1.31.169/bkeadmin/#/search'">
              <q-icon
                color="primary"
                name="img:/uiIcons/search-inactive.svg"
                size="37px"
              />
            </a>
               <br />
              <label class="label_title">Search</label>
          </div> -->
          <!-- <div class="q-pa-xs"> -->
            <!-- :select -->
            <!-- <LanguageSelection /> -->
          <!-- </div> -->
          <!-- <Login/> -->
        <!-- </div> -->
      <!-- </div> -->
    </div>
    <div class="row">
      <div class="col-md-12">
        <DashboardSelections @handleRequest="handleRequest" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search_text: "", //holds the search text
      show_search: false,
      show_login: false
    };
  },
  components: {
    DashboardSelections: require("src/components/DashboardSelections").default,
    MainNavLogos: require("src/components/MainNavLogos").default,
    Login: require("src/components/Login").default,
    LanguageSelection: require("src/components/LanguageSelection").default
  },

  methods: {
    handleRequest(val) {
      this.$emit("handleRequest", val);
    },
    show_search_input() {
      // this.show_search = !this.show_search;
      // this.$emit("show_search_input", this.show_search);
    },
    show_login_form() {
      // this.show_login = !this.show_login;
      // this.$emit("show_login_form", this.show_login);
    }
  }
};
</script>

<style soped>
#navigation{
  /* background: url('/images/wetland2.PNG'); */
  height: 12vh;
  /* background-clip: content-box; */
  background-repeat: no-repeat;
  background-size: 100vw;
  
}
.WeMast_Img {
  height: 50px;
  margin-left: 5vw;
  margin-right: 35px;
  margin-top: 4vh;
}
.WeMast_title {
  margin-top: 3vh !important;
  position: relative;
  left: 2vw;
  text-transform: uppercase;
}
#wemast_2{
font-size:14px ;
font-weight: 500;
}
.wemast_sub{
  position: absolute;
  top: 6vh;
  left: 12.9vw;
  font-size:14px ;
  font-weight: 500;
}
.wemast_bracket{
  color: #1783c4;
  font-weight: 600;
}
@media screen and (min-width: 1440px) {
  .WeMast_title {
    margin-top: 40px;
    font-size: 20px;
  }
}
.WeMast_search {
  margin-top: 30px;
}
.WeMast_right_items {
  margin-top: 25px;
}
.WeMast_top_logos {
  margin-top: 35px;
}
.logos_main{
  position: absolute;
  top: 4vh;
  z-index: 1000;
  /* display: flex;
  flex-direction: row;
  gap: 1.5rem; */
  /* background-color: rgb(212, 31, 31); */
}
#change_lang{
  position: absolute;
  top: 4vh;
  left: 90vw;
}
.q-select__dropdown-icon {
  transition: transform 0.32s;
  /* color: steelblue; */
}
.sticky {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 3000;
  background-color: white;
}
.wemast_nav_icons {
  cursor: pointer;
}
.active {
  border-bottom: solid 3px #1481c3;
  padding-bottom: 6px;
}
</style>
