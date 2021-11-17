import DogApi from './api'

test('DogApi | Can List All Breeds', async () => {
    const api = new DogApi();
    const breeds = await api.listBreeds();
    expect(breeds.length).toBeGreaterThan(0);
    const rottweiler = breeds.find(({name}) => name === 'rottweiler');
    expect(rottweiler).toBeDefined();
    expect(rottweiler?.subbreeds).toHaveLength(0);
}, 10000);
