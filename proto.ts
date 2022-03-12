import { Service } from "./main";

interface EchoRequest {
  message: string;
}

interface EchoResponse {
  message: string;
}

interface EchoService extends Service {
  echo(request: EchoRequest): Promise<EchoResponse>;
}

class EchoServiceImpl implements EchoService {
  echo(request: EchoRequest): Promise<EchoResponse> {
    throw new Error("Method not implemented.");
  }
}
