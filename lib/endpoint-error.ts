export class EndpointError extends Error {
    constructor(status: number, message: string) {
        super(`Error ${status}: ${message}`);
    }
}
