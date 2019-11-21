import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Modal extends Vue {

  /**
   * Class constructor.
   */
  constructor() {
    super();
  }
  close() {
    this.$emit('close');
  }
};