import { HiOutlineShoppingCart } from "react-icons/hi2";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import { useContext } from "react";

const CartIcon = () => {
	const { cartCount } = useContext(CartContext);

	return (
		<div className="relative">
			<Link to="/cart">
				<HiOutlineShoppingCart size={30} className="text-white" />
				{cartCount > 0 && (
					<div className="flex justify-center items-center bg-red-500 absolute text-center rounded-full w-4 h-4 text-xs -top-2 -right-2">
						<p>{cartCount}</p>
					</div>
				)}
			</Link>
		</div>
	);
};

export default CartIcon;