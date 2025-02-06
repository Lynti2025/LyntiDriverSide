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
    const { clerkId, email, name } = req.body;

    if (!clerkId || !email || !name) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if the user already exists
    let user = await prisma.driver.findUnique({ where: { clerkId } });

    if (!user) {
      user = await prisma.driver.create({
        data: {
          clerkId,
          email,
          name,
          licenseUrl: "",
          rcUrl: "",
          aadhaarUrl: "",
        },
      });
    }

    res.status(200).json({ message: "User created successfully", user });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
