import { Component, Watch, Prop, Vue } from 'vue-property-decorator';
import { create, color, Scrollbar, Rectangle, options, Circle } from '@amcharts/amcharts4/core';
import { Bullet, XYCursor, XYChart, Legend, DateAxis, ValueAxis, LineSeries } from '@amcharts/amcharts4/charts';


@Component({})
export default class LineChartComponent extends Vue {
  public chart: any = null;

  private colorList: string[] = [
    '#24262B',
    '#ED008C',
    '#00FCD4',
    '#FF7E4C',
    '#850082',

  ];

  @Prop({ default: () => [] })
  categories!: string[];

  @Prop({ default: () => [] })
  data!: any[];

  @Prop({ default: 'chartdiv' })
  name!: string

  @Watch('data')
  async onDataChange(): Promise<void> {
    await this.$nextTick();
    this.initLineChart();
  }

  /**
   * Class constructor.
   */
  constructor() {
    super();
  }

  /**
  * Created lifecycle hook.
  *
  * @returns {Promise<void>}
  */
  public async mounted(): Promise<void> {
    await this.initLineChart();
  }

  /**
   * Before destroy lifecycle hook.
   *
   * @returns {void}
   */
  beforeDestroy(): void {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  /**
   * Initialize the Line Chart.
   *
   * @returns {Promise<void>}
   */
  async initLineChart(): Promise<void> {
    this.chart = create(`chart-${this.name}`, XYChart);
    this.chart.responsive.enabled = true;
    // Set input format for the dates
    this.chart.dateFormatter.inputDateFormat = 'yyyy-MM-dd';
    // Create axes
    const dateAxis = this.chart.xAxes.push(new DateAxis());
    dateAxis.renderer.minGridDistance = 50;
    const valueAxis = this.chart.yAxes.push(new ValueAxis());
    valueAxis.cursorTooltipEnabled = false;
    // Add data
    this.chart.data = this.data;

    const categoriesLength: number = this.categories.length;

    for (let i: number = 0; i < categoriesLength; i++) {
      this.createSeries(this.categories[i], this.colorList[i]);
    }

    this.setChartCursor();

    this.chart.legend = new Legend();
    this.chart.scrollbarX = new Scrollbar();
  }

  /**
   * Create series for the given category.
   *
   * @param {string} category
   * @param {string} seriesColor
   * @returns {void}
   */
  private createSeries(category: string, seriesColor: string): void {
    options.queue = true;
    options.minPolylineStep = 5;
    options.onlyShowOnViewport = true;
    const series = this.chart.series.push(new LineSeries());
    series.dataFields.valueY = category;
    series.dataFields.dateX = 'date';
    series.name = category;
    series.stroke = color(seriesColor);
    series.strokeWidth = 3;
    series.stacked = false;
    series.minBulletDistance = 20;
    series.tooltip.fontSize = '12px';
    series.tooltipText = '{name}: [bold]{valueY}[/]';
    series.fill = color(seriesColor);

    let bulletType: string = 'circle';

    this.setSeriesBullets(series, bulletType);
    this.chart.invalidateData();
  }

  /**
   * Set the bullets for the given series.
   *
   * @param {any} series
   * @param {string} bulletType
   * @returns {void}
   */
  private setSeriesBullets(series: any, bulletType: string): void {
    let bullet;

    if (bulletType === 'circle') {
      const white = '#fff';
      bullet = series.bullets.push(new Circle());
      bullet.strokeWidth = 2;
      bullet.radius = 5;

      bullet.fill = color(white);
    } else if (bulletType === 'rectangle') {
      bullet = series.bullets.push(new Bullet());
      const rectangle = bullet.createChild(Rectangle);
      bullet.horizontalCenter = 'middle';
      bullet.verticalCenter = 'middle';
      bullet.width = 8;
      bullet.height = 8;
      rectangle.width = 8;
      rectangle.height = 8;
    }

    const bullethover = bullet.states.create('hover');
    bullethover.properties.scale = 1.3;
  }

  /**
   * Set the cursor for Line Chart.
   *
   * @returns {void}
   */
  private setChartCursor(): void {
    const red = '#E70036';
    this.chart.cursor = new XYCursor();
    this.chart.cursor.lineX.stroke = color(red);
    this.chart.cursor.lineX.strokeDasharray = '';
    this.chart.cursor.lineY.disabled = true;
  }
}
