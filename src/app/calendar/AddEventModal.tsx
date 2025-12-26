'use client';

import { useState } from 'react';

interface AddEventModalProps {
  onClose: () => void;
  onAdd: (eventData: any) => void;
}

export default function AddEventModal({ onClose, onAdd }: AddEventModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    type: 'meeting',
    date: '',
    time: '',
    location: '',
    description: '',
    attendees: '',
  });

  const [showRecurring, setShowRecurring] = useState(false);
  const [recurringData, setRecurringData] = useState({
    startDate: '',
    repeatEvery: 1,
    repeatUnit: 'Week',
    selectedDays: ['M', 'T', 'W', 'T', 'F', 'S'],
    endDate: '2026-04-25'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!formData.title.trim() || !formData.date || !formData.time) {
        throw new Error('Please fill in all required fields.');
      }

      onAdd(formData);
      onClose();
    } catch (err) {
      console.error('Failed to create event:', err);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRecurringChange = (field: string, value: any) => {
    setRecurringData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const toggleDay = (day: string) => {
    setRecurringData(prev => ({
      ...prev,
      selectedDays: prev.selectedDays.includes(day) 
        ? prev.selectedDays.filter(d => d !== day)
        : [...prev.selectedDays, day]
    }));
  };

  const dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-5 py-3 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Add New Event</h2>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors cursor-pointer whitespace-nowrap"
          >
            <i className="ri-close-line text-lg text-gray-600"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                Event Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Enter event title"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                Event Type *
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, type: 'meeting' }))}
                  className={`px-3 py-2 rounded-lg border-2 transition-all cursor-pointer whitespace-nowrap ${
                    formData.type === 'meeting'
                      ? 'border-teal-600 bg-teal-50 text-teal-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <i className="ri-team-line text-lg mb-0.5"></i>
                  <div className="text-xs font-medium">Meeting</div>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, type: 'reminder' }))}
                  className={`px-3 py-2 rounded-lg border-2 transition-all cursor-pointer whitespace-nowrap ${
                    formData.type === 'reminder'
                      ? 'border-amber-600 bg-amber-50 text-amber-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <i className="ri-alarm-line text-lg mb-0.5"></i>
                  <div className="text-xs font-medium">Reminder</div>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, type: 'community' }))}
                  className={`px-3 py-2 rounded-lg border-2 transition-all cursor-pointer whitespace-nowrap ${
                    formData.type === 'community'
                      ? 'border-purple-600 bg-purple-50 text-purple-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <i className="ri-community-line text-lg mb-0.5"></i>
                  <div className="text-xs font-medium">Community</div>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Date *
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none text-sm pr-8"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Time *
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none text-sm pr-8"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter event location"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                Expected Attendees
              </label>
              <input
                type="number"
                name="attendees"
                value={formData.attendees}
                onChange={handleChange}
                placeholder="Number of attendees"
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter event description"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none text-sm resize-none"
              />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <button
                  type="button"
                  onClick={() => setShowRecurring(!showRecurring)}
                  className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-teal-600 transition-colors cursor-pointer"
                >
                  <i className="ri-repeat-line text-lg"></i>
                  Recurring
                  <i className={`ri-arrow-${showRecurring ? 'up' : 'down'}-s-line text-lg`}></i>
                </button>
              </div>

              {showRecurring && (
                <div className="border border-gray-200 rounded-lg p-4 space-y-4 bg-gray-50">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      Start
                    </label>
                    <input
                      type="date"
                      value={recurringData.startDate}
                      onChange={(e) => handleRecurringChange('startDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none text-sm pr-8"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <i className="ri-repeat-line text-lg text-gray-600"></i>
                      <span className="text-sm font-medium text-gray-700">Repeat every</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <select
                        value={recurringData.repeatEvery}
                        onChange={(e) => handleRecurringChange('repeatEvery', parseInt(e.target.value))}
                        className="px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none pr-8"
                      >
                        {[1,2,3,4,5,6,7,8,9,10].map(num => (
                          <option key={num} value={num}>{num}</option>
                        ))}
                      </select>
                      <select
                        value={recurringData.repeatUnit}
                        onChange={(e) => handleRecurringChange('repeatUnit', e.target.value)}
                        className="px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none pr-8"
                      >
                        <option value="Week">Week</option>
                        <option value="Month">Month</option>
                        <option value="Year">Year</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <div className="flex gap-2 mb-3">
                      {dayLabels.map((day, index) => (
                        <button
                          key={day}
                          type="button"
                          onClick={() => toggleDay(day)}
                          className={`w-10 h-10 rounded-full border-2 text-sm font-medium transition-all cursor-pointer ${
                            recurringData.selectedDays.includes(day)
                              ? 'border-teal-600 bg-teal-600 text-white'
                              : 'border-gray-300 text-gray-600 hover:border-gray-400'
                          }`}
                        >
                          {day}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-600 mb-2">
                      Occurs every Saturday until
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="date"
                        value={recurringData.endDate}
                        onChange={(e) => handleRecurringChange('endDate', e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none text-sm pr-8"
                      />
                      <button
                        type="button"
                        className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer whitespace-nowrap"
                      >
                        Remove end date
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium cursor-pointer whitespace-nowrap"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm font-medium cursor-pointer whitespace-nowrap"
                    >
                      Discard
                    </button>
                    <button
                      type="button"
                      className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors text-sm font-medium cursor-pointer whitespace-nowrap"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-2 mt-5">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium cursor-pointer whitespace-nowrap text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-[#1FA372] text-white rounded-lg hover:bg-[#1a8d63] transition-colors font-medium cursor-pointer whitespace-nowrap text-sm"
            >
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}