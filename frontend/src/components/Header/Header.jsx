import { Link } from "react-router-dom";
import Logo from "../../assets/Logo/logo.svg";

const Header = () => {
	return (
		<header>
			<div>
				<Link>
					<img src={Logo} alt="Airneis logo mobile" />
				</Link>
			</div>
		</header>
	);
};

export default Header;
