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

  /**
   * Class constructor.
   */
  constructor() {
    super();
  }

  public toggleModal(): void {
    this.isModalVisible = !this.isModalVisible;
  }

  save() {
    // do smth
    this.toggleModal();
  }
}
</script>

<style lang="stylus" scoped>
  textarea
    -webkit-box-shadow 0px 0px 6px -1px rgba(189, 187, 189, 1)
    -moz-box-shadow 0px 0px 6px -1px rgba(189, 187, 189, 1)
    box-shadow 0px 0px 6px -1px rgba(189, 187, 189, 1)
    width 96%
    border none
    border 1px solid #cecccc
    border-radius 4px
    padding 5px
    resize none
    padding-left 10px
    &::placeholder
      color #cecccc
  .modal-header,
  .modal-footer
    padding 10px 15px 20px 15px
    display flex
  .modal-header
    justify-content space-between
    padding 10px 15px 10px 15px
    span
      padding 5px
      color #cecccc
      font-size small
      cursor default
  .modal-footer
    justify-content flex-end
  .modal-body
    position relative
    padding 0 25px 10px 20px
  .btn-blue
    color: white
    background: #4a72ae
    border: 1px solid #4a72ae
    border-radius: 2px
    padding: 4px 20px
    font-size: x-small
  #openModal
    margin: 100px;
</style>
