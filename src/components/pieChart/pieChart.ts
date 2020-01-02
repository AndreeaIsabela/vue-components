import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class PieChartComponent extends Vue {

  @Prop({ default: () => [] })
  data!: []

  /**
   * Class constructor.
   */
  constructor() {
    super();
  }

  get style () :any{
    let sum = 0;
    let styles = this.data.map(
      (percent: any) => `${percent.color} 0 ${(sum += percent.value)}%`
    );

    return {
      background: `conic-gradient( ${styles.join(",")} )`,
    };
  }

}
