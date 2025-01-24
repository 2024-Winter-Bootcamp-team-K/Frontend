import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserContextType {
  userId: number;
  setUserId: (id: number) => void;
  updateUserIdFromPath: () => void; // 메서드 이름 변경
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userId, setUserId] = useState<number>(() => {
    const savedUserId = localStorage.getItem('userId');
    return savedUserId ? parseInt(savedUserId) : 1;
  });

  useEffect(() => {
    localStorage.setItem('userId', userId.toString());
  }, [userId]);

  const updateUserIdFromPath = () => { // 메서드 이름을 일치시킴
    const pathParts = window.location.pathname.split('/');
    const userIdFromPath = pathParts[pathParts.length - 1];

    const parsedUserId = parseInt(userIdFromPath, 10);
    if (!isNaN(parsedUserId)) {
      setUserId(parsedUserId);
    }
  };

  const value = {
    userId,
    setUserId,
    updateUserIdFromPath, // 메서드 추가
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export default UserContext;