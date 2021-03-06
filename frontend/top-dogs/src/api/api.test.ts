import DogApi from './api'

describe('DogApi', () => {
    // TODO: re-enable this tet when DogApi is implemented
    test.skip('List All Breeds', async () => {
        const api = new DogApi();
        const breeds = await api.listBreeds();
        expect(breeds.length).toBeGreaterThan(0);
        const rottweiler = breeds.find(({name}) => name === 'rottweiler');
        expect(rottweiler).toBeDefined();
        expect(rottweiler?.subbreeds).toHaveLength(0);
    }, 10000);

    // TODO: implement...
    test.todo('Get Breed by Name');
})