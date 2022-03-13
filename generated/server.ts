export interface UnimplementedEchoService {
  echo(request: EchoRequest): Promise<EchoResponse>;
  get(): Promise<EchoResponse>;
}

export interface EchoResponse {
  message: string;
}

export interface EchoRequest {
  message: string;
}

export interface EchoResponse {
  message: string;
}
