'use client';

import { ThemeProvider } from './context/ThemeContext';
import CalendarApp from './components/CalendarApp/CalendarApp';

export default function Home() {
  return (
    <ThemeProvider>
      <main>
        <CalendarApp />
      </main>
    </ThemeProvider>
  );
}
