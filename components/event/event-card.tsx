"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Booking, Event } from "@prisma/client";
import { Button } from "@/components/ui/button";
import EventCardFallback from "@/components/event/event-card-fallback";
import {
  CalendarClock,
  Users,
  Info,
  ArrowRight,
  Lock,
  Check,
} from "lucide-react";

interface EventCardProps extends Event {
  index: number;
  bookings: Booking[];
}

export default function EventCard({
  id,
  title,
  index,
  description,
  start_time,
  max_capacity,
  bookings,
}: EventCardProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  const { data } = useSession();

  // for animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 75);

    return () => clearTimeout(timer);
  }, []);

  const handleBookEvent = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`/api/book`, {
        id,
      });
      console.log(response);
      setIsBooked(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (!isVisible) return <EventCardFallback />;
  const remainingSpots = max_capacity - bookings.length;
  const isEventBooked =
    !!bookings.find((booking) => booking.userId == +data?.user?.id!) ||
    isBooked;

  return (
    <div className={`invisible ${isVisible && "visible animate-in fade-in-5"}`}>
      <div
        className={
          "rounded-3xl border border-neutral-200 p-6 bg-white shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-[1.02] space-y-6 cursor-pointer"
        }
      >
        <h2 className="text-[22px] font-semibold text-gray-900 tracking-tight">
          {title}
        </h2>

        <p className="text-sm text-gray-500 leading-relaxed flex items-start gap-2">
          <Info className="w-4 h-4 mt-[2px] text-rose-500" />
          {description}
        </p>

        <div className="flex justify-between text-sm text-gray-500 items-center">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4 text-rose-500" />
            <span>
              {remainingSpots} / {max_capacity} spots left
            </span>
          </div>
          <div className="flex items-center gap-1">
            <CalendarClock className="w-4 h-4 text-rose-500" />
            <span>{format(new Date(start_time), "PPP 'at' p")}</span>
          </div>
        </div>

        <Button
          onClick={handleBookEvent}
          disabled={remainingSpots <= 0 || loading || isEventBooked}
          className={`w-full font-semibold rounded-xl py-2 px-4 text-base transition-all ${
            remainingSpots <= 0 || isEventBooked
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-rose-500 hover:bg-rose-600 text-white"
          }`}
        >
          {loading ? (
            <>Loading...</>
          ) : isEventBooked ? (
            <>
              <Check />
              Booked
            </>
          ) : remainingSpots > 0 ? (
            <>
              Book Now
              <ArrowRight />
            </>
          ) : (
            <>
              Fully Booked
              <Lock />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
