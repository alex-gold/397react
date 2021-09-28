import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set } from 'firebase/database';
import { useState, useEffect } from 'react';

const firebaseConfig = {
  apiKey: "AIzaSyBhz356slD8CBS79dIte5mr0wXUlSR2C34",
  authDomain: "react-ff9e8.firebaseapp.com",
  databaseURL: "https://react-ff9e8-default-rtdb.firebaseio.com",
  projectId: "react-ff9e8",
  storageBucket: "react-ff9e8.appspot.com",
  messagingSenderId: "738665118554",
  appId: "1:738665118554:web:3dba8daceb3cbf42be5163",
  measurementId: "G-81VKK7JQH9"
};

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export const useData = (path, transform) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const dbRef = ref(database, path);
    return onValue(dbRef, (snapshot) => {
      const val = snapshot.val();
      setData(transform ? transform(val) : val);
      setLoading(false);
      setError(null);
    }, (error) => {
      setData(null);
      setLoading(false);
      setError(error);
    });
  }, [path, transform]);

  return [data, loading, error];
};
  
