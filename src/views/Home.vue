<template lang="pug">
  .home
    h1 This is the home component
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Home extends Vue {
  /**
   * Class constructor.
   */
  constructor() {
    super();
  }
}
</script>
