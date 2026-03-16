
interface CalendarViewProps {
  view: 'month' | 'week' | 'day';
  currentDate: Date;
  events: any[];
}

export default function CalendarView({ view, currentDate, events }: CalendarViewProps) {
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return days;
  };

  const getWeekDays = (date: Date) => {
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day;
    startOfWeek.setDate(diff);

    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      weekDays.push(day);
    }
    return weekDays;
  };

  const isToday = (day: number | null, checkDate?: Date) => {
    const today = new Date();
    if (checkDate) {
      return (
        checkDate.getDate() === today.getDate() &&
        checkDate.getMonth() === today.getMonth() &&
        checkDate.getFullYear() === today.getFullYear()
      );
    }
    if (!day) return false;
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const hasEvent = (day: number | null, checkDate?: Date) => {
    if (checkDate) {
      const dateStr = `${checkDate.getFullYear()}-${String(checkDate.getMonth() + 1).padStart(2, '0')}-${String(checkDate.getDate()).padStart(2, '0')}`;
      return events.some(event => event.date === dateStr);
    }
    if (!day) return false;
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.some(event => event.date === dateStr);
  };

  const getEventsForDate = (checkDate: Date) => {
    const dateStr = `${checkDate.getFullYear()}-${String(checkDate.getMonth() + 1).padStart(2, '0')}-${String(checkDate.getDate()).padStart(2, '0')}`;
    return events.filter(event => event.date === dateStr);
  };

  const timeSlots = [
    '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
    '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM'
  ];

  if (view === 'day') {
    return (
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200 p-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {currentDate.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </h3>
        </div>
        <div className="flex">
          <div className="w-20 border-r border-gray-200">
            {timeSlots.map((time) => (
              <div key={time} className="h-16 border-b border-gray-100 px-2 py-2 text-xs text-gray-500">
                {time}
              </div>
            ))}
          </div>
          <div className="flex-1">
            {timeSlots.map((time, index) => (
              <div key={time} className="h-16 border-b border-gray-100 px-4 py-2 relative">
                {getEventsForDate(currentDate).map((event, eventIndex) => (
                  <div
                    key={event.id}
                    className="absolute left-4 right-4 rounded px-2 py-1 text-xs font-medium"
                    style={{ 
                      backgroundColor: `${event.color}20`, 
                      color: event.color,
                      top: `${8 + eventIndex * 20}px`,
                      height: '18px'
                    }}
                  >
                    {event.title}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (view === 'week') {
    const weekDays = getWeekDays(currentDate);
    const weekDayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="grid grid-cols-8 border-b border-gray-200">
          <div className="px-2 py-3 text-center text-sm font-semibold text-gray-700"></div>
          {weekDays.map((day, index) => (
            <div
              key={index}
              className="px-2 py-3 text-center border-r border-gray-200 last:border-r-0"
            >
              <div className="text-xs text-gray-500">{weekDayNames[index]}</div>
              <div className={`text-sm font-semibold mt-1 ${
                isToday(null, day) ? 'text-[#1FA372]' : 'text-gray-900'
              }`}>
                {day.getDate()}
              </div>
            </div>
          ))}
        </div>
        <div className="flex">
          <div className="w-20 border-r border-gray-200">
            {timeSlots.map((time) => (
              <div key={time} className="h-16 border-b border-gray-100 px-2 py-2 text-xs text-gray-500">
                {time}
              </div>
            ))}
          </div>
          <div className="flex-1 grid grid-cols-7">
            {weekDays.map((day, dayIndex) => (
              <div key={dayIndex} className="border-r border-gray-200 last:border-r-0">
                {timeSlots.map((time, timeIndex) => (
                  <div key={time} className="h-16 border-b border-gray-100 px-2 py-1 relative">
                    {getEventsForDate(day).map((event, eventIndex) => (
                      <div
                        key={event.id}
                        className="absolute left-1 right-1 rounded px-1 py-0.5 text-xs font-medium"
                        style={{ 
                          backgroundColor: `${event.color}20`, 
                          color: event.color,
                          top: `${4 + eventIndex * 16}px`,
                          height: '14px',
                          fontSize: '10px'
                        }}
                      >
                        {event.title}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Month view (existing code)
  const days = getDaysInMonth(currentDate);
  const weekDayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {/* Week Days Header */}
      <div className="grid grid-cols-7 border-b border-gray-200">
        {weekDayNames.map((day) => (
          <div
            key={day}
            className="px-2 py-3 text-center text-sm font-semibold text-gray-700 border-r border-gray-200 last:border-r-0"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7">
        {days.map((day, index) => (
          <div
            key={index}
            className={`min-h-[100px] border-r border-b border-gray-200 p-2 cursor-pointer hover:bg-gray-50 transition-colors ${
              !day ? 'bg-gray-50' : ''
            }`}
          >
            {day && (
              <div className="flex flex-col h-full">
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium mb-1 ${
                    isToday(day)
                      ? 'bg-[#1FA372] text-white'
                      : 'text-gray-700'
                  }`}
                >
                  {day}
                </div>
                {hasEvent(day) && (
                  <div className="flex-1 space-y-1">
                    {events
                      .filter(event => {
                        const eventDate = new Date(event.date);
                        return eventDate.getDate() === day;
                      })
                      .map(event => (
                        <div
                          key={event.id}
                          className="text-xs px-2 py-1 rounded truncate"
                          style={{ backgroundColor: `${event.color}20`, color: event.color }}
                        >
                          {event.title}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
