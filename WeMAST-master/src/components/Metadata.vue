<template>
  <div class="q-pa-sm">
    <table class="q-mt-sm">
      <tr>
        <td class="text-weight-bold">Title</td>
        <td>{{ metadata.title }}</td>
      </tr>
      <tr>
        <td class="text-weight-bold">Description</td>
        <td>{{ metadata.description }}</td>
      </tr>
      <tr>
        <td class="text-weight-bold">Extent</td>
        <td>
          <tr>
            <td>Western-most Longitude</td>
            <td>{{ extent.Western_most_longitude | formatPrecision}} &deg;</td>
          </tr>
          <tr>
            <td>Northern-most Latitude</td>
            <td>{{ extent.Northern_most_latitude | formatPrecision}} &deg;</td>
          </tr>
          <tr>
            <td>Eastern-most Longitude</td>
            <td>{{ extent.Eastern_most_longitude | formatPrecision}} &deg;</td>
          </tr>
          
          <tr>
            <td>Southern-most Latitude</td>
            <td>{{ extent.Southern_most_latitude | formatPrecision }} &deg;</td>
          </tr>
          
        </td>
      </tr>
      <tr>
        <td class="text-weight-bold">Resolution</td>
        <td>{{ metadata.resolution  }} Meters</td>
      </tr>

       <tr>
        <td class="text-weight-bold">CRS</td>
        <td>{{ metadata.crs  }}</td>
      </tr>

      <tr>
        <td class="text-weight-bold">Date Created</td>
        <td>{{ metadata.dateCreated | formatDate }}</td>
      </tr>
      <tr>
        <td class="text-weight-bold">Region</td>
        <td>{{ metadata.region }}</td>
      </tr>
      <tr>
        <td class="text-weight-bold">Tags</td>
        <td>{{ metadata.tags }}</td>
      </tr>
      <tr>
        <td class="text-weight-bold">Encoding</td>
        <td>{{ metadata.encoding }}</td>
      </tr>
      <tr>
        <td class="text-weight-bold">Format</td>
        <td>{{ metadata.format }}</td>
      </tr>
      <tr>
        <td class="text-weight-bold">Data Type</td>
        <td>{{ metadata.dataType }}</td>
      </tr>
      <tr>
        <td class="text-weight-bold">Geo Position</td>
        <td>{{ geoposition.lon | formatPrecision }} &deg;, {{ geoposition.lat | formatPrecision }} &deg; </td>
      </tr>
      <tr>
        <td class="text-weight-bold">Theme</td>
        <td>{{ metadata.theme }}</td>
      </tr>
      <tr>
        <td class="text-weight-bold">Keyword</td>
        <td>{{ metadata.keyword }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    metadata: Object
  },
  data() {
    return {};
  },
  computed: {
    extent() {
      const logitudes = this.metadata.extent.map(coords => {
        return coords[0];
      });
      const latitudes = this.metadata.extent.map(coords => {
        return coords[1];
      });
      return {
        Western_most_longitude: logitudes.sort()[0],
        Eastern_most_longitude: logitudes.sort()[logitudes.length - 1],
        Southern_most_latitude: latitudes.sort()[0],
        Northern_most_latitude: latitudes.sort()[latitudes.length - 1]
      };
    },
    geoposition(){
      const lon = parseFloat(this.metadata?.geoposition?.split(" ")[0]);
      const lat= parseFloat(this.metadata?.geoposition?.split(" ")[1]);
      return {lon,lat}
    }

  },
  filters: {
    formatDate(value) {
      return new Date(value).toLocaleString();
    },
    formatPrecision(value){
      return value.toFixed(2)
    }
  }
};
</script>

<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
     
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>
