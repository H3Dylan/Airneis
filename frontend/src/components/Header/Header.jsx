import { Link } from "react-router-dom";
import Logo from "../../assets/Logo/logo.svg";
import Navbar from "./Navbar";

const Header = () => {
	return (
		<header className="bg-blue-500 h-20">
			<div className="flex justify-between items-center h-full p-2.5">
				<Link to="/" className="block">
					<img src={Logo} alt="Airneis logo mobile" className="logo" />
				</Link>
				<Navbar />
			</div>
		</header>
	);
};

export default Header;
