export function GET(request: Request) {
    console.log("Test api working");
    return Response.json({ hello: 'world' });
  }
  