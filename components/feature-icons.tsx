export const BotIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="4"
      y="6"
      width="16"
      height="14"
      rx="2"
      stroke="url(#bot-head-gradient)"
      strokeWidth="2"
      fill="url(#bot-head-gradient)"
      fillOpacity="0.2"
    />
    <path
      d="M7 15C7.55228 15 8 14.5523 8 14C8 13.4477 7.55228 13 7 13C6.44772 13 6 13.4477 6 14C6 14.5523 6.44772 15 7 15Z"
      fill="#ffffff"
    />
    <path
      d="M17 15C17.5523 15 18 14.5523 18 14C18 13.4477 17.5523 13 17 13C16.4477 13 16 13.4477 16 14C16 14.5523 16.4477 15 17 15Z"
      fill="#ffffff"
    />
    <path d="M9 17H15" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
    <path
      d="M8 6L7 3M16 6L17 3"
      stroke="url(#bot-head-gradient)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 6V2M12 2H10M12 2H14"
      stroke="url(#bot-head-gradient)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M19 13V15C20.1046 15 21 14.1046 21 13C21 11.8954 20.1046 11 19 11V13Z" fill="url(#bot-head-gradient)" />
    <path d="M5 13V11C3.89543 11 3 11.8954 3 13C3 14.1046 3.89543 15 5 15V13Z" fill="url(#bot-head-gradient)" />
    <path
      d="M19 13V15C20.1046 15 21 14.1046 21 13C21 11.8954 20.1046 11 19 11V13Z"
      stroke="url(#bot-head-gradient)"
      strokeWidth="2"
    />
    <path
      d="M5 13V11C3.89543 11 3 11.8954 3 13C3 14.1046 3.89543 15 5 15V13Z"
      stroke="url(#bot-head-gradient)"
      strokeWidth="2"
    />
    <defs>
      <linearGradient id="bot-head-gradient" x1="3" y1="2" x2="21" y2="20" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4F8DF5" />
        <stop offset="1" stopColor="#2465ED" />
      </linearGradient>
    </defs>
  </svg>
)

export const SparklesIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 2L14.8 8.79999L22 9.45999L16.55 14.43L18.18 21.5L12 17.77L5.82 21.5L7.46 14.43L2 9.45999L9.2 8.79999L12 2Z"
      fill="url(#sparkles-gradient)"
    />
    <path d="M17.5 6.5L18.5 8.5L20.5 9L18.5 9.5L17.5 11.5L16.5 9.5L14.5 9L16.5 8.5L17.5 6.5Z" fill="#ffffff" />
    <path d="M6.5 12.5L7.5 14.5L9.5 15L7.5 15.5L6.5 17.5L5.5 15.5L3.5 15L5.5 14.5L6.5 12.5Z" fill="#ffffff" />
    <defs>
      <linearGradient id="sparkles-gradient" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F472B6" />
        <stop offset="1" stopColor="#EC4899" />
      </linearGradient>
    </defs>
  </svg>
)

export const DatabaseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 2C6.48 2 2 4.02 2 6.5V17.5C2 19.98 6.48 22 12 22C17.52 22 22 19.98 22 17.5V6.5C22 4.02 17.52 2 12 2ZM20 17.5C20 18.52 16.42 20 12 20C7.58 20 4 18.52 4 17.5V14.9C5.78 16.16 8.74 17 12 17C15.26 17 18.22 16.16 20 14.9V17.5ZM20 12C20 13.02 16.42 14.5 12 14.5C7.58 14.5 4 13.02 4 12V9.4C5.78 10.66 8.74 11.5 12 11.5C15.26 11.5 18.22 10.66 20 9.4V12ZM12 4C16.42 4 20 5.48 20 6.5C20 7.52 16.42 9 12 9C7.58 9 4 7.52 4 6.5C4 5.48 7.58 4 12 4Z"
      fill="url(#database-gradient)"
    />
    <defs>
      <linearGradient id="database-gradient" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#67E8F9" />
        <stop offset="1" stopColor="#22D3EE" />
      </linearGradient>
    </defs>
  </svg>
)

export const ShieldIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM19 11C19 15.52 15.87 19.72 12 20.94C8.13 19.72 5 15.52 5 11V6.3L12 3.19L19 6.3V11Z"
      fill="url(#shield-gradient)"
    />
    <path d="M12 7C10.9 7 10 7.9 10 9C10 10.1 10.9 11 12 11C13.1 11 14 10.1 14 9C14 7.9 13.1 7 12 7Z" fill="#ffffff" />
    <path d="M12 13.5C10.33 13.5 7 14.33 7 16V17H17V16C17 14.33 13.67 13.5 12 13.5Z" fill="#ffffff" />
    <defs>
      <linearGradient id="shield-gradient" x1="3" y1="1" x2="21" y2="23" gradientUnits="userSpaceOnUse">
        <stop stopColor="#A3E635" />
        <stop offset="1" stopColor="#84CC16" />
      </linearGradient>
    </defs>
  </svg>
)

export const FileTextIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z"
      fill="url(#file-gradient)"
      fillOpacity="0.2"
    />
    <path
      d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20Z"
      fill="url(#file-gradient)"
    />
    <path d="M8 14H16V16H8V14Z" fill="#ffffff" />
    <path d="M8 11H16V13H8V11Z" fill="#ffffff" />
    <defs>
      <linearGradient id="file-gradient" x1="4" y1="2" x2="20" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FDBA74" />
        <stop offset="1" stopColor="#F97316" />
      </linearGradient>
    </defs>
  </svg>
)

export const ServerIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M20 2H4C2.9 2 2 2.9 2 4V8C2 9.1 2.9 10 4 10H20C21.1 10 22 9.1 22 8V4C22 2.9 21.1 2 20 2Z"
      fill="url(#server-gradient)"
    />
    <path
      d="M20 14H4C2.9 14 2 14.9 2 16V20C2 21.1 2.9 22 4 22H20C21.1 22 22 21.1 22 20V16C22 14.9 21.1 14 20 14Z"
      fill="url(#server-gradient)"
    />
    <circle cx="6" cy="6" r="1.5" fill="#ffffff" />
    <circle cx="6" cy="18" r="1.5" fill="#ffffff" />
    <defs>
      <linearGradient id="server-gradient" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#D8B4FE" />
        <stop offset="1" stopColor="#A855F7" />
      </linearGradient>
    </defs>
  </svg>
)

export const LockIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M18 8H17V6C17 3.24 14.76 1 12 1C9.24 1 7 3.24 7 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8ZM9 6C9 4.34 10.34 3 12 3C13.66 3 15 4.34 15 6V8H9V6ZM18 20H6V10H18V20Z"
      fill="url(#lock-gradient)"
    />
    <path
      d="M12 17C13.1 17 14 16.1 14 15C14 13.9 13.1 13 12 13C10.9 13 10 13.9 10 15C10 16.1 10.9 17 12 17Z"
      fill="#ffffff"
    />
    <defs>
      <linearGradient id="lock-gradient" x1="4" y1="1" x2="20" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FDE68A" />
        <stop offset="1" stopColor="#FBBF24" />
      </linearGradient>
    </defs>
  </svg>
)

export const ZapIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M11 21H9.99999L10.5 14H6.99999C6.59999 14 6.29999 13.8 6.09999 13.5C5.89999 13.2 5.89999 12.8 5.99999 12.5L9.59999 3.5C9.79999 3.2 10.1 3 10.5 3H16.5C16.8 3 17.1 3.1 17.3 3.4C17.5 3.6 17.6 4 17.5 4.3L16 10H19.5C19.9 10 20.3 10.2 20.4 10.6C20.6 11 20.5 11.4 20.3 11.7L13.3 20.7C13 21 12.6 21.1 12.3 21C11.9 21 11.5 20.7 11.4 20.3L11 21ZM7.79999 12H12C12.3 12 12.5 12.1 12.7 12.3C12.9 12.5 13 12.7 12.9 13L12.5 19L17.8 12H14C13.7 12 13.5 11.9 13.3 11.7C13.1 11.5 13 11.3 13.1 11L14.6 5H11.2L7.79999 12Z"
      fill="url(#zap-gradient)"
    />
    <defs>
      <linearGradient id="zap-gradient" x1="6" y1="3" x2="20" y2="21" gradientUnits="userSpaceOnUse">
        <stop stopColor="#6EE7B7" />
        <stop offset="1" stopColor="#10B981" />
      </linearGradient>
    </defs>
  </svg>
)
