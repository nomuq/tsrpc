export interface EchoResponse {
  message: string;
}

export interface EchoRequest {
  message: string;
}

export async function echo(request: EchoRequest): Promise<EchoResponse> {
  return fetch("http://localhost:3000/rpc/echo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      request: {
        request,
      },
    }),
  }).then((response) => response.json());
}

export interface EchoResponse {
  message: string;
}

export async function get(): Promise<EchoResponse> {
  return fetch("http://localhost:3000/rpc/get", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      request: {},
    }),
  }).then((response) => response.json());
}
