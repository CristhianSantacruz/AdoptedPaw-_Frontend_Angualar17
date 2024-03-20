import {PetAnimalDto, PetSaveResponseDto} from "./PetAnimalDto";
import {UserDto, UserSaveDto} from "./UserDto";

export interface AdoptionResponseDto{
    petAdopte : PetAnimalDto,
    adoptionDate : string,
}

export interface AdoptionDtoRequest{
   adoptedByUserId : string,
   petId : string,
}
export interface AdoptionDto {
  id: number,
  adoptedByUserId: string,
  petId: string,
  adoptionDate: string
}
export interface AdoptionResponseAdminDto{
  id : number,
  userByAdoption : UserSaveDto,
  petAdopted : PetSaveResponseDto,
  adoptionDate : string,
}

