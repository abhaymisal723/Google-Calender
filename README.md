## To start the application
npm install
npm run dev

# Calendar Application

A comprehensive calendar application built with React, TypeScript, and Vite that provides full event management capabilities with a modern, responsive UI.

## Features

### ✅ Calendar Grid Structure
- **7-day week display** (Sunday to Saturday) with hourly time slots (12:00 AM to 12:00 PM)
- **All-day row** for full-day events
- **Scrollable time grid** with sticky header
- **Clear grid lines** for visual separation
- **Current day highlighting** with background color and border

### ✅ Event Management
- **Click any time slot** to create new events via modal dialog
- **Event fields**: Event Name, Start/End Date Time, Event Type (TASK/HOLIDAY)
- **Edit existing events** by clicking on them
- **Hover to reveal delete button** (X) for quick deletion
- **Sunday events disabled** - users cannot create events on Sunday

### ✅ Event Display
- **Colored event blocks** with different colors for TASK (#195957) and HOLIDAY (#a33737)
- **Event names displayed** within blocks
- **Time range shown** for each event
- **Proper layout handling** for overlapping events

### ✅ Navigation Controls
- **Previous/Next buttons** to navigate between weeks
- **Today button** to reset view to current week
- **Week range display** showing current week dates

### ✅ Data Management
- **Prefilled events** on first load with provided sample data
- **Local storage persistence** for all event changes
- **Default events** loaded when no stored data exists

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **date-fns** for date manipulation
- **Custom CSS** (no UI libraries used)
- **Local Storage** for data persistence

## Color Scheme

| Element | Color Code |
|---------|------------|
| Calendar Background | #ffffff |
| Time Grid Lines | #e5e7eb |
| General Text | #111827 |
| Header Labels (Days) | #374151 |
| Event Type - TASK | #195957 |
| Event Type - HOLIDAY | #a33737 |

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. **Clone or download** the project files
2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── App.tsx              # Main application component
│   ├── CalendarGrid.tsx     # Calendar grid with time slots
│   ├── CalendarEvent.tsx    # Individual event component
│   ├── EventModal.tsx       # Event creation/editing modal
│   └── Navigation.tsx       # Navigation controls
├── types/
│   └── index.ts             # TypeScript type definitions
├── utils/
│   ├── dateUtils.ts         # Date manipulation utilities
│   └── storage.ts           # Local storage utilities
├── App.css                  # Main application styles
├── index.css                # Global styles
└── main.tsx                 # Application entry point
```

## Usage

### Creating Events
1. Click on any time slot in the calendar
2. Fill in the event details in the modal:
   - Event Name (required)
   - Event Type: TASK or HOLIDAY
   - Start Date Time (required)
   - End Date Time (required)
3. Click "Save" to create the event

### Editing Events
1. Click on any existing event
2. Modify the details in the modal
3. Click "Save" to update the event

### Deleting Events
1. Hover over any event to reveal the delete button (×)
2. Click the delete button to remove the event

### Navigation
- Use the **Previous** and **Next** arrow buttons to navigate between weeks
- Click the **Today** button to return to the current week
- The current day is highlighted with a special background color

## Technical Implementation

### Architecture
- **Modular component structure** with clear separation of concerns
- **Custom hooks** for state management
- **Utility functions** for date handling and storage
- **TypeScript** for type safety and better development experience

### Performance Optimizations
- **Efficient re-rendering** with React best practices
- **Optimized event filtering** for time slots
- **Lazy loading** considerations for large datasets
- **Responsive design** for mobile and desktop

### Data Flow
1. **Initial load**: Check localStorage for existing events, fallback to default events
2. **Event creation**: Add to state, save to localStorage
3. **Event editing**: Update state, save to localStorage
4. **Event deletion**: Remove from state, save to localStorage

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

This is a machine coding project demonstrating calendar functionality. The code is structured to be easily extensible and maintainable.

## License

This project is created for demonstration purposes. 