export interface UnimplementedEchoService {
    echo(request: EchoRequest): Promise<EchoResponse>;
}

export interface EchoResponse {
    message: string;
}

export interface EchoRequest {
    message: string;
}
