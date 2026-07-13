import { createContext, useEffect, useMemo, useState } from 'react';

import { getProfile } from '../services/userService';

export const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();

        setUser(response.data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const value = useMemo(
    () => ({
      user,
      setUser,
      loading,
      setLoading,
    }),
    [user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
