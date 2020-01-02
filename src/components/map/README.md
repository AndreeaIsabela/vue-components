# Map Component

## Props
- **markList: IMark[]**
- **apiKey: string**
- **draggable-mark: boolean**
- **get-geocode: boolean**
- **searched-address: boolean**

## Example

```html
<template lang='pug'>
    customMap(
      v-if="city.length && country.length"
      :markList.sync="markers"
      :apiKey="apiKey"
      :draggable-mark="draggableMark"
      :get-geocode="getGeocode"
      :searched-address="searchedAddress"
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
  public draggableMark: boolean = false;
  public getGeocode: boolean = true;
  public country: string = 'Romania';
  public address: string = 'Nicolae Romanescu';
  public city: string = 'Craiova';
  public apiKey: string = 'your google map api';

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

  constructor() {
    super();
  }

  get searchedAddress() {
    return `${this.country} , ${this.city} ,${this.address} `;
  }
}
</script>
```

## Preview
![map](https://user-images.githubusercontent.com/43200472/71620402-7c7e4d00-2bd2-11ea-8fc0-543ff2a98dbe.PNG)
