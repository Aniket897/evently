import { auth } from "@/prisma/auth";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();
    const session = await auth();
    console.log(session);
    // checking if user is authorized or not
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json(
        {
          error: true,
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const event = await prisma.event.findUnique({
      where: {
        id,
      },
    });

    if (!event) {
      return NextResponse.json(
        {
          error: true,
          message: "failed to book | Event not found",
        },
        {
          status: 400,
        }
      );
    }

    // checking user booking exists with userID and eventID
    const bookingExists = await prisma.booking.findFirst({
      where: {
        eventId: +id,
        userId: +session?.user.id,
      },
    });

    if (bookingExists) {
      return NextResponse.json(
        {
          error: true,
          message: "Already booked",
        },
        {
          status: 400,
        }
      );
    }

    // cheking is fully booked
    const bookingCount = await prisma.booking.count({
      where: {
        eventId: event.id,
      },
    });

    if (event.max_capacity <= bookingCount) {
      return NextResponse.json(
        {
          error: true,
          message: "fully booked!",
        },
        {
          status: 200,
        }
      );
    }

    // creating new booking
    const booking = await prisma.booking.create({
      data: {
        userId: +session.user.id,
        eventId: id,
      },
    });

    return NextResponse.json(
      {
        booking,
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
}
