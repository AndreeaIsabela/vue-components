# Modal Component


## Description
 Use default pagination component and add the needed properties.

## Example

```html
<template lang="pug">
  Pagination(:totalPages="totalPages" :maxVisibleButtons="maxVisibleButtons")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Pagination from '../components/modal/Modal.vue';

@Component({
  components: {
    Pagination,
  },
})
export default class PaginationView extends Vue {

  public totalPages: number = 10;
  public maxVisibleButtons: number = 3;

  constructor() {
    super();
  }

  public created(): void {
    this.$on("PageWasChanged", (newPage) => {
      console.log(newPage);
    })
  }


}
</script>
```

## Preview
![pagination](https://user-images.githubusercontent.com/26048095/91091631-8f60f880-e65f-11ea-9eef-84958862997b.png)
![pagination](https://user-images.githubusercontent.com/26048095/91092032-19a95c80-e660-11ea-82c2-8989e95597fc.png)
![pagination](https://user-images.githubusercontent.com/26048095/91092051-229a2e00-e660-11ea-801c-579429c1f19f.png)
