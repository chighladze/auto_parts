import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const ThemeSwitcher = () => {
  const { t } = useTranslation();
  const [darkMode, setDarkMode] = useState(false);

  // Function to apply theme styles
  const applyTheme = (isDark) => {
    const root = document.documentElement;
    
    if (isDark) {
      document.body.classList.add('dark-mode');
      root.setAttribute('data-theme', 'dark');
      // Dark theme variables
      root.style.setProperty('--table-bg', '--dark-2');
      root.style.setProperty('--table-color', '#ffffff');
      root.style.setProperty('--table-border-color', '#2d3239');
      root.style.setProperty('--table-hover-bg', '#2d3239');
      root.style.setProperty('--table-hover-color', '#ffffff');
      root.style.setProperty('--table-striped-bg', '#242529');
      root.style.setProperty('--table-striped-color', '#ffffff');
    } else {
      document.body.classList.remove('dark-mode');
      root.setAttribute('data-theme', 'light');
      // Light theme variables
      root.style.setProperty('--table-bg', '#ffffff');
      root.style.setProperty('--table-color', '#1f2937');
      root.style.setProperty('--table-border-color', '#e5e7eb');
      root.style.setProperty('--table-hover-bg', '#f3f4f6');
      root.style.setProperty('--table-hover-color', '#1f2937');
      root.style.setProperty('--table-striped-bg', '#f9fafb');
      root.style.setProperty('--table-striped-color', '#1f2937');
    }
  };

  // Load theme on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDarkMode = savedTheme === 'dark' || (savedTheme === null && prefersDarkMode);
    
    setDarkMode(isDarkMode);
    applyTheme(isDarkMode);

    // Add listener for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      if (localStorage.getItem('theme') === null) {
        const newDarkMode = e.matches;
        setDarkMode(newDarkMode);
        applyTheme(newDarkMode);
      }
    };

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
    applyTheme(newDarkMode);
  };

  return (
    <button
      onClick={toggleTheme}
      className="w-40-px h-40-px bg-neutral-200 rounded-circle d-flex justify-content-center align-items-center"
      title={darkMode ? t('common.switch_to_light') : t('common.switch_to_dark')}
    >
      {darkMode ? (
        <Icon icon="ph:sun-bold" className="text-primary-light text-xl" />
      ) : (
        <Icon icon="ph:moon-bold" className="text-primary-light text-xl" />
      )}
    </button>
  );
};

export default ThemeSwitcher;