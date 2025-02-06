import { Request, Response } from "expo-router/server";

export async function POST(request: Request) {
  console.log("im working");
  return Response.json({ hello: "universe" });
}
