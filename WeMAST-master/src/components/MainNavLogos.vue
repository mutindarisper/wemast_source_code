<template>
  <div class="row">
    <div class="col2" id="logos">
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

      <img
        :src="require('assets/logos/WeMAST.png')"
        class="WeMast_Dashboard_logos" 
      />
    
    </div>
    
    </div>
    <div class="col">
        <!-- <img
        :src="require('assets/logos/WeMAST.png')"
        class="WeMast_Dashboard_logos" 
      /> -->
    </div>
      
   
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
/* style="margin-left:-10%;" */
#logos{
  display: inline-flex;

}

 .WeMast_Dashboard_logos {
  /* background-color: rgb(90, 156, 209); */
    height: 45px;
    /* object-fit: contain; */
    margin: 2px;

  }

</style>
