export interface Character {
    id: number;
    name: string;
    image: string;
    status: string;
    species: string;
    origin: {
        name: string;
    };
    location: {
        name: string;
    };
}