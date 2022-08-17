export interface DogApi {
    // lists all breeds available via the API
    listBreeds(): Promise<Array<BreedSummary>>;
    // gets details, including an image, for a single breed
    getBreed(breed: string): Promise<BreedDetails>;
}

export type BreedSummary = {
    // the name of the dog breed
    name: string;
    // sub-breeds for this dog breed, empty if none exist
    subbreeds: Array<string>;
};

export type BreedDetails = BreedSummary & {
    // an image showing a dog of this breed
    image: string;
}