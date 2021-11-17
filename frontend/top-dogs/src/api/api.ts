import axios, { AxiosInstance, AxiosResponse } from "axios";
import { BreedDetails, BreedSummary, DogApi } from "./types";

export default class DogCeoApi implements DogApi {
    private client: AxiosInstance = axios.create({
        baseURL: 'https://dog.ceo/api',
        headers: {
            'content-type': 'application/json'
        },
    });

    async listBreeds(): Promise<Array<BreedSummary>> {
        const { data }: AxiosResponse<DogCeoBreedListResponse> = await this.client.get('/breeds/list/all');
        return Object.entries(data.message).map(([name, subbreeds]) => ({
            name,
            subbreeds,
        }));
    }

    async getBreed(breed: string): Promise<BreedDetails> {
        throw new Error("Method not implemented.");
    }
}

type DogCeoBreedListResponse = {
    message: Record<string, Array<string>>;
    status: string;
}
