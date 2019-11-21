<template lang="pug">
  #app
    sidebar
    router-view
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
</style>
