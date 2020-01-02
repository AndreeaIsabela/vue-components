# Pie Chart Component


## Props
- **data: IPieDataObject[]**

## Example

```html
<template lang="pug">
  div
    PieChart(:data="data")
<template>

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
    public data: IPieDataObject[] =  [
      { color: "#00ADEF", value: 10 },
      { color: "#ED008C", value: 5 },
      { color: "#00FCD4", value: 15 },
      { color: "#FF7E4C", value: 30 },
      { color: "#850082", value: 40 }
    ];

    constructor() {
      super();
    }
  }
</script>
```

## Preview
![pieChart](https://user-images.githubusercontent.com/43200472/71620047-493abe80-2bd0-11ea-86f5-b4c30bb726ef.PNG)
