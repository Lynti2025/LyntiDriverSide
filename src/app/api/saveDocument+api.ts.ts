import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { clerkId, licenseUrl, rcUrl, aadhaarUrl } = req.body;

    // Ensure all required fields are present
    if (!clerkId || !licenseUrl || !rcUrl || !aadhaarUrl) {
      return res.status(400).json({ message: "Missing required fields" });
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

    res.status(200).json({ message: "Documents saved successfully", driver });
  } catch (error) {
    console.error("Error saving documents:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
