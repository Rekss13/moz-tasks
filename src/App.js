import React, {useState} from "react";
import ThemeContext from "./context/ThemeContext";
import AppTheme from "./AppTheme";
import Header from "./components/Header";
import Main from "./components/Main";

const DATA = [
    { id: "todo-0", name: "Eat", completed: true },
    { id: "todo-1", name: "Sleep", completed: false },
    { id: "todo-2", name: "Repeat", completed: false }
];

function App() {
    const themeHook = useState("light");
    const theme = themeHook[0];
    const currentTheme = AppTheme[theme];
    document.body.style.background = currentTheme.backgroundColor;

    return (
        <ThemeContext.Provider value={themeHook}>
            <div style={{
                background: `${currentTheme.backgroundColor}`
            }}>
                <div className="todoapp stack-large">
                    <Header />
                    <Main tasks={DATA} />
                </div>
            </div>
        </ThemeContext.Provider>
    );
}

export default App;
