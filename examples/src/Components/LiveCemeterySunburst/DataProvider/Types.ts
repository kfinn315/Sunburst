export interface Grave {
    id: number;
    cemeteryId: number;
    name: string;
    birthYear?: number;
    deathYear?: number;
}

export interface Cemetery {
    id: number;
    name: string;
    graves?: Grave[]
}

