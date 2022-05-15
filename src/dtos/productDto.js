module.exports = class ProductDto {
  id;
  name;
  price;
  count;
  brandId;
  img;
  additional_products;

  constructor(props) {
    this.id = props.id
    this.name = props.name
    this.price = props.price
    this.count = props.count
    this.brandId = props.brandId
    this.img = props.img
    this.additional_products = props.additional_products
  }

}