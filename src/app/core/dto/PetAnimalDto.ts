import {FileDto} from "./FileDto";

export interface PetAnimalDto {
  id : string,
  name : string,
  userId : string,
  age : string,
  raze : string,
  size : string,
  status : string,
  description : string,
  petType : string,
  imagePathUrl? : string,
  contactPet : string,
  imageForPet? : FileDto,
  userName? : string,
  userEmail? : string,
}

export interface PetDto {
  name : string,
  raze : string,
  age : string,
  userId : string,
  petType : string,
  size : string
  description : string,
  contactPet : string,
}
export interface PetSaveResponseDto {
  id?: string,
  name : string,
  raze : string,
  age : string,
  userId : string,
  petType : string,
  size : string
  status? : string,
  imagePathUrl? : string,
  description : string,
  contactPet : string,
  imageForPet? : FileDto,
}
export function petSaveDtoToString(pet: PetDto): string {
  return `PetSaveDto {
    name: ${pet.name},
    raze: ${pet.raze},
    age: ${pet.age},
    userId: ${pet.userId},
    petType: ${pet.petType},
    size: ${pet.size},
    description: ${pet.description},
    contactPet: ${pet.contactPet}
  }`;
}

