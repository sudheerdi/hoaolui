
import { useState } from 'react';
import CalendarView from './CalendarView';
import EventsList from './EventsList';
import CreateEventModal from './CreateEventModal';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  type: 'meeting' | 'maintenance' | 'social' | 'other';
  description?: string;
  color?: string;
}

export default function CalendarContent() {
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: 'HOA Board Meeting',
      date: '2024-01-15',
      time: '7:00 PM',
      type: 'meeting',
      description: 'Monthly board meeting to discuss community matters',
      color: '#1FA372'
    },
    {
      id: 2,
      title: 'Pool Maintenance',
      date: '2024-01-18',
      time: '9:00 AM',
      type: 'maintenance',
      description: 'Scheduled pool cleaning and maintenance',
      color: '#3B82F6'
    },
    {
      id: 3,
      title: 'Community BBQ',
      date: '2024-01-20',
      time: '5:00 PM',
      type: 'social',
      description: 'Annual community barbecue event',
      color: '#8B5CF6'
    },
    {
      id: 4,
      title: 'Landscaping Work',
      date: '2024-01-22',
      time: '8:00 AM',
      type: 'maintenance',
      description: 'Seasonal landscaping and tree trimming',
      color: '#3B82F6'
    },
    {
      id: 5,
      title: 'Annual General Meeting',
      date: '2024-01-25',
      time: '6:30 PM',
      type: 'meeting',
      description: 'Annual general meeting for all homeowners',
      color: '#1FA372'
    },
    {
      id: 6,
      title: 'Playground Equipment Inspection',
      date: '2024-01-28',
      time: '10:00 AM',
      type: 'maintenance',
      description: 'Safety inspection of playground equipment',
      color: '#3B82F6'
    },
    {
      id: 7,
      title: 'Movie Night',
      date: '2024-01-30',
      time: '7:30 PM',
      type: 'social',
      description: 'Community movie night at the clubhouse',
      color: '#8B5CF6'
    },
    {
      id: 8,
      title: 'Fitness Class',
      date: '2024-02-02',
      time: '6:00 AM',
      type: 'social',
      description: 'Weekly community fitness class',
      color: '#8B5CF6'
    },
    {
      id: 9,
      title: 'Security System Upgrade',
      date: '2024-02-05',
      time: '9:00 AM',
      type: 'maintenance',
      description: 'Installation of new security cameras',
      color: '#3B82F6'
    },
    {
      id: 10,
      title: 'Book Club Meeting',
      date: '2024-02-08',
      time: '7:00 PM',
      type: 'social',
      description: 'Monthly book club gathering',
      color: '#8B5CF6'
    },
    {
      id: 11,
      title: 'Fire Safety Inspection',
      date: '2024-02-10',
      time: '10:00 AM',
      type: 'maintenance',
      description: 'Annual fire safety equipment inspection',
      color: '#3B82F6'
    },
    {
      id: 12,
      title: 'Valentines Day Party',
      date: '2024-02-14',
      time: '6:00 PM',
      type: 'social',
      description: 'Community Valentine\'s Day celebration',
      color: '#8B5CF6'
    },
    {
      id: 13,
      title: 'Emergency Preparedness Meeting',
      date: '2024-01-12',
      time: '2:00 PM',
      type: 'meeting',
      description: 'Discuss emergency protocols and procedures',
      color: '#1FA372'
    },
    {
      id: 14,
      title: 'Tennis Court Resurfacing',
      date: '2024-01-16',
      time: '7:00 AM',
      type: 'maintenance',
      description: 'Annual tennis court maintenance and resurfacing',
      color: '#3B82F6'
    },
    {
      id: 15,
      title: 'Kids Art Workshop',
      date: '2024-01-19',
      time: '3:00 PM',
      type: 'social',
      description: 'Creative art workshop for children',
      color: '#8B5CF6'
    },
    {
      id: 16,
      title: 'HVAC System Inspection',
      date: '2024-01-23',
      time: '11:00 AM',
      type: 'maintenance',
      description: 'Quarterly HVAC system maintenance check',
      color: '#3B82F6'
    },
    {
      id: 17,
      title: 'Wine Tasting Event',
      date: '2024-01-26',
      time: '7:00 PM',
      type: 'social',
      description: 'Community wine tasting and social gathering',
      color: '#8B5CF6'
    },
    {
      id: 18,
      title: 'Budget Review Meeting',
      date: '2024-01-29',
      time: '6:00 PM',
      type: 'meeting',
      description: 'Review quarterly budget and expenses',
      color: '#1FA372'
    },
    {
      id: 19,
      title: 'Yoga Class',
      date: '2024-02-01',
      time: '8:00 AM',
      type: 'social',
      description: 'Morning yoga session at the community center',
      color: '#8B5CF6'
    },
    {
      id: 20,
      title: 'Elevator Maintenance',
      date: '2024-02-03',
      time: '9:30 AM',
      type: 'maintenance',
      description: 'Monthly elevator inspection and maintenance',
      color: '#3B82F6'
    }
  ]);

  const handlePrevious = () => {
    const newDate = new Date(currentDate);
    if (view === 'month') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setDate(newDate.getDate() - 1);
    }
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    if (view === 'month') {
      newDate.setMonth(newDate.getMonth() + 1);
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setDate(newDate.getDate() + 1);
    }
    setCurrentDate(newDate);
  };

  const formatDate = () => {
    if (view === 'month') {
      return currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    } else if (view === 'week') {
      const startOfWeek = new Date(currentDate);
      const day = startOfWeek.getDay();
      const diff = startOfWeek.getDate() - day;
      startOfWeek.setDate(diff);
      
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      
      return `${startOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
    } else {
      return currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E2E2] h-full flex flex-col">
        {/* Calendar and Events */}
        <div className="grid grid-cols-3 gap-1 p-1 flex-1">
          {/* Calendar View */}
          <div className="col-span-2 flex flex-col">
            {/* Calendar Controls */}
            <div className="flex items-center justify-between pt-1 mb-6">
              <div className="flex items-center justify-between w-full">
                <button
                  onClick={handlePrevious}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded cursor-pointer"
                >
                  <i className="ri-arrow-left-s-line text-xl w-5 h-5 flex items-center justify-center"></i>
                </button>
                
                <div className="text-lg font-semibold text-gray-900">
                  {formatDate()}
                </div>
                
                <button
                  onClick={handleNext}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded cursor-pointer"
                >
                  <i className="ri-arrow-right-s-line text-xl w-5 h-5 flex items-center justify-center"></i>
                </button>
              </div>

              <div className="flex items-center space-x-3 ml-4">
                {/* View Selector */}
                <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                  <button
                    onClick={() => setView('month')}
                    className={`px-3 py-1 text-sm rounded cursor-pointer whitespace-nowrap ${
                      view === 'month'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Month
                  </button>
                  <button
                    onClick={() => setView('week')}
                    className={`px-3 py-1 text-sm rounded cursor-pointer whitespace-nowrap ${
                      view === 'week'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Week
                  </button>
                  <button
                    onClick={() => setView('day')}
                    className={`px-3 py-1 text-sm rounded cursor-pointer whitespace-nowrap ${
                      view === 'day'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Day
                  </button>
                </div>

                <button
                  onClick={() => setShowCreateEvent(true)}
                  className="px-4 py-2 bg-[#1FA372] text-white rounded-lg hover:bg-[#1A8C62] transition-colors cursor-pointer whitespace-nowrap flex items-center space-x-2"
                >
                  <i className="ri-add-line w-5 h-5 flex items-center justify-center"></i>
                  <span>Create Event</span>
                </button>
              </div>
            </div>

            <div className="flex-1">
              <CalendarView view={view} currentDate={currentDate} events={events} />
            </div>
          </div>

          {/* Events List */}
          <div>
            <EventsList events={events} />
          </div>
        </div>
      </div>

      {/* Create Event Modal */}
      {showCreateEvent && (
        <CreateEventModal onClose={() => setShowCreateEvent(false)} />
      )}
    </>
  );
}