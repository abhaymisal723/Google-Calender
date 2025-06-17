import React from 'react';
import { Event } from '../types';
import { 
  getWeekDays, 
  formatDayHeader, 
  formatDateHeader, 
  formatHour, 
  isCurrentDay,
  isSunday,
  createTimeSlot
} from '../utils/dateUtils';
import CalendarEvent from './CalendarEvent';

interface CalendarGridProps {
  currentDate: Date;
  events: Event[];
  onTimeSlotClick: (date: Date, hour: number) => void;
  onEventClick: (event: Event) => void;
  onEventDelete: (eventId: string) => void;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({
  currentDate,
  events,
  onTimeSlotClick,
  onEventClick,
  onEventDelete
}) => {
  const weekDays = getWeekDays(currentDate);
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const getEventsForTimeSlot = (day: Date, hour: number): Event[] => {
    const slotStart = createTimeSlot(hour, day).getTime();
    const slotEnd = createTimeSlot(hour + 1, day).getTime();
    
    return events.filter(event => {
      const eventStart = event.start;
      const eventEnd = event.end;
      return eventStart < slotEnd && eventEnd > slotStart;
    });
  };

  const isDisabled = (day: Date) => {
    return isSunday(day);
  };

  return (
    <div className="calendar-container">
      {/* Header */}
      <div className="calendar-header">
        <div className="time-column-header"></div>
        {weekDays.map((day, index) => (
          <div 
            key={index} 
            className={`day-header ${isCurrentDay(day) ? 'current-day' : ''}`}
          >
            <div className="day-name">{formatDayHeader(day)}</div>
            <div className="day-date">{formatDateHeader(day)}</div>
          </div>
        ))}
      </div>

      {/* All-day row */}
      <div className="all-day-row">
        <div className="time-column">All Day</div>
        {weekDays.map((day, dayIndex) => (
          <div 
            key={dayIndex} 
            className={`all-day-cell ${isCurrentDay(day) ? 'current-day' : ''} ${isDisabled(day) ? 'disabled' : ''}`}
            onClick={() => !isDisabled(day) && onTimeSlotClick(day, 0)}
          >
            {/* All-day events would go here */}
          </div>
        ))}
      </div>

      {/* Time grid */}
      <div className="calendar-body">
        <div className="calendar-scroll">
          <div className="time-column">
            {hours.map(hour => (
              <div key={hour} className="time-slot">
                {formatHour(hour)}
              </div>
            ))}
          </div>
          <div className="calendar-grid">
            {weekDays.map((day, dayIndex) => (
              <div key={dayIndex} className={`day-column${isCurrentDay(day) ? ' current-day' : ''}`}>
                {hours.map(hour => {
                  const slotStart = createTimeSlot(hour, day).getTime();
                  const slotEnd = createTimeSlot(hour + 1, day).getTime();
                  const dayEvents = getEventsForTimeSlot(day, hour);

                  // Find overlapping events and assign columns
                  let columns: Event[][] = [];
                  dayEvents.forEach(event => {
                    let placed = false;
                    for (let col of columns) {
                      // If this event does not overlap with the last event in this column, place it here
                      const last = col[col.length - 1];
                      if (last && (event.start >= last.end || event.end <= last.start)) {
                        col.push(event);
                        placed = true;
                        break;
                      }
                    }
                    if (!placed) columns.push([event]);
                  });

                  let renderedEvents: JSX.Element[] = [];
                  columns.forEach((col, colIdx) => {
                    col.forEach(event => {
                      const eventStart = Math.max(event.start, slotStart);
                      const eventEnd = Math.min(event.end, slotEnd);
                      const totalSlotMs = slotEnd - slotStart;
                      const eventMs = eventEnd - eventStart;
                      const topPct = ((eventStart - slotStart) / totalSlotMs) * 100;
                      const heightPct = (eventMs / totalSlotMs) * 100;
                      const widthPct = 100 / columns.length;
                      const leftPct = colIdx * widthPct;
                      renderedEvents.push(
                        <CalendarEvent
                          key={event.id}
                          event={event}
                          onClick={() => onEventClick(event)}
                          onDelete={onEventDelete}
                          style={{
                            position: 'absolute',
                            top: `${topPct}%`,
                            height: `${heightPct}%`,
                            left: `${leftPct}%`,
                            width: `${widthPct}%`,
                            zIndex: 2
                          }}
                        />
                      );
                    });
                  });
                  const isCurrentTimeSlot = isCurrentDay(day);
                  return (
                    <div
                      key={hour}
                      className={`time-slot ${isCurrentTimeSlot ? 'current-day' : ''} ${isDisabled(day) ? 'disabled' : ''}`}
                      onClick={() => !isDisabled(day) && onTimeSlotClick(day, hour)}
                      style={{ position: 'relative' }}
                    >
                      {renderedEvents}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarGrid; 