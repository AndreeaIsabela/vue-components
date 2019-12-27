<template lang="pug">
  #app.d-flex
    sidebar.p-2.col-5.flex-fill.bd-highlight
    router-view#content.col-8.mr-2.flex-fill.bd-highlight
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Sidebar from './components/sidebar/Sidebar.vue';

@Component({
  components: {
    Sidebar,
  },
})
export default class App extends Vue {
  /**
   * Class constructor.
   */
  constructor() {
    super();
  }
}
</script>

<style lang="stylus">
#content
  margin-top: 100px
</style>
