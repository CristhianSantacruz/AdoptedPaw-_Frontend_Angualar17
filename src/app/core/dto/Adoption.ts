import {PetAnimalDto} from "./PetAnimalDto";

export interface AdoptionResponseDto{
    petAdopte : PetAnimalDto,
    adoptionDate : string,
}

export interface AdoptionDto{
   adoptedByUserId : string,
   petId : string,
}
