"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Booking, Event } from "@prisma/client";

import EventCard from "@/components/event/event-card";
import Filter from "@/components/filter";
import EventCardFallback from "@/components/event/event-card-fallback";
import ResultNotFound from "@/components/result-not-found";
import { useDebounce } from "@/hooks/use-debounce";

export default function Events() {
  const [events, setEvents] = useState<(Event & { bookings: Booking[] })[]>([]);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [filterString, setFilterString] = useState("");
  const controller = useRef<AbortController | null>(null);
  const debounceFilterString = useDebounce(filterString, 1000);

  useEffect(() => {
    fetchAllEvents();
  }, [debounceFilterString]);

  const handleFilterString = (newFilterString: string) => {
    setFilterString(newFilterString);
  };

  const fetchAllEvents = async () => {
    try {
      if (controller.current) {
        controller.current.abort();
      }
      controller.current = new AbortController();
      setLoading(true);
      setIsError(false);
      const {
        data: { events },
      } = await axios.get(`/api/event?q=${debounceFilterString}`, {
        signal: controller.current.signal,
      });
      setEvents(events);
      setLoading(false);
    } catch (error) {
      if (!axios.isCancel(error)) {
        console.error("Error fetching events:", error);
        setIsError(true);
        setLoading(false);
      }
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
    <div className="text-red-500 text-center flex items-center justify-center min-h-[50vh] flex-col gap-3 text-3xl font-bold">
      <h1>😔</h1>
      <h1>
        Something went wrong while fetching events. Please try again later.
      </h1>
    </div>
  );
}
