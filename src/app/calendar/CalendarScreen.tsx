"use client";

import { useState } from "react";
import AddEventModal from "./AddEventModal";
import UserProfile from "../../components/UserProfile";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  type: "meeting" | "reminder" | "community";
  location?: string;
  attendees?: string[];
  description?: string;
}

interface Amenity {
  id: string;
  name: string;
  available: boolean;
}

export default function CalendarScreen() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 0, 1));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(true);
  const [viewMode, setViewMode] = useState<"day" | "week" | "month">("month");
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [reservationData, setReservationData] = useState({
    amenity: "",
    date: "",
    time: "",
  });

  // Mock amenities data
  const amenities: Amenity[] = [
    { id: "1", name: "Community Pool", available: true },
    { id: "2", name: "Tennis Court", available: false },
    { id: "3", name: "Clubhouse", available: true },
    { id: "4", name: "Gym", available: true },
    { id: "5", name: "BBQ Area", available: false },
    { id: "6", name: "Conference Room", available: true },
  ];

  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "HOA Board Meeting",
      date: "2025-01-15",
      time: "18:00",
      type: "meeting",
      location: "Community Center",
      attendees: ["Board Members", "Property Manager"],
      description: "Monthly board meeting to discuss community matters",
    },
    {
      id: "2",
      title: "Pool Maintenance",
      date: "2025-01-18",
      time: "09:00",
      type: "reminder",
      location: "Community Pool",
      description: "Scheduled pool cleaning and chemical balance check",
    },
    {
      id: "3",
      title: "Community BBQ",
      date: "2025-01-20",
      time: "17:00",
      type: "community",
      location: "Central Courtyard",
      attendees: ["All Residents"],
      description: "Monthly community gathering and BBQ event",
    },
    {
      id: "4",
      title: "Security System Check",
      date: "2025-01-22",
      time: "10:00",
      type: "reminder",
      location: "Main Entrance",
      description: "Quarterly security system inspection",
    },
    {
      id: "5",
      title: "Neighborhood Watch Meeting",
      date: "2025-01-25",
      time: "19:00",
      type: "meeting",
      location: "Community Room",
      attendees: ["Watch Members"],
      description: "Monthly neighborhood watch coordination meeting",
    },
    {
      id: "6",
      title: "Landscaping Work",
      date: "2025-01-28",
      time: "08:00",
      type: "reminder",
      location: "Garden Areas",
      description: "Monthly landscaping and garden maintenance",
    },
    {
      id: "7",
      title: "Fire Safety Inspection",
      date: "2025-01-30",
      time: "11:00",
      type: "reminder",
      location: "All Buildings",
      attendees: ["Fire Department"],
      description: "Annual fire safety equipment inspection",
    },
    {
      id: "8",
      title: "Yoga Class",
      date: "2025-02-02",
      time: "07:00",
      type: "community",
      location: "Recreation Center",
      attendees: ["Residents"],
      description: "Weekly morning yoga session for residents",
    },
    {
      id: "9",
      title: "Budget Review Meeting",
      date: "2025-02-05",
      time: "19:30",
      type: "meeting",
      location: "Conference Room",
      attendees: ["Board Members", "Treasurer"],
      description: "Quarterly budget review and financial planning",
    },
    {
      id: "10",
      title: "Elevator Maintenance",
      date: "2025-02-08",
      time: "09:30",
      type: "reminder",
      location: "Building A & B",
      description: "Scheduled elevator inspection and maintenance",
    },
    {
      id: "11",
      title: "Book Club Meeting",
      date: "2025-02-10",
      time: "15:00",
      type: "community",
      location: "Library Room",
      attendees: ["Book Club Members"],
      description: "Monthly book discussion and social gathering",
    },
    {
      id: "12",
      title: "HVAC System Check",
      date: "2025-02-12",
      time: "10:30",
      type: "reminder",
      location: "All Units",
      description: "Seasonal HVAC system inspection and filter replacement",
    },
    {
      id: "13",
      title: "Annual General Meeting",
      date: "2025-02-15",
      time: "18:30",
      type: "meeting",
      location: "Main Hall",
      attendees: ["All Residents", "Board Members"],
      description:
        "Annual meeting to discuss community updates and vote on important matters",
    },
    {
      id: "14",
      title: "Tennis Court Resurfacing",
      date: "2025-02-18",
      time: "08:00",
      type: "reminder",
      location: "Tennis Courts",
      description: "Annual tennis court maintenance and resurfacing work",
    },
    {
      id: "15",
      title: "Community Movie Night",
      date: "2025-02-20",
      time: "19:00",
      type: "community",
      location: "Recreation Center",
      attendees: ["All Residents"],
      description: "Monthly outdoor movie screening for families",
    },
    {
      id: "16",
      title: "Parking Lot Cleaning",
      date: "2025-02-22",
      time: "06:00",
      type: "reminder",
      location: "All Parking Areas",
      description: "Deep cleaning and line repainting of parking areas",
    },
    {
      id: "17",
      title: "Emergency Preparedness Workshop",
      date: "2025-02-25",
      time: "14:00",
      type: "community",
      location: "Community Center",
      attendees: ["All Residents"],
      description:
        "Educational workshop on emergency preparedness and safety procedures",
    },
    {
      id: "18",
      title: "Roof Inspection",
      date: "2025-02-28",
      time: "09:00",
      type: "reminder",
      location: "All Buildings",
      attendees: ["Maintenance Team"],
      description: "Quarterly roof inspection and gutter cleaning",
    },
    {
      id: "19",
      title: "Spring Festival Planning",
      date: "2025-03-03",
      time: "18:00",
      type: "meeting",
      location: "Conference Room",
      attendees: ["Event Committee"],
      description: "Planning meeting for the annual spring community festival",
    },
    {
      id: "20",
      title: "Playground Equipment Check",
      date: "2025-03-05",
      time: "10:00",
      type: "reminder",
      location: "Children's Playground",
      description: "Monthly safety inspection of playground equipment",
    },
  ]);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);

  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const getEventsForDate = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return events.filter((event) => event.date === dateStr);
  };

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    setSelectedDate(clickedDate);
  };

  const getSelectedDateEvents = () => {
    if (!selectedDate) return [];
    const dateStr = `${selectedDate.getFullYear()}-${String(
      selectedDate.getMonth() + 1
    ).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`;
    return events.filter((event) => event.date === dateStr);
  };

  const getCurrentMonthEvents = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    return events
      .filter((event) => {
        const eventDate = new Date(event.date);
        return (
          eventDate.getFullYear() === year && eventDate.getMonth() + 1 === month
        );
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  const getUpcomingEvents = () => {
    const today = new Date();
    return events
      .filter((event) => new Date(event.date) >= today)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  const handleAddEvent = (newEvent: Omit<Event, "id">) => {
    const event: Event = {
      ...newEvent,
      id: Date.now().toString(),
    };
    setEvents([...events, event]);
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter((e) => e.id !== eventId));
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case "meeting":
        return "ri-team-line";
      case "reminder":
        return "ri-alarm-line";
      case "community":
        return "ri-community-line";
      default:
        return "ri-calendar-line";
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case "meeting":
        return "bg-teal-500";
      case "reminder":
        return "bg-amber-500";
      case "community":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  const formatEventDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const checkAvailability = () => {
    const selectedAmenity = amenities.find(
      (a) => a.id === reservationData.amenity
    );
    return selectedAmenity?.available || false;
  };

  const isReservationFormValid = () => {
    return (
      reservationData.amenity &&
      reservationData.date &&
      reservationData.time &&
      checkAvailability()
    );
  };

  const handleReservationSubmit = () => {
    if (isReservationFormValid()) {
      // Handle reservation submission
      setShowReservationModal(false);
      setReservationData({ amenity: "", date: "", time: "" });
    }
  };

  // Day view helper functions
  const getDayViewEvents = () => {
    if (!selectedDate) return [];
    const dateStr = `${selectedDate.getFullYear()}-${String(
      selectedDate.getMonth() + 1
    ).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`;
    return events
      .filter((event) => event.date === dateStr)
      .sort((a, b) => a.time.localeCompare(b.time));
  };

  // Week view helper functions
  const getWeekDates = () => {
    const today = selectedDate || currentDate;
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());

    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      weekDates.push(date);
    }
    return weekDates;
  };

  const getEventsForWeekDate = (date: Date) => {
    const dateStr = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    return events.filter((event) => event.date === dateStr);
  };

  const renderDayView = () => {
    const dayEvents = getDayViewEvents();
    const displayDate = selectedDate || new Date();

    return (
      <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            {displayDate.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </h3>
        </div>

        <div className="p-4">
          {dayEvents.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-calendar-line text-2xl text-gray-400"></i>
              </div>
              <p className="text-base font-medium text-black">
                No events scheduled for this day
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {dayEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg ${getEventColor(
                          event.type
                        )} flex items-center justify-center`}
                      >
                        <i
                          className={`${getEventIcon(
                            event.type
                          )} text-white text-lg`}
                        ></i>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {event.title}
                        </h4>
                        <p className="text-base font-medium text-black">
                          {event.time}
                        </p>
                      </div>
                    </div>
                  </div>

                  {event.location && (
                    <div className="flex items-center gap-2 text-base font-medium text-black mb-2">
                      <i className="ri-map-pin-line"></i>
                      <span>{event.location}</span>
                    </div>
                  )}

                  {event.attendees && event.attendees.length > 0 && (
                    <div className="flex items-center gap-2 text-base font-medium text-black mb-2">
                      <i className="ri-group-line"></i>
                      <span>{event.attendees.join(", ")}</span>
                    </div>
                  )}

                  {event.description && (
                    <p className="text-base font-medium text-black">
                      {event.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderWeekView = () => {
    const weekDates = getWeekDates();

    return (
      <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="grid grid-cols-7">
            {weekDates.map((date, index) => (
              <div
                key={index}
                className="px-3 py-3 text-center border-r border-gray-200 last:border-r-0"
              >
                <div className="text-sm font-semibold text-black uppercase">
                  {date.toLocaleDateString("en-US", { weekday: "short" })}
                </div>
                <div
                  className={`text-lg font-medium mt-1 ${
                    date.toDateString() === new Date().toDateString()
                      ? "text-teal-600"
                      : "text-gray-900"
                  }`}
                >
                  {date.getDate()}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-7 min-h-[400px]">
          {weekDates.map((date, index) => {
            const dayEvents = getEventsForWeekDate(date);
            return (
              <div
                key={index}
                className="border-r border-gray-200 last:border-r-0 p-2"
              >
                <div className="space-y-1">
                  {dayEvents.map((event) => (
                    <div
                      key={event.id}
                      className={`p-2 rounded text-sm font-medium text-white ${getEventColor(
                        event.type
                      )} cursor-pointer hover:opacity-80`}
                      title={`${event.title} - ${event.time}`}
                    >
                      <div className="font-medium truncate">{event.title}</div>
                      <div className="text-xs opacity-90">{event.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderMonthView = () => {
    return (
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <th
                  key={day}
                  className="text-center text-sm font-semibold text-black py-3 border-r border-gray-200 last:border-r-0"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({
              length: Math.ceil((daysInMonth + startingDayOfWeek) / 7),
            }).map((_, weekIndex) => (
              <tr key={weekIndex}>
                {Array.from({ length: 7 }).map((_, dayIndex) => {
                  const dayNumber =
                    weekIndex * 7 + dayIndex - startingDayOfWeek + 1;
                  const isValidDay = dayNumber > 0 && dayNumber <= daysInMonth;
                  const dayEvents = isValidDay
                    ? getEventsForDate(dayNumber)
                    : [];
                  const isSelected =
                    selectedDate?.getDate() === dayNumber &&
                    selectedDate?.getMonth() === currentDate.getMonth() &&
                    selectedDate?.getFullYear() === currentDate.getFullYear();

                  return (
                    <td
                      key={dayIndex}
                      onClick={() => isValidDay && handleDateClick(dayNumber)}
                      className={`h-20 border-r border-b border-gray-200 last:border-r-0 p-2 cursor-pointer hover:bg-gray-50 transition-colors ${
                        isSelected ? "bg-teal-50" : ""
                      } ${!isValidDay ? "bg-gray-50" : ""}`}
                    >
                      {isValidDay && (
                        <>
                          <div className="text-base font-medium text-gray-900">
                            {dayNumber}
                          </div>
                          <div className="flex gap-1 mt-1 flex-wrap">
                            {dayEvents.slice(0, 3).map((event, idx) => (
                              <div
                                key={idx}
                                className={`w-4 h-4 rounded flex items-center justify-center ${getEventColor(
                                  event.type
                                )}`}
                              >
                                <i
                                  className={`${getEventIcon(
                                    event.type
                                  )} text-white text-xs`}
                                ></i>
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg min-h-[calc(100vh-20px)] flex flex-col overflow-hidden">
      <div className="bg-white border-b border-gray-200 px-6 py-3 rounded-t-lg flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4"></div>
          <div className="flex items-center gap-4">
            <button className="relative w-9 h-9 flex items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors cursor-pointer">
              <i className="ri-notification-3-line text-xl text-gray-600"></i>
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>
            <div className="text-sm text-gray-700">
              <div className="font-semibold">Sunset Gardens Community</div>
              <div className="text-xs text-gray-500">
                1234 Garden View Drive, Miami, FL 33101
              </div>
            </div>
            <UserProfile />
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 pr-[320px] overflow-y-auto">
          <div className="p-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={goToPreviousMonth}
                    className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                  >
                    <i className="ri-arrow-left-s-line text-lg"></i>
                  </button>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {viewMode === "day" && selectedDate
                      ? selectedDate.toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })
                      : viewMode === "week"
                      ? `Week of ${getWeekDates()[0].toLocaleDateString(
                          "en-US",
                          { month: "short", day: "numeric" }
                        )}`
                      : currentDate.toLocaleDateString("en-US", {
                          month: "long",
                          year: "numeric",
                        })}
                  </h2>
                  <button
                    onClick={goToNextMonth}
                    className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                  >
                    <i className="ri-arrow-right-s-line text-lg"></i>
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode("day")}
                      className={`px-3 py-1 text-sm rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                        viewMode === "day"
                          ? "bg-white text-gray-900 shadow-sm"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      Day
                    </button>
                    <button
                      onClick={() => setViewMode("week")}
                      className={`px-3 py-1 text-sm rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                        viewMode === "week"
                          ? "bg-white text-gray-900 shadow-sm"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      Week
                    </button>
                    <button
                      onClick={() => setViewMode("month")}
                      className={`px-3 py-1 text-sm rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                        viewMode === "month"
                          ? "bg-white text-gray-900 shadow-sm"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      Month
                    </button>
                  </div>

                  <div className="relative">
                    <button
                      onClick={() => setShowReservationModal(true)}
                      className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors whitespace-nowrap cursor-pointer"
                    >
                      <i className="ri-calendar-check-line mr-2"></i>
                      Make a Reservation
                    </button>

                    {showReservationModal && (
                      <div className="absolute top-full right-0 mt-2 w-96 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
                        <div className="p-4 border-b border-gray-200">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">
                              Make a Reservation
                            </h3>
                            <button
                              onClick={() => setShowReservationModal(false)}
                              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer"
                            >
                              <i className="ri-close-line text-xl"></i>
                            </button>
                          </div>
                        </div>

                        <div className="p-6 space-y-4">
                          <div>
                            <label className="block text-base font-medium text-black mb-2">
                              Select Amenity *
                            </label>
                            <select
                              value={reservationData.amenity}
                              onChange={(e) =>
                                setReservationData((prev) => ({
                                  ...prev,
                                  amenity: e.target.value,
                                }))
                              }
                              className="w-full px-3 py-2 text-base font-medium border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent cursor-pointer pr-8"
                            >
                              <option value="">Choose an amenity...</option>
                              {amenities.map((amenity) => (
                                <option key={amenity.id} value={amenity.id}>
                                  {amenity.name}{" "}
                                  {!amenity.available ? "(Unavailable)" : ""}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-base font-medium text-black mb-2">
                              Select Date *
                            </label>
                            <input
                              type="date"
                              value={reservationData.date}
                              onChange={(e) =>
                                setReservationData((prev) => ({
                                  ...prev,
                                  date: e.target.value,
                                }))
                              }
                              min={new Date().toISOString().split("T")[0]}
                              className="w-full px-3 py-2 text-base font-medium border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                          </div>

                          <div>
                            <label className="block text-base font-medium text-black mb-2">
                              Select Time *
                            </label>
                            <input
                              type="time"
                              value={reservationData.time}
                              onChange={(e) =>
                                setReservationData((prev) => ({
                                  ...prev,
                                  time: e.target.value,
                                }))
                              }
                              className="w-full px-3 py-2 text-base font-medium border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                          </div>

                          {reservationData.amenity && (
                            <div className="p-3 rounded-lg border">
                              <div className="flex items-center gap-2">
                                <div
                                  className={`w-3 h-3 rounded-full ${
                                    checkAvailability()
                                      ? "bg-green-500"
                                      : "bg-red-500"
                                  }`}
                                ></div>
                                <span
                                  className={`text-base font-medium ${
                                    checkAvailability()
                                      ? "text-green-700"
                                      : "text-red-700"
                                  }`}
                                >
                                  {checkAvailability()
                                    ? "Available"
                                    : "Not Available"}
                                </span>
                              </div>
                              {!checkAvailability() && (
                                <p className="text-sm font-medium text-red-600 mt-1">
                                  This amenity is currently unavailable for
                                  reservations.
                                </p>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="p-4 border-t border-gray-200">
                          <div className="flex items-center justify-end space-x-3">
                            <button
                              onClick={() => setShowReservationModal(false)}
                              className="px-4 py-2 text-base font-medium text-black hover:text-gray-800 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={handleReservationSubmit}
                              disabled={!isReservationFormValid()}
                              className={`px-6 py-2 text-base font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                                isReservationFormValid()
                                  ? "bg-purple-600 text-white hover:bg-purple-700"
                                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                              }`}
                            >
                              <i className="ri-check-line mr-2"></i>
                              Submit Reservation
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-teal-700 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    <i className="ri-add-line mr-2"></i>
                    Add Event
                  </button>
                </div>
              </div>

              {viewMode === "day" && renderDayView()}
              {viewMode === "week" && renderWeekView()}
              {viewMode === "month" && renderMonthView()}
            </div>
          </div>
        </div>

        <div className="fixed right-[10px] top-[70px] w-80 bg-white border-l border-gray-200 shadow-lg z-40 h-[calc(100vh-80px)] overflow-y-auto rounded-r-lg">
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {selectedDate
                  ? `Events for ${selectedDate.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}`
                  : `${currentDate.toLocaleDateString("en-US", {
                      month: "long",
                    })} Events`}
              </h3>
              {selectedDate && (
                <button
                  onClick={() => setSelectedDate(null)}
                  className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                >
                  <i className="ri-arrow-left-line text-lg"></i>
                </button>
              )}
            </div>
          </div>

          <div className="p-4 space-y-3">
            {selectedDate ? (
              getSelectedDateEvents().length === 0 ? (
                <p className="text-base font-medium text-black text-center py-8">
                  No events scheduled for this date
                </p>
              ) : (
                getSelectedDateEvents().map((event) => (
                  <div
                    key={event.id}
                    className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-8 h-8 rounded-lg ${getEventColor(
                            event.type
                          )} flex items-center justify-center`}
                        >
                          <i
                            className={`${getEventIcon(
                              event.type
                            )} text-white text-sm`}
                          ></i>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 text-base">
                            {event.title}
                          </h4>
                          <p className="text-sm font-medium text-black">
                            {event.time}
                          </p>
                        </div>
                      </div>
                    </div>

                    {event.location && (
                      <div className="flex items-center gap-2 text-sm font-medium text-black mb-1">
                        <i className="ri-map-pin-line"></i>
                        <span>{event.location}</span>
                      </div>
                    )}

                    {event.attendees && event.attendees.length > 0 && (
                      <div className="flex items-center gap-2 text-sm font-medium text-black mb-2">
                        <i className="ri-group-line"></i>
                        <span>{event.attendees.join(", ")}</span>
                      </div>
                    )}

                    {event.description && (
                      <p className="text-sm font-medium text-black mb-3">
                        {event.description}
                      </p>
                    )}

                    <div className="flex gap-2">
                      <button className="flex-1 px-3 py-1.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium cursor-pointer whitespace-nowrap">
                        <i className="ri-edit-line mr-1"></i>
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteEvent(event.id)}
                        className="flex-1 px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium cursor-pointer whitespace-nowrap"
                      >
                        <i className="ri-delete-bin-line mr-1"></i>
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )
            ) : getCurrentMonthEvents().length === 0 ? (
              <p className="text-base font-medium text-black text-center py-8">
                No events this month
              </p>
            ) : (
              getCurrentMonthEvents().map((event) => (
                <div
                  key={event.id}
                  className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-8 h-8 rounded-lg ${getEventColor(
                          event.type
                        )} flex items-center justify-center`}
                      >
                        <i
                          className={`${getEventIcon(
                            event.type
                          )} text-white text-sm`}
                        ></i>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-base">
                          {event.title}
                        </h4>
                        <p className="text-sm font-medium text-black">
                          {formatEventDate(event.date)} at {event.time}
                        </p>
                      </div>
                    </div>
                  </div>

                  {event.location && (
                    <div className="flex items-center gap-2 text-sm font-medium text-black mb-1">
                      <i className="ri-map-pin-line"></i>
                      <span>{event.location}</span>
                    </div>
                  )}

                  {event.description && (
                    <p className="text-sm font-medium text-black">
                      {event.description}
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {showAddModal && (
        <AddEventModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddEvent}
        />
      )}

      {showReservationModal && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowReservationModal(false)}
        ></div>
      )}
    </div>
  );
}
