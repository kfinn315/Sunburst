export interface DataProvider<T> {
    get(): Promise<APIResponse<T>>;
}

export interface APIResponse<T> {
    success: boolean;
    message?: string;
    data?: T[];
    error?: string;
};
