import React from 'react';
import CardDataStats from '../../components/CardDataStats';
import { useState } from 'react';

const Task: React.FC<{ title: string; description: string; date: string; status: 'upcoming' | 'current' }> = ({ title, description, date, status }) => {
  const statusStyles = status === 'upcoming' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600';
  
  return (
    <div className={`rounded-lg p-4 shadow-sm border dark:border-strokedark mb-4 ${statusStyles}`}>
      <h5 className="font-semibold">{title}</h5>
      <p className="text-sm text-gray-700 dark:text-gray-300">{description}</p>
      <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{date}</span>
    </div>
  );
};

const ECommerce: React.FC = () => {
  const [userFeeling, setUserFeeling] = useState('');

  const handleFeelingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserFeeling(e.target.value);
  };
  const upcomingTasks = [
    { title: 'Marketing Meeting', description: 'Discuss Q4 campaigns', date: 'Nov 1, 2024', status: 'upcoming' },
    { title: 'Product Update', description: 'Review new features', date: 'Nov 3, 2024', status: 'upcoming' },
  ];

  const currentTasks = [
    { title: 'Weekly Report', description: 'Submit report to management', date: 'Oct 26, 2024', status: 'current' },
    { title: 'Inventory Check', description: 'Review stock levels', date: 'Oct 26, 2024', status: 'current' },
  ];
  return (
    <>
          <div className="mt-8 py-6">
          <h4 className="text-lg font-semibold text-black dark:text-white mb-4">
            How are you feeling today?
          </h4>
          <input
            type="text"
            value={userFeeling}
            onChange={handleFeelingChange}
            placeholder="Enter your feelings..."
            className="w-full px-4 py-2.5 rounded-lg border border-stroke bg-gray-50 dark:bg-gray-800 text-black dark:text-white dark:border-strokedark focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-gray-400 dark:placeholder:text-gray-500"
          />
          {userFeeling && (
            <p className="mt-3 text-sm font-medium text-primary dark:text-primary-light">
              You feel: {userFeeling}
            </p>
          )}
        </div>
  


     {/* Current Tasks Section */}
     <div className="rounded-sm border border-stroke bg-white py-6 my-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
        <h4 className="text-title-md font-bold text-black dark:text-white mb-4">Current Tasks</h4>
        {currentTasks.map((task, index) => (
          <Task key={index} {...task} />
        ))}
      </div>

      {/* Upcoming Tasks Section */}
      <div className="rounded-sm border border-stroke bg-white py-6 my-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
        <h4 className="text-title-md font-bold text-black dark:text-white mb-4">Upcoming Tasks</h4>
        {upcomingTasks.map((task, index) => (
          <Task key={index} {...task} />
        ))}
      </div>
    </>
  );
};

export default ECommerce;
