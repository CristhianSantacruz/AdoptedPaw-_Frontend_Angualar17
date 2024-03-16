import {FileDto} from "./FileDto";

export interface PetAnimalDto {
  id? : string,
  name : string,
  userId : string,
  age : string,
  raze : string,
  size : string,
  status : string,
  description : string,
  petType : string,
  imagePathUrl : string,
  contactPet : string,
  imageForPet? : FileDto,
  userName : string,
  userEmail : string,
}
