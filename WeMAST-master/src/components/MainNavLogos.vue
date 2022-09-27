<template>
  <div class="row">
    <div class="col">
      <div class="row" >
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
    <div class="col">
        <img
        :src="require('assets/logos/WeMAST.png')"
        class="WeMast_Dashboard_logos" style="margin-left:30%;"
      />
    </div>
      
   
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
 .WeMast_Dashboard_logos {
    height: 45px;
    object-fit: contain;
    margin: 2px;
  }

</style>
