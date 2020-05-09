import { Component, Vue, Prop } from "vue-property-decorator";

@Component({})
export default class AlertComponent extends Vue {
  @Prop({ default: "../../assets/logo.png" })
  imgPath!: string;

  @Prop({ default: "success" })
  alertType!: string;

  /**
   * Class constructor.
   */
  constructor() {
    super();
  }
}
