<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: "App",

  data() {
    return {
      myIcons: {
        "app:arr_down": "img:uiIcons/arrow_drop_down_circle.png"
      }
    };
  },

  async created() {
    this.$q.iconMapFn = iconName => {
      const icon = this.myIcons[iconName];
      if (icon !== void 0) {
        return { icon: icon };
      }
    };
    //get the backend api url from the settings.json

    const res = await fetch("settings/settings.json");
    const data = await res.json();
    this.$store.dispatch("settings/set_backend_url", data);

  
  },
  mounted() {
    this.$q.iconSet.arrow.dropdown = "app:arr_down";
  }
};
</script>
<style>
.q-virtual-scroll__content {
  background-color: steelblue;
}

.q-item__label {
  color: white;
  padding: 15px;
  border-top: 1px solid white;
}
</style>
