module.exports = class ProductInfoDto {
  id;
  title;
  description;

  constructor(props) {
    this.id = props.id
    this.title = props.title
    this.description = props.description
  }
}