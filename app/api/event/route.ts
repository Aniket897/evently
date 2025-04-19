import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const query = searchParams.get("q");

    const events = await prisma.event.findMany({
      where: {
        title: {
          contains: query || "",
          mode: "insensitive",
        },
      },
      include: {
        bookings: true,
      },
    });
    return NextResponse.json(
      {
        events,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
  }
}
