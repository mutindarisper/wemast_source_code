<template>
  <div class="q-p">
    <div class="logos_row" >
      <div class="text-weight-bolder text-center" >Technical partners</div>
      <img
        :src="require('assets/logos/bottom.png')"
        class="WeMast_Dashboard_logos"
      />

      <!-- <img
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
      /> -->
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
 .WeMast_Dashboard_logos {
    height: 70px;
    object-fit: contain;
    margin: 2px;
  }
  .logos_row{
     margin-left: 2%;
  }
</style>
