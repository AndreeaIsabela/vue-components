# Line Chart Component

## Props
- **categories: string[]**
- **data: any[]**
- **name: string**

## Example

```html
<template lang="pug">
  LineChart(:data="data" :categories="categories" :name="'example'")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import LineChart from '../components/lineChart/LineChart.vue';

@Component({
  components: {
    LineChart
  }
})
export default class LineChartView extends Vue {
  public data: any[] = [];
  public categories: string[] = ['value1', 'value2', 'value3', 'value4'];

  constructor() {
    super();
  }

  mounted() {
    let value1: number = 50340;
    let value2: number = 714780;
    let value3: number = 214650;
    let value4: number = 931040;
    for (let index = 0; index < 300; index++) {
      let date: Date = new Date();
      date.setHours(0, 0, 0, 0);
      date.setDate(index);
      value1 -= this.getRandomNumber();
      value2 -= this.getRandomNumber();
      value3 -= this.getRandomNumber();
      value4 -= this.getRandomNumber();
      this.data.push({ date, value1, value2, value3, value4 });
    }
  }

  private getRandomNumber(): number {
    return Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 358840);
  }

}
</script>
```

## Preview
![lineChart](https://user-images.githubusercontent.com/43200472/71620474-e5fe5b80-2bd2-11ea-895e-3496b99b473a.PNG)
