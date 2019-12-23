import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import GoogleMapsApiLoader  from 'google-maps-api-loader';

import { IMark, IPosition } from '../../types/IMark';
import { MapContainer } from '../../types/MapContainer';

@Component({})
export default class CustomMap extends Vue {

  @Prop({ default: () => [] })
  markList!: IMark[];

  @Prop({ default: ''})
  apiKey!: string;

  @Prop({ default: false })
  draggableMark!: boolean;

  @Prop({ default: false })
  getGeocode!: boolean;

  @Prop({ default: '' })
  searchedAddress!: string;

  @Watch('searchedAddress')
  onSearchedAddressChange(newVal: string) {
    this.geocodeAddressToLatLng(newVal);
  }

  private markers: any[] = [];
  private map: any;
  private google: any;
  private geocoder: any;
  private marker: any;
  private infowindow: any;

  /**
   * Class constructor.
   */
  constructor() {
    super();
  }

  async mounted() {
    const googleMapApi = await GoogleMapsApiLoader({
      apiKey: this.apiKey
    });
    this.google = googleMapApi;
    this.initMap();
    this.$parent.$on('MapSearch:SearchGeolocation', (locationAddress: string) => {
      this.geocodeAddressToLatLng(locationAddress);
    });

    this.$parent.$on('ElementClick:Bounce', (element: IMark) => {
      this.bounce(element);
    });
  }

  /**
   * Change clicked mark animation to bounce.
   *
   * @param {IMark} mark
   * @returns {void}
   */
  private bounce(mark: IMark): void {
    for (let index in this.markers) {
      if (this.markers[index].getTitle() === mark.id) {
        this.markers[index].setAnimation(this.google.maps.Animation.BOUNCE);
      } else {
        this.markers[index].setAnimation(this.google.maps.Animation.DROP)
      }
    }
    this.map.setCenter(mark.position);
    this.map.setZoom(15);
  }

  /**
   * Add a new pin/mark to map.
   *
   * @param {IPosition} position
   * @param {string} id
   * @returns {void}
   */
  private addMark(position: IPosition, id: string): void {
    const marker = new this.google.maps.Marker({
      position,
      map: this.map,
      draggable: this.draggableMark,
      animation: this.google.maps.Animation.DROP,
      title: id
    });

    // emit {lat, lng} object on dragend
    marker.addListener('dragend', (event: any) => {
      const lat: number = event.latLng.lat();
      const lng: number = event.latLng.lng();
      this.$parent.$emit('MapEvent:Geolocation', { lat, lng });
    });

    // emit mark.id when the mark is clicked
    marker.addListener('click', (event: any) => {
      this.$parent.$emit('MapEvent:SendMarkId', id);
      marker.scaledSize = new this.google.maps.Size(1, 30);
      this.map.setCenter(marker.getPosition());
    });
    this.markers.push(marker);
  }

  /**
   * Init the map component with the specified props.
   *
   * @returns {void}
   */
  private initMap(): void {
    // add marks to map if they exist
    if (this.markList && this.markList.length) {
      this.createMarkListMap();
    }

    // get {lat, lng} from text address
    if (this.getGeocode) {
      const mapContainer: MapContainer = this.$refs.googleMap;

      this.map = new this.google.maps.Map(mapContainer, {
        zoom: 4
      });

      this.geocoder = new this.google.maps.Geocoder();
      this.infowindow = new this.google.maps.InfoWindow();

      this.marker = new this.google.maps.Marker({
        map: this.map,
        position: { lat: -34.397, lng: 150.644 },
        draggable: this.draggableMark
      });

      this.geocodeAddressToLatLng(this.searchedAddress);
    }
  }

  /**
   * Create map & add marks.
   *
   * @returns {void}
   */
  private createMarkListMap(): void {
    const mapContainer: MapContainer = this.$refs.googleMap;

    this.map = new this.google.maps.Map(mapContainer, {
      zoom: 4,
      center: this.markList[0].position
    });

    const markListLength: number = this.markList.length;

    for (let index: number = 0; index < markListLength; index++) {
      this.addMark(this.markList[index].position, this.markList[index].id);
    }
  }

  /**
   * Get text address by lat and lng.
   *
   * @param {IPosition} position
   * @returns {void}
   */
  private geocodeLatLngToAddress(position: IPosition): void {
    const self = this;
    this.geocoder.geocode({ location: position }, (results: any, status: string) => {
      if (status === 'OK') {
        if (results[0]) {
          self.$parent.$emit(
            'MapEvent:GeocodeLatLngToAddress',
            results[0].formatted_address
          );
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert(`Geocoder failed due to: ${status}`);
      }
    });
  }

  /**
   * Get {lat,lng} by text address.
   *
   * @param {string} address
   * @returns {void}
   */
  private geocodeAddressToLatLng(address: string): void {
    this.geocoder.geocode({ address }, (results: any, status: string) => {
      if (status === 'OK') {
        this.map.setCenter(results[0].geometry.location);
        this.map.setZoom(15);
        this.marker.setPosition(results[0].geometry.location);
        this.$parent.$emit('MapEvent:Geolocation', this.marker.getPosition());

        this.marker.addListener('dragend', (event: any) => {
          const lat: number = event.latLng.lat();
          const lng: number = event.latLng.lng();

          this.$parent.$emit('MapEvent:Geolocation', { lat, lng });
          this.geocodeLatLngToAddress({ lat, lng });
        });
      } else {
        alert(
          `Geocode was not successful for the following reason: ${status}`
        );
      }
    });
  }

}
