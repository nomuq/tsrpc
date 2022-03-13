import { Service } from "./main";

interface EchoRequest {
  message: string;
}

interface EchoResponse {
  message: string;
}

interface EchoService extends Service {
  echo(request: EchoRequest): EchoResponse;
}
