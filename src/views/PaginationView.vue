<template lang="pug">
  div.offset-1
    Pagination(:totalPages="totalPages" :maxVisibleButtons="3")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Pagination from '../components/pagination/Pagination.vue';

@Component({
  components: {
    Pagination
  },
})
export default class PaginationView extends Vue {

  public totalPages: number = 10;
  /**
   * Class constructor.
   */
  constructor() {
    super();
  }

}
</script>

<style lang="stylus" scoped>
  .pagination
    margin-top: 80px
</style>
