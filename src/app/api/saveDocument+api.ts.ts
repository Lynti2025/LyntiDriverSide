import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ message: "Method not allowed" }), {
      status: 405,
    });
  }

  try {
    const { clerkId, licenseUrl, rcUrl, aadhaarUrl } = await req.json();

    // Ensure all required fields are present
    if (!clerkId || !licenseUrl || !rcUrl || !aadhaarUrl) {
      return new Response(
        JSON.stringify({ message: "Missing fields required" }),
        { status: 400 }
      );
    }

    // Check if the driver exists
    let driver = await prisma.driver.findUnique({ where: { clerkId } });

    if (!driver) {
      // Create a new driver entry
      driver = await prisma.driver.create({
        data: {
          clerkId,
          email: `${clerkId}@example.com`, // Placeholder email, adjust as needed
          name: "New Driver",
          licenseUrl,
          rcUrl,
          aadhaarUrl,
          status: "pending",
        },
      });
    } else {
      // Update existing driver
      driver = await prisma.driver.update({
        where: { clerkId },
        data: { licenseUrl, rcUrl, aadhaarUrl, status: "pending" },
      });
    }

    return new Response(
      JSON.stringify({ message: "Documents saved successfully", driver }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving documents:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}
