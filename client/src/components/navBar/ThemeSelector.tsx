import React, { useState } from "react";

export const ThemeSelector = () => {
  const theme = localStorage.getItem("theme") || "light";
  const [selectedTheme, setSelectedTheme] = useState(theme);

  const handleThemeChange = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedTheme === "light") {
      localStorage.setItem("theme", "dark");
      setSelectedTheme("dark");
    } else if (selectedTheme === "dark") {
      localStorage.setItem("theme", "light");
      setSelectedTheme("light");
    }
    const themeSetEvent = new CustomEvent("theme", {
      detail: { theme: selectedTheme },
    });
    window.dispatchEvent(themeSetEvent);
  };

  return (
    <button
      className="btn btn-transparent fs-5 border-0 text-black"
      onClick={handleThemeChange}
      data-toggle="popover"
      data-content="Theme"
      title={getThemePopoverTitle(selectedTheme)}
    >
      <i className={`bi-${getThemeIcon(selectedTheme)}`} />
    </button>
  );
};

function getThemeIcon(theme: string) {
  if (theme === "light") {
    return "brightness-high-fill";
  } else if (theme === "dark") {
    return "moon-stars-fill";
  }
}

function getThemePopoverTitle(theme: string) {
  if (theme === "light") {
    return "Light Theme";
  } else if (theme === "dark") {
    return "Dark Theme";
  } else {
    return "System Default Theme";
  }
}
