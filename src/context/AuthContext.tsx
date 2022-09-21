import {createContext, useEffect, useState} from 'react';
import {getAuth, onIdTokenChanged, User} from 'firebase/auth';
import nookies from 'nookies';

const AuthContext = createContext<{ user: User | null }>({
  user: null,
});

export default AuthContext
