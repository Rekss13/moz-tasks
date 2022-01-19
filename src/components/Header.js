import React, {useContext} from "react";
import ThemeContext from "../context/ThemeContext";
import AppTheme from "../AppTheme";
import ThemeToggler from "../utils/ThemeToggler";

const Header = () => {
    const theme = useContext(ThemeContext)[0];
    const currentTheme = AppTheme[theme];

    return(
        <header style = {{
            backgroundColor: `${currentTheme.backgroundColor}`,
            color: `${currentTheme.textColor}`,
        }}>
            <h1>TodoMatic</h1>
            <ThemeToggler />
        </header>
    );
}

export default Header;