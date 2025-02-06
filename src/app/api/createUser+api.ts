import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  console.log("createUser+api.ts ran")
  try {
    const {clerkId, email, name } = await req.json(); 

    if (clerkId! || !email || !name) {
      console.log("Email or name not found")
      return Response.json({ message: "Missing required fields" }, { status: 400 });
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

    console.log("User created Successfully")
    return Response.json({ message: "User created successfully", user }, { status: 200 });
  } catch (error) {
    console.error("Error creating user:", error);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
