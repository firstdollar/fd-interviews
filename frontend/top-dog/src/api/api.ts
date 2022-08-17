import { BreedDetails, BreedSummary, DogApi } from "./types";

export default class DogCeoApi implements DogApi {

    async listBreeds(): Promise<Array<BreedSummary>> {
        throw new Error("Method not implemented.");
    }

    async getBreed(breed: string): Promise<BreedDetails> {
        throw new Error("Method not implemented.");
    }
}

