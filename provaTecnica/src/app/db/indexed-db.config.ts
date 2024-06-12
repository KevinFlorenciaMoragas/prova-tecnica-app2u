import { DBConfig } from "ngx-indexed-db";

export const dbConfig: DBConfig = {
    name: "PhotographersDB",
    version: 1,
    objectStoresMeta: [
        {
            store: "photographers",
            storeConfig: { keyPath: "id", autoIncrement: true },
            storeSchema: [
                { name: "guid", keypath: "guid", options: { unique: true } },
                { name: "email", keypath: "email", options: { unique: true } },
                { name: "first_name", keypath: "first_name", options: { unique: false } },
                { name: "last_name", keypath: "last_name", options: { unique: false } },
                { name: "is_removed", keypath: "is_removed", options: { unique: false } },
                { name: "description", keypath: "description", options: { unique: false } },
                { name: "avatar", keypath: "avatar", options: { unique: false } },
                { name: "image", keypath: "image", options: { unique: false } },
                { name: "facebook", keypath: "facebook", options: { unique: false } },
                { name: "instagram", keypath: "instagram", options: { unique: false } },
                { name: "webpage", keypath: "webpage", options: { unique: false } },
            ],
        },
    ],
};