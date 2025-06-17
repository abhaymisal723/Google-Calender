export interface Event {
  id: string;
  title: string;
  type: 'TASK' | 'HOLIDAY';
  start: number; // timestamp
  end: number; // timestamp
}

export interface TimeSlot {
  hour: number;
  day: Date;
}

export interface CalendarWeek {
  startDate: Date;
  endDate: Date;
  days: Date[];
}

export interface CalendarEventProps {
  event: Event;
  onClick: (event: Event) => void;
  onDelete: (eventId: string) => void;
  style?: React.CSSProperties;
} 