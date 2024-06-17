// types.ts

export interface Owner {
    name: string | null;
}

export interface Tag {
    key: string;
    value: string;
}

export enum AssetType {
    NETWORK = 'NETWORK',
    COMPUTE = 'COMPUTE',
    IAM = 'IAM',
    STORAGE = 'STORAGE',
}

export interface Enrich {
    assetType: AssetType;
    env: string;
    isCrownJewel: boolean;
    crownJewelIndicator: string;
}

export interface Asset {
    _id: string;
    created: string; // Assuming created is a string representation of a date
    criticalityFactor: number;
    enrich: Enrich;
    name: string;
    owner: Owner;
    region: string;
    tags: Tag[];
    type: string;
}
