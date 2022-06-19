module.exports = class UserDto {
  id;
  email;
  role;
  name;
  surname;
  userDatasetId;

  constructor(props) {
    this.id = props.id
    this.email = props.email
    this.role = props.role
    this.name = props.name
    this.surname = props.surname
    this.userDatasetId = props.userDatasetId || -1
  }

}