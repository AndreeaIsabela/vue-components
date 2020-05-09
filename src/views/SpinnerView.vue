<template lang="pug">
  div.offset-1
    Spinner
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Spinner from '../components/spinner/Spinner.vue';

@Component({
  components: {
    Spinner,
  },
})
export default class SpinnerView extends Vue {
  /**
   * Class constructor.
   */
  constructor() {
    super();
  }

}
</script>

<style lang="stylus" scoped>
  .spinner
    margin-top: 80px
    width: 200px
    height: 200px
</style>
