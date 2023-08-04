export type LazyParamsType = {
    page: number;
    size: number;
    filters:
    | {
        id: { value: string | null; matchMode: string };
        fullName: { value: string | null; matchMode: string };
        phoneNumber: { value: string | null; matchMode: string };
        ipAddress: { value: string | null; matchMode: string };
    }
    | {};
};
