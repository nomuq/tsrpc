import { createServer, IncomingMessage, ServerResponse } from "http";

function parseBody(req: IncomingMessage) {
  return new Promise<any>((resolve, reject) => {
    (req as IncomingMessage & { rawBody: string }).rawBody = "";
    req.setEncoding("utf8");

    req.on("data", (chunk: string) => {
      (req as IncomingMessage & { rawBody: string }).rawBody += chunk;
    });

    req.on("end", () => {
      resolve((req as IncomingMessage & { rawBody: string }).rawBody);
    });
  });
}

// add rawBody to IncomingMessage

type Request = IncomingMessage & { rawBody: string };

interface RPCRequest<T extends any[] = any[]> {
  method: string;
  request: T;
}

interface RPCResponse<T> {
  response: T;
}

const server = createServer(
  async (req: IncomingMessage, res: ServerResponse) => {
    try {
      await parseBody(req);
      console.log((req as Request).rawBody);

      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Hello World\n");
    } catch (error) {
      console.error(error);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error\n");
    }
  }
);

server.listen(3000);
