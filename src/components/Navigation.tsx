import React from 'react';

interface NavigationProps {
  onPrevious: () => void;
  onNext: () => void;
  onToday: () => void;
  currentDate: Date;
}

const Navigation: React.FC<NavigationProps> = ({
  onPrevious,
  onNext,
  onToday,
  currentDate
}) => {
  const formatWeekRange = (date: Date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    
    return `${startOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
  };

  return (
    <div className="navigation">
      <div className="nav-controls">
        <button className="nav-button" onClick={onPrevious} title="Previous Week">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15,18 9,12 15,6"></polyline>
          </svg>
        </button>
        
        <button className="nav-button today-button" onClick={onToday} title="Go to Today">
          Today
        </button>
        
        <button className="nav-button" onClick={onNext} title="Next Week">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9,18 15,12 9,6"></polyline>
          </svg>
        </button>
      </div>
      
      <div className="week-display">
        {formatWeekRange(currentDate)}
      </div>
    </div>
  );
};

export default Navigation; 