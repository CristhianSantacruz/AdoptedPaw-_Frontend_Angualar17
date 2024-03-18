export interface UserDto {
  email : string,
  exp : number,
  fullName : string,
  iat : number,
  rol : string,
  userId : string,
}

export interface UserSaveDto{
  dni : string
  fullName : string,
  email : string,
  phone : string,
  password : string,
}
