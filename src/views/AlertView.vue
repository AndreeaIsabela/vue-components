<template lang="pug">
  .row
    .offset-2.col-6
      div(v-for="alertType in alertTypes")
        Alert(:alertType="alertType" :imgPath="imgPath")
          template(slot="body")
            span This is an {{alertType}} alert.
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import Alert from "../components/alert/Alert.vue";

@Component({
  components: {
    Alert
  }
})
export default class AlertView extends Vue {
  public imgPath: string = '../../assets/logo.png';
  public alertTypes: string[] = [
  'warning',
  'danger',
  'success',
  'important'
  ]

  /**
   * Class constructor.
   */
  constructor() {
    super();
  }
}
</script>

<style lang="stylus" scoped>
.alert
  margin-top: 80px
</style>
