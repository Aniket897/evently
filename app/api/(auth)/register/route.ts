import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashSync } from "bcryptjs";

export const POST = async (req: NextRequest) => {
  try {
    const { email, password, name } = await req.json();

    // cheking if user already exists
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    // if user exists returning error response
    if (user) {
      return NextResponse.json(
        {
          error: true,
          message: "Email already exists",
        },
        {
          status: 401,
        }
      );
    }

    // if user not exists proceding to creating new one

    // hashing password
    const hashedPassword = hashSync(password, 10);

    // creating ne user
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    return NextResponse.json(
      {
        error: false,
        message: "User registered succesfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: true,
        message: "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
};
