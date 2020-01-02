<template lang='pug'>
  .d-flex
    .p-2.flex-fill.bd-highlight
      form.d-flex.flex-column
        .form-group.mx-sm-3.mb-2.p-2.bd-highlight
          label.sr-only Country
          input.form-control(type='text' placeholder='Country' v-model.lazy='country')
        .form-group.mx-sm-3.mb-2.p-2.bd-highlight
          label.sr-only(for='city') City
          input.form-control#city(type='text' placeholder='City' v-model.lazy='city')
        .form-group.mx-sm-3.mb-2.p-2.bd-highlight
          label.sr-only(for='address') Address
          input.form-control#address(type='text' placeholder='Address' v-model.lazy='address')

    customMap.col-7.mr-2.flex-fill.bd-highlight(
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
  public draggableMark: boolean = true;
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

  /**
   * Class constructor.
   */
  constructor() {
    super();
  }

  get searchedAddress() {
    return `${this.country} , ${this.city} ,${this.address} `;
  }
}
</script>

<style lang='stylus' scoped>
input,
select,
option
	border none
	outline none
	background none
	font-family "Open Sans", Helvetica, Arial, sans-serif
input, select,option
	display block
	width 100%
	margin-top 5px
	padding-bottom 5px
	font-size 16px
	border-bottom 1px solid rgba(0, 0, 0, 0.4)
	text-align center
.form-control
	&:focus
		box-shadow none!important
</style>
