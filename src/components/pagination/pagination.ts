import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class Pagination extends Vue {

  public currentPage: number = 1;
  /**
   * Class constructor.
   */
  constructor() {
    super();
  }

  @Prop({ type: Number, required: true })
  totalPages: number = 0;

  @Prop({ type: Number })
  maxVisibleButtons: number = 3;

  get startPage(): number {
    // When on the first page
    if (this.currentPage === 1) {
      return 1;
    }
    // When on the last page
    if (this.currentPage === this.totalPages) {
      return this.totalPages - this.maxVisibleButtons + 1;
    }
    // When in between
    return this.currentPage - 1;
  }

  get pages() {
    const range: any[] = [];

    for (let i = this.startPage; i <= Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages); i++ ) {
      range.push({
        name: i,
        isDisabled: i === this.currentPage
      });
    }

    return range;
  }

  get isInFirstPage() {
    return this.currentPage === 1;
  }

  get isInLastPage() {
    return this.currentPage === this.totalPages;
  }

  public containsPage(pageNo: number): boolean {
    return  this.pages.some(element => element.name === pageNo);
  }

  public isPageActive(page: number): boolean {
    return this.currentPage === page;
  }

  public onClickFirstPage(): void {
    this.$emit('pagechanged', 1);
    this.currentPage = 1;
  }

  public onClickPreviousPage(): void {
    this.$emit('pagechanged', this.currentPage - 1);
    this.currentPage -= 1;
  }

  public onClickPage(page: number): void {
    this.currentPage = page;
    this.$emit('pagechanged', page);
  }

  public onClickNextPage(): void {
    this.$emit('pagechanged', this.currentPage + 1);
    this.currentPage += 1;
  }

  public onClickLastPage(): void {
    this.$emit('pagechanged', this.totalPages);
    this.currentPage = this.totalPages;
  }
}

