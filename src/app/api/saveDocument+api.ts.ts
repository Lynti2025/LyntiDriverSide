import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(
  req: Request
) {
  if (req.method !== "POST") {
    return Response.json({message : "Method not allowed"})
  }

  try {
    const { clerkId, licenseUrl, rcUrl, aadhaarUrl } = await req.json();

    // Ensure all required fields are present
    if (!clerkId || !licenseUrl || !rcUrl || !aadhaarUrl) {
      return Response.json({message : "missing fields required"})
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

    Response.json({message : "documents saved successfully", driver})
  } catch (error) {
    console.error("Error saving documents:", error);
    Response.json({message : "Internal server error"})
  }
}
