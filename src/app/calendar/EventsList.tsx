interface EventsListProps {
  events: any[];
}

export default function EventsList({ events }: EventsListProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="px-4 py-3 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900">Upcoming Events</h3>
      </div>
      <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
        {events.map((event) => (
          <div key={event.id} className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
            <div className="flex items-start space-x-3">
              <div
                className="w-1 h-full rounded-full"
                style={{ backgroundColor: event.color }}
              ></div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-gray-900 mb-1">{event.title}</h4>
                <div className="space-y-1">
                  <div className="flex items-center text-xs text-gray-600">
                    <i className="ri-calendar-line mr-2 w-4 h-4 flex items-center justify-center"></i>
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-600">
                    <i className="ri-time-line mr-2 w-4 h-4 flex items-center justify-center"></i>
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-600">
                    <i className="ri-map-pin-line mr-2 w-4 h-4 flex items-center justify-center"></i>
                    <span>{event.location}</span>
                  </div>
                </div>
                <span
                  className="inline-block mt-2 px-2 py-0.5 text-xs font-medium rounded-full"
                  style={{ backgroundColor: `${event.color}20`, color: event.color }}
                >
                  {event.category}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
