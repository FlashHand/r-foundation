export declare const createAccessForHash: (key: string) => {
    set: (value: string) => void;
    get: () => any;
    remove: () => void;
};
