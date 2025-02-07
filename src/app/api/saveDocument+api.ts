import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ message: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const body = await req.json().catch(() => null); // Handle invalid JSON

    if (!body) {
      return new Response(JSON.stringify({ message: "Invalid JSON format" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { clerkId, licenseUrl, rcUrl, aadhaarUrl } = body;

    // Ensure all required fields are present
    if (!clerkId || !licenseUrl || !rcUrl || !aadhaarUrl) {
      return new Response(
        JSON.stringify({ message: "Missing fields required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Check if the driver exists
    let driver = await prisma.driver.findUnique({ where: { clerkId } });

    if (!driver) {
      // If the driver does not exist, return an error
      return new Response(JSON.stringify({ message: "Driver not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      // Update the existing driver with the documents
      driver = await prisma.driver.update({
        where: { clerkId },
        data: { licenseUrl, rcUrl, aadhaarUrl, status: "pending" },
      });
    }

    return new Response(
      JSON.stringify({ message: "Documents saved successfully", driver }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error saving documents:", error);

    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
