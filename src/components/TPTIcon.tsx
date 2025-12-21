import React from 'react';

interface TPTIconProps {
  className?: string;
}

const TPTIcon: React.FC<TPTIconProps> = ({ className = 'w-8 h-8' }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Apple shape for Teachers Pay Teachers */}
      <path d="M12 2C9.5 2 7.5 3.5 7 5.5C5 5.5 3 7.5 3 10C3 14 6 18 9 20.5C10 21.5 11 22 12 22C13 22 14 21.5 15 20.5C18 18 21 14 21 10C21 7.5 19 5.5 17 5.5C16.5 3.5 14.5 2 12 2ZM12 4C13.5 4 14.7 4.8 15.2 6H8.8C9.3 4.8 10.5 4 12 4ZM12 8C13.1 8 14 8.9 14 10C14 11.1 13.1 12 12 12C10.9 12 10 11.1 10 10C10 8.9 10.9 8 12 8Z" />
      {/* Stem */}
      <path d="M12 1C12.5 1 13 1.5 13 2V3H11V2C11 1.5 11.5 1 12 1Z" />
      {/* Leaf */}
      <path d="M14 2.5C15.5 2 17 2.5 17.5 4C16 3.5 14.5 4 14 5.5C13.5 4 14 2.5 14 2.5Z" />
    </svg>
  );
};

export default TPTIcon;
