# Modal Component


## Description
 Use default modal component and add slots for header, body and footer.

## Example

```html
<template lang="pug">
  div
    button.btn-blue#openModal(@click="toggleModal") Open modal
    h3 {{notes}}
    modal(v-if="isModalVisible" @close="toggleModal")
      template(slot="header")
        span ADDITIONAL NOTES
      template#modalMain(slot="body")
        textarea#modalNotes(
          placeholder="e.g: Tell us about the modal body"
          rows="7"
          v-model="notes"
        )
      template(slot='footer')
        button.btn-blue(
          type='button'
          @click='save'
          aria-label='Close modal'
          ) SAVE
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Modal from '../components/modal/Modal.vue';

@Component({
  components: {
    Modal,
  },
})
export default class ModalView extends Vue {
  public isModalVisible: boolean = false;
  public notes: string = '';

  constructor() {
    super();
  }

  public toggleModal(): void {
    this.isModalVisible = !this.isModalVisible;
  }

  save() {
    this.toggleModal();
  }
}
</script>
```

## Preview
![modal](https://user-images.githubusercontent.com/43200472/71620187-396faa00-2bd1-11ea-99eb-85fdc39e634d.PNG)
