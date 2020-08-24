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
  totalPages;

  @Prop({ type: Number })
  maxVisibleButtons;

  get startPage(): number {
    // When the first page is selected
    if (this.currentPage === 1) {
      return 1;
    }
    // When the last page is selected
    if (this.currentPage === this.totalPages) {
      return this.totalPages - this.maxVisibleButtons + 1;
    }
    // When another page is selected
    return this.currentPage - 1;
  }

  get pages(): any[] {
    const range: any[] = [];

    for (let i = this.startPage; i <= Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages); i++) {
      range.push({
        index: i,
        isDisabled: i === this.currentPage
      });
    }

    return range;
  }

  get isOnFirstPage(): boolean {
    return this.currentPage === 1;
  }

  get isOnLastPage(): boolean {
    return this.currentPage === this.totalPages;
  }

  public containsPage(pageNo: number): boolean {
    return this.pages.some(element => element.index === pageNo);
  }

  public isPageActive(page: number): boolean {
    return this.currentPage === page;
  }

  public onClickFirstPage(): void {
    this.$emit('PageWasChanged', 1);
    this.currentPage = 1;
  }

  public onClickPreviousPage(): void {
    this.$emit('PageWasChanged', this.currentPage - 1);
    this.currentPage -= 1;
  }

  public onClickPage(page: number): void {
    this.$emit('PageWasChanged', page);
    this.currentPage = page;
  }

  public onClickNextPage(): void {
    this.$emit('PageWasChanged', this.currentPage + 1);
    this.currentPage += 1;
  }

  public onClickLastPage(): void {
    this.$emit('PageWasChanged', this.totalPages);
    this.currentPage = this.totalPages;
  }
}

