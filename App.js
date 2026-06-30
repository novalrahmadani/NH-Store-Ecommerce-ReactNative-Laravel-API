// App.js
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import AppStack from './SRC/router/Stack';

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <AppStack />
    </>
  );
}
