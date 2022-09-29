<template>
  <div class="q-pa-none sticky">
    <div class="row q-mb-sm">
      <div class="co">
        <img :src="require('assets/logos/SASSCAL.png')" class="WeMast_Img" />
      </div>
      <div class="col-md  WeMast_title ">
        <label class="text-weight-bold "> {{ $t("wemast_title") }}</label>
        <span class="text-primary text-weight-bold">(WeMAST 2.0)</span>
      </div>
      <div class="col-md  WeMast_top_logos" style="height:20px;">
        <MainNavLogos class="" />
      </div>

      <div class="  WeMast_right_items ">
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
          </div>
          <div class="q-pa-xs">
            <!-- :select -->
            <!-- <LanguageSelection /> -->
          </div>
          <!-- <Login/> -->
        </div>
      </div>
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
.WeMast_Img {
  height: 75px;
  margin-left: 8px;
  margin-right: 35px;
  margin-top: 20px;
}
.WeMast_title {
  margin-top: 45px;
}
@media screen and (min-width: 1440px) {
  .WeMast_title {
    margin-top: 40px;
    font-size: 16px;
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
