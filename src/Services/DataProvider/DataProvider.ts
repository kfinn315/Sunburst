
export interface DataProvider<TResponse, TRequest = unknown> {
    get(request?: TRequest): Promise<TResponse>;
}
