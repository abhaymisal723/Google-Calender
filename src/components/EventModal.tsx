import React, { useState, useEffect } from 'react';
import { Event } from '../types';
import { format } from 'date-fns';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: Omit<Event, 'id'>) => void;
  event?: Event;
  selectedDate?: Date;
  selectedHour?: number;
}

const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  onClose,
  onSave,
  event,
  selectedDate,
  selectedHour
}) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'TASK' | 'HOLIDAY'>('TASK');
  const [startDateTime, setStartDateTime] = useState('');
  const [endDateTime, setEndDateTime] = useState('');

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setType(event.type);
      setStartDateTime(format(new Date(event.start), "yyyy-MM-dd'T'HH:mm"));
      setEndDateTime(format(new Date(event.end), "yyyy-MM-dd'T'HH:mm"));
    } else if (isOpen && selectedDate && selectedHour !== undefined) {
      const startDate = new Date(selectedDate);
      startDate.setHours(selectedHour, 0, 0, 0);
      const endDate = new Date(startDate);
      endDate.setMinutes(startDate.getMinutes() + 30); // Default to 30 min duration
      setTitle('');
      setType('TASK');
      setStartDateTime(format(startDate, "yyyy-MM-dd'T'HH:mm"));
      setEndDateTime(format(endDate, "yyyy-MM-dd'T'HH:mm"));
    } else if (isOpen && !event) {
      setTitle('');
      setType('TASK');
      setStartDateTime('');
      setEndDateTime('');
    }
  }, [event, selectedDate, selectedHour, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !startDateTime || !endDateTime) {
      alert('Please fill in all fields');
      return;
    }

    const start = new Date(startDateTime).getTime();
    const end = new Date(endDateTime).getTime();

    if (start >= end) {
      alert('End time must be after start time');
      return;
    }

    onSave({
      title: title.trim(),
      type,
      start,
      end
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{event ? 'Edit Event' : 'Create Event'}</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="title">Event Name</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter event name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="type">Event Type</label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value as 'TASK' | 'HOLIDAY')}
              required
            >
              <option value="TASK">TASK</option>
              <option value="HOLIDAY">HOLIDAY</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="start">Start Date Time</label>
            <input
              type="datetime-local"
              id="start"
              value={startDateTime}
              onChange={(e) => setStartDateTime(e.target.value)}
              required
              step="60"
            />
          </div>

          <div className="form-group">
            <label htmlFor="end">End Date Time</label>
            <input
              type="datetime-local"
              id="end"
              value={endDateTime}
              onChange={(e) => setEndDateTime(e.target.value)}
              required
              step="60"
            />
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="cancel-button">
              Cancel
            </button>
            <button type="submit" className="save-button">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal; 