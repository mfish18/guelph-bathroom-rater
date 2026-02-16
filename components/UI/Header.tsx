'use client';

/**
 * Application header with title and description
 */
const Header: React.FC = () => {
  return (
    <div className="app-header">
      <h1 className="app-title">University of Guelph Bathroom Rater</h1>
      <p className="app-subtitle">
        Help your fellow Gryphons find the best facilities on campus
      </p>
    </div>
  );
};

export default Header;
