export function GET(request: Request) {
    console.log("Chamar ahahah");
    return Response.json({ hello: 'world' });
}

