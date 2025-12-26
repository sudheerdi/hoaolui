'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Notification {
  id: string;
  type: 'payment' | 'meeting' | 'poll' | 'violation' | 'document';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

export default function NotificationsScreen() {
  const router = useRouter();
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [showToast, setShowToast] = useState(false);
  const [preferences, setPreferences] = useState({
    paymentUpdates: true,
    meetingReminders: true,
    pollAlerts: false,
    documentUploads: true,
    violationAlerts: true
  });

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'payment',
      title: 'Payment Received',
      message: 'Monthly HOA fee payment received from Unit 204',
      timestamp: '2 minutes ago',
      isRead: false
    },
    {
      id: '2',
      type: 'meeting',
      title: 'Board Meeting Reminder',
      message: 'Monthly board meeting scheduled for tomorrow at 7:00 PM',
      timestamp: '1 hour ago',
      isRead: false
    },
    {
      id: '3',
      type: 'poll',
      title: 'New Poll Created',
      message: 'Community pool renovation poll is now live for voting',
      timestamp: '3 hours ago',
      isRead: true
    },
    {
      id: '4',
      type: 'violation',
      title: 'Violation Report',
      message: 'New parking violation reported in visitor parking area',
      timestamp: '5 hours ago',
      isRead: false
    },
    {
      id: '5',
      type: 'document',
      title: 'Document Uploaded',
      message: 'New community guidelines document has been uploaded',
      timestamp: '1 day ago',
      isRead: true
    },
    {
      id: '6',
      type: 'payment',
      title: 'Payment Overdue',
      message: 'Unit 156 has an overdue payment of $350.00',
      timestamp: '2 days ago',
      isRead: true
    },
    {
      id: '7',
      type: 'meeting',
      title: 'Meeting Minutes Posted',
      message: 'October board meeting minutes are now available',
      timestamp: '3 days ago',
      isRead: true
    },
    {
      id: '8',
      type: 'poll',
      title: 'Poll Results Available',
      message: 'Landscaping improvement poll results are ready for review',
      timestamp: '1 week ago',
      isRead: true
    }
  ]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'payment':
        return 'ri-money-dollar-circle-line';
      case 'meeting':
        return 'ri-calendar-event-line';
      case 'poll':
        return 'ri-bar-chart-box-line';
      case 'violation':
        return 'ri-error-warning-line';
      case 'document':
        return 'ri-file-text-line';
      default:
        return 'ri-notification-3-line';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'payment':
        return 'text-green-600 bg-green-50';
      case 'meeting':
        return 'text-amber-600 bg-amber-50';
      case 'poll':
        return 'text-blue-600 bg-blue-50';
      case 'violation':
        return 'text-red-600 bg-red-50';
      case 'document':
        return 'text-purple-600 bg-purple-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.isRead;
    if (filter === 'read') return notification.isRead;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handlePreferenceChange = (key: keyof typeof preferences) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.push('/')}
              className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <i className="ri-arrow-left-line text-gray-600"></i>
            </button>
            <div>
              <nav className="text-sm text-gray-500 mb-1">
                Dashboard → Notifications
              </nav>
              <h1 className="text-2xl font-bold text-gray-900">Notifications Center</h1>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-600">{unreadCount} unread</span>
            <button
              onClick={markAllAsRead}
              className="px-3 py-1.5 text-sm text-teal-600 hover:bg-teal-50 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              Mark all as read
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Notifications */}
          <div className="lg:col-span-2">
            <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Recent Notifications</h2>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setFilter('all')}
                    className={`px-3 py-1.5 text-sm rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                      filter === 'all' 
                        ? 'bg-teal-600 text-white' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setFilter('unread')}
                    className={`px-3 py-1.5 text-sm rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                      filter === 'unread' 
                        ? 'bg-teal-600 text-white' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Unread
                  </button>
                  <button
                    onClick={() => setFilter('read')}
                    className={`px-3 py-1.5 text-sm rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                      filter === 'read' 
                        ? 'bg-teal-600 text-white' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Read
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    onClick={() => markAsRead(notification.id)}
                    className={`p-4 rounded-lg border transition-colors cursor-pointer ${
                      notification.isRead 
                        ? 'bg-white border-gray-200 hover:bg-gray-50' 
                        : 'bg-white border-teal-200 hover:bg-teal-50'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getNotificationColor(notification.type)}`}>
                        <i className={`${getNotificationIcon(notification.type)} text-lg`}></i>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-semibold text-gray-900">{notification.title}</h3>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-500">{notification.timestamp}</span>
                            {!notification.isRead && (
                              <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Notification Preferences</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                      <i className="ri-money-dollar-circle-line text-green-600"></i>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Payment Updates</p>
                      <p className="text-xs text-gray-500">Receive payment notifications</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handlePreferenceChange('paymentUpdates')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                      preferences.paymentUpdates ? 'bg-teal-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        preferences.paymentUpdates ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                      <i className="ri-calendar-event-line text-amber-600"></i>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Meeting Reminders</p>
                      <p className="text-xs text-gray-500">Get meeting notifications</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handlePreferenceChange('meetingReminders')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                      preferences.meetingReminders ? 'bg-teal-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        preferences.meetingReminders ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                      <i className="ri-bar-chart-box-line text-blue-600"></i>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Poll Alerts</p>
                      <p className="text-xs text-gray-500">New polls and voting updates</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handlePreferenceChange('pollAlerts')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                      preferences.pollAlerts ? 'bg-teal-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        preferences.pollAlerts ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
                      <i className="ri-file-text-line text-purple-600"></i>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Document Uploads</p>
                      <p className="text-xs text-gray-500">New document notifications</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handlePreferenceChange('documentUploads')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                      preferences.documentUploads ? 'bg-teal-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        preferences.documentUploads ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
                      <i className="ri-error-warning-line text-red-600"></i>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Violation Alerts</p>
                      <p className="text-xs text-gray-500">Community violation reports</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handlePreferenceChange('violationAlerts')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                      preferences.violationAlerts ? 'bg-teal-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        preferences.violationAlerts ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Color Legend</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-gray-600">Payment</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                    <span className="text-xs text-gray-600">Meetings</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-xs text-gray-600">Polls</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-xs text-gray-600">Violations</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-teal-600 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          <div className="flex items-center space-x-2">
            <i className="ri-check-line"></i>
            <span>Preferences updated successfully</span>
          </div>
        </div>
      )}
    </div>
  );
}