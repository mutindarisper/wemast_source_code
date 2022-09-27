<script>
import { Bar } from "vue-chartjs";
import Chart from "chart.js";

export default {
  extends: Bar,
  props: {
    BarData: {
      type: Object
    }
  },
  data() {
    return {
      options: {
        legend: {
          display: false,
          position: "right",
          labels: {
            fontColor: "black"
          }
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                callback: function(label, index, labels) {
                  return +label / 1000000 + ` km2`;
                }
              },
              scaleLabel: {
                display: true,
                labelString: "Area in  km2"
              },
              gridLines: {
                display: true
              }
            }
          ],
          xAxes: [
            {
              ticks: {
                callback: function(label) {
                  if (/\s/.test(label)) {
                    return label.split(" ");
                  } else {
                    return label;
                  }
                }
              }
            }
          ]
        },
        plugins: {
          datalabels: {
            formatter: (value, ctx) => {
              let sum = 0;
              let dataArr = ctx.chart.data.datasets[0].data;
              dataArr.map(data => {
                sum += +data;
              });
              let percentage = ((value * 100) / sum).toFixed(0) + "%";
              console.log("percentage ", dataArr);

              if ((value * 100) / sum > 3) {
                return percentage;
              } else {
                return "";
              }
            },
            color: "black"
          }
        },
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              //get the concerned dataset
              var dataset = data.datasets[tooltipItem.datasetIndex];
              //calculate the total of this data set
              var total = dataset.data.reduce(
                (previousValue, currentValue) => +previousValue + +currentValue
              );
              //get the current items value
              var currentValue = dataset.data[tooltipItem.index];
              //calculate the precentage based on the total and current item, also this does a rough rounding to give a whole number
              var percentage = ((currentValue / total) * 100).toFixed(0);
              return `${data.labels[tooltipItem.index]} ${(
                currentValue / 1000000
              ).toFixed(2)} km2 (${percentage} %)`;
            }
          }
        }
      }
    };
  },
  props: {
    Stats: {
      type: Object
    }
  },

  watch: {
    Stats: {
      // immediate:true,
      deep: true,
      handler(val) {
        this.createChart();
      },
      deep: true
    }
  },
  mounted() {
    this.createChart();
  },
  methods: {
    createChart() {
      if (!("stats" in this.Stats)) return;
      Chart.defaults.global.plugins.datalabels.display = true;
      const { chart_stats } = this.Stats;
      let chartData = {};
      const data = [];
      const chart_labels = [];
      const datasets = [];
      const borderColor = [];
      const backgroundColor = [];

      chart_stats.forEach((stat, i) => {
        data.push(stat.nb.toFixed(2)); //get all the data
        borderColor.push(stat.color);
        backgroundColor.push(stat.color);
        chart_labels.push(stat.label);
      });

      datasets[0] = {
        borderWidth: 1,
        borderColor,
        backgroundColor,
        data
      };
      chartData = { labels: chart_labels, datasets };
      Chart.defaults.global.plugins.datalabels.display = false;
      this.renderChart(chartData, this.options);
    }
  }
};
</script>
