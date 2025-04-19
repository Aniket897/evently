"use client";

import EventCard from "./event-card";
import Filter from "../filter";
import { useEffect, useState } from "react";
import EventCardFallback from "./event-card-fallback";
import axios from "axios";
import { Booking, Event } from "@prisma/client";
import ResultNotFound from "../result-not-found";

export default function Events() {
  const [events, setEvents] = useState<(Event & { bookings: Booking[] })[]>([]);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [filterString, setFilterString] = useState("");

  useEffect(() => {
    fetchAllEvents();
  }, [filterString]); // refetch when filter changes

  const handleFilterString = (newFilterString: string) => {
    setFilterString(newFilterString);
  };

  const fetchAllEvents = async () => {
    try {
      setLoading(true);
      setIsError(false);
      const {
        data: { events },
      } = await axios.get(`/api/event?q=${filterString}`);
      setEvents(events);
    } catch (error) {
      console.error("Error fetching events:", error);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 space-y-8">
      <Filter onchange={handleFilterString} />

      {loading && <FallbackGrid />}
      {isError && <ErrorMessage />}
      {!loading && !isError && !events.length && <ResultNotFound />}
      {!loading && !isError && events.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <EventCard key={event.id} index={index} {...event} />
          ))}
        </div>
      )}
    </div>
  );
}

function FallbackGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, idx) => (
        <EventCardFallback key={idx} />
      ))}
    </div>
  );
}

function ErrorMessage() {
  return (
    <div className="text-red-500 text-center text-lg font-medium">
      Something went wrong while fetching events. Please try again later.
    </div>
  );
}
