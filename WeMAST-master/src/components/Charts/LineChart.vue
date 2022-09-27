<script>
import { Line } from "vue-chartjs";
import Chart from "chart.js";
export default {
  extends: Line,
  props: {
    Stats: {
      type: Object
    }
  },
  data() {
    return {
      options: {
        legend: {
          display: true
          // position: "botton",
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                callback: function(label, index, labels) {
                  return label.toFixed(2);
                }
              },
              scaleLabel: {
                display: true,
                labelString: " "
              },
              gridLines: {
                display: true
              }
            }
          ],
          xAxes: [
            {
              scaleLabel: {
                display: true,
                // labelString: "Years"
              },
              gridLines: {
                display: false
              }
            }
          ]
        },

        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              let label = data.datasets[[tooltipItem.datasetIndex]].label;
              let value =
                data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
              return " " + label + ": " + +value.toFixed(4);
            }
          }
        }
      }
    };
  },
  watch: {
    Stats: {
      deep: true,
      handler(val) {
        if (process.env.DEV) console.log("line data watch", val);
        this.createChart();
      }
    }
  },
  mounted() {
    this.createChart();
  },
  methods: {
    createChart() {
      Array.prototype.sortBy = function(p) {
        return this.slice(0).sort(function(a, b) {
          return a[p] > b[p] ? 1 : a[p] < b[p] ? -1 : 0;
        });
      };
      if (process.env.DEV) console.log("line data create", this.Stats);
      Chart.defaults.global.plugins.datalabels.display = false;
      if (!("stats" in this.Stats)) return;
      let statistics = this.Stats.stats;
      // return
      let stats = statistics.sortBy("year");
      const datasets = {
        min: {
          label: "min",
          data: [],
          fill: false,
          borderColor: "blue"
        },
        max: {
          label: "max",
          data: [],
          fill: false,
          borderColor: "red"
        },
        mean: {
          label: "mean",
          data: [],
          fill: false,
          borderColor: "green"
        }
      };
      let labels = [];
      stats.forEach(stat => {
        let keys = Object.keys(stat);
        let is_array = false;
        keys.forEach(key => {
          datasets[key]?.data.push(stat[key]);
          //

          if (Array.isArray(stat[key])) {
            is_array = true;
            datasets[key].data = [];
            for (let i = 0; i < stat[key].length; i++) {
              datasets[key]?.data.push(+stat[key][i].toFixed(2));
            }
          }
        });
        labels.push(stat.year);
        if (is_array) {
          labels = [];
          const months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "June",
            "July",
            "Aug",
            "Sept",
            "Oct",
            "Nov",
            "Dec"
          ];

          months.forEach(month => {
            labels.push(month);
          });
        }
      });
      const lineChartData = {
        labels,
        datasets: [datasets.min, datasets.mean, datasets.max]
      }; //declare an object
      if (process.env.DEV) console.log(lineChartData, " keys line data");
      this.renderChart(lineChartData, this.options);
    }
  }
};
</script>
