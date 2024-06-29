import { Link } from "react-router-dom";
import Logo from "../../assets/Logo/logo.svg";
import Navbar from "./Navbar";

const Header = () => {
	return (
		<header className="bg-blue-500 h-20">
            <Navbar />
		</header>
	);
};

export default Header;
