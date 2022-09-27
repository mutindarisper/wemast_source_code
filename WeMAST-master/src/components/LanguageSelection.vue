<template>
  <div class="q-pa-none">
    <q-select
      dense
      v-model="locale"
      @input="setLocale"
      :options="[
        { label: 'English', value: 'en-us' },
        { label: 'Français', value: 'fr' },
        { label: 'Portuguese', value: 'pt' }
      ]"
      :label="$t('wemast_change_language')"
      stack-label
      :options-dense="true"
      style="width:118px;"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      locale: "English"
    };
  },
  mounted(){
      this.getUserLanguage();
  },
  methods: {
    setLocale(locale) {
      this.$i18n.locale = locale.value;
      import(`quasar/lang/${locale.value}`).then(language => {
        this.$q.lang.set(language.default);
      });
      localStorage.setItem("language", JSON.stringify(locale));
    },
     getUserLanguage() {
      if(process.env.DEV)console.log("language ", localStorage.getItem("language"));
      if (localStorage.getItem("language")) {
        const locale = JSON.parse(localStorage.getItem("language"));
        this.locale = locale.label;
        this.setLocale(locale);
      }
    },
  }
};
</script>

<style></style>
