import React, { useState } from 'react';
import { Event } from '../types';
import { format } from 'date-fns';

interface CalendarEventProps {
  event: Event;
  onClick: (event: Event) => void;
  onDelete: (eventId: string) => void;
  style?: React.CSSProperties;
}

const CalendarEvent: React.FC<CalendarEventProps> = ({ event, onClick, onDelete, style }) => {
  const [showDelete, setShowDelete] = useState(false);

  const getEventColor = (type: 'TASK' | 'HOLIDAY') => {
    return type === 'TASK' ? '#195957' : '#a33737';
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(event.id);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick(event);
  };

  return (
    <div
      className="calendar-event"
      style={{ backgroundColor: getEventColor(event.type), ...style }}
      onClick={handleClick}
      onMouseEnter={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
    >
      <div className="event-content">
        <span className="event-title">{event.title}</span>
        <span className="event-time">
          {format(new Date(event.start), 'h:mm a')} - {format(new Date(event.end), 'h:mm a')}
        </span>
      </div>
      {showDelete && (
        <button
          className="delete-button"
          onClick={handleDelete}
          title="Remove event"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default CalendarEvent; 