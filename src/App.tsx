import React, { useState, useEffect } from 'react';
import { Event } from './types';
import { getNextWeek, getPreviousWeek } from './utils/dateUtils';
import { loadEventsFromStorage, saveEventsToStorage, getDefaultEvents } from './utils/storage';
import CalendarGrid from './components/CalendarGrid';
import Navigation from './components/Navigation';
import EventModal from './components/EventModal';
import './App.css';

const App: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | undefined>();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedHour, setSelectedHour] = useState<number | undefined>();

  // Load events from localStorage on component mount
  useEffect(() => {
    const storedEvents = loadEventsFromStorage();
    if (storedEvents.length === 0) {
      // If no stored events, load default events
      const defaultEvents = getDefaultEvents();
      setEvents(defaultEvents);
      saveEventsToStorage(defaultEvents);
    } else {
      setEvents(storedEvents);
    }
  }, []);

  // Save events to localStorage whenever events change
  useEffect(() => {
    if (events.length > 0) {
      saveEventsToStorage(events);
    }
  }, [events]);

  const handlePreviousWeek = () => {
    setCurrentDate(getPreviousWeek(currentDate));
  };

  const handleNextWeek = () => {
    setCurrentDate(getNextWeek(currentDate));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleTimeSlotClick = (date: Date, hour: number) => {
    setSelectedDate(date);
    setSelectedHour(hour);
    setSelectedEvent(undefined);
    setIsModalOpen(true);
  };

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setSelectedDate(undefined);
    setSelectedHour(undefined);
    setIsModalOpen(true);
  };

  const handleEventDelete = (eventId: string) => {
    setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
  };

  const handleSaveEvent = (eventData: Omit<Event, 'id'>) => {
    if (selectedEvent) {
      // Update existing event
      setEvents(prevEvents => 
        prevEvents.map(event => 
          event.id === selectedEvent.id 
            ? { ...eventData, id: event.id }
            : event
        )
      );
    } else {
      // Create new event
      const newEvent: Event = {
        ...eventData,
        id: Date.now().toString()
      };
      setEvents(prevEvents => [...prevEvents, newEvent]);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(undefined);
    setSelectedDate(undefined);
    setSelectedHour(undefined);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Calendar</h1>
        <Navigation
          onPrevious={handlePreviousWeek}
          onNext={handleNextWeek}
          onToday={handleToday}
          currentDate={currentDate}
        />
      </header>
      
      <main className="app-main">
        <CalendarGrid
          currentDate={currentDate}
          events={events}
          onTimeSlotClick={handleTimeSlotClick}
          onEventClick={handleEventClick}
          onEventDelete={handleEventDelete}
        />
      </main>

      <EventModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveEvent}
        event={selectedEvent}
        selectedDate={selectedDate}
        selectedHour={selectedHour}
      />
    </div>
  );
};

export default App; 