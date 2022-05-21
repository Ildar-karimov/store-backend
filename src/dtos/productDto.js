module.exports = class ProductDto {
  id;
  name;
  price;
  count;
  brandId;
  img;
  additionalProducts;
  info;

  constructor(props) {
    this.id = props.id
    this.name = props.name
    this.price = props.price
    this.count = props.count
    this.brandId = props.brandId
    this.img = props.img
    this.additionalProducts = props.additionalProducts
    this.info = props.info
  }

}