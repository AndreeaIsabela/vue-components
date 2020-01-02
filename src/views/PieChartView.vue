<template lang="pug">
  .col-2.offset-5
    PieChart(:data="data")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { IPieDataObject } from '../types/IPieData'
import PieChart from '../components/pieChart/PieChart.vue';

@Component({
  components: {
    PieChart,
  },
})
export default class PieChartView extends Vue {

  public data :IPieDataObject[] =  [
      { color: "#00ADEF", value: 10 },
      { color: "#ED008C", value: 5 },
      { color: "#00FCD4", value: 15 },
      { color: "#FF7E4C", value: 30 },
      { color: "#850082", value: 40 }
    ];

  /**
   * Class constructor.
   */
  constructor() {
    super();
  }

}
</script>

<style lang="stylus" scoped>
  .pie-chart
    margin-top: 80px
    width: 200px
    height: 200px
</style>
