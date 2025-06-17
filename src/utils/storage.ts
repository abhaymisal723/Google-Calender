import { Event } from '../types';

const STORAGE_KEY = 'calendar_events';

export const saveEventsToStorage = (events: Event[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  } catch (error) {
    console.error('Failed to save events to localStorage:', error);
  }
};

export const loadEventsFromStorage = (): Event[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load events from localStorage:', error);
    return [];
  }
};

export const getDefaultEvents = (): Event[] => [
  { "id": "1", "title": "My Task 1", "type": "TASK", "start": 1745901600000, "end": 1745905200000 },
  { "id": "2", "title": "My Task 2", "type": "TASK", "start": 1745988000000, "end": 1745991600000 },
  { "id": "3", "title": "My Task 3", "type": "TASK", "start": 1746074400000, "end": 1746078000000 },
  { "id": "4", "title": "My Task 4", "type": "TASK", "start": 1746160800000, "end": 1746164400000 },
  { "id": "5", "title": "My Task 5", "type": "TASK", "start": 1746247200000, "end": 1746250800000 },
  { "id": "6", "title": "My Task 6", "type": "TASK", "start": 1746333600000, "end": 1746337200000 },
  { "id": "7", "title": "My Task 7", "type": "TASK", "start": 1746420000000, "end": 1746423600000 },
  { "id": "8", "title": "My Task 8", "type": "TASK", "start": 1746506400000, "end": 1746510000000 },
  { "id": "9", "title": "My Task 9", "type": "TASK", "start": 1746592800000, "end": 1746596400000 },
  { "id": "10", "title": "My Task 10", "type": "TASK", "start": 1746679200000, "end": 1746682800000 },
  { "id": "11", "title": "My Task 11", "type": "TASK", "start": 1746765600000, "end": 1746769200000 },
  { "id": "12", "title": "My Task 12", "type": "TASK", "start": 1746852000000, "end": 1746855600000 },
  { "id": "13", "title": "My Task 13", "type": "HOLIDAY", "start": 1746506400000, "end": 1746513600000 },
  { "id": "14", "title": "My Task 14", "type": "TASK", "start": 1746938400000, "end": 1746942000000 },
  { "id": "15", "title": "My Task 15", "type": "HOLIDAY", "start": 1746765600000, "end": 1746772800000 }
]; 