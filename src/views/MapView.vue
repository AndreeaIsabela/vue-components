<template lang='pug'>
  div
    customMap(
      :markList.sync="markers"
      :apiKey="apiKey"
      :draggableMark="draggableMark"
    )
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';

import CustomMap from '../components/map/Map.vue';
import { IMark } from '../types/IMark';

@Component({
  components: {
    CustomMap
  }
})
export default class MapView extends Vue {
  public draggableMark: boolean = true;
  public apiKey: string = 'AIzaSyCorj-5A0oaI6unHBPrOsUVHKLpKxh1_uE';

  public markers: IMark[] = [
    {
      position: {
        lat: 44.318378,
        lng: 23.796400
      },
      id: '1'
    },
    {
      position: {
        lat: 46.195992,
        lng: 21.287560
      },
      id: '2'
    }
  ];

  /**
   * Class constructor.
   */
  constructor() {
    super();
  }
}
</script>

<style lang='stylus' scoped></style>
