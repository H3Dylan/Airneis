import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ShippingForm from "../components/Forms/ShippingForm";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import getUserInfo from "../services/api/getUserInfo";

const ShippingPage = () => {
    const [userInfo, setUserInfo] = useState(null);
    const location = useLocation();
    const { totalTTC } = location.state || {};

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const user = await getUserInfo();
                if (user) {
                    setUserInfo(user);
                }
            } catch (error) {
                console.error("Error fetching user info:", error);
            }
        };
        fetchUserInfo();
    }, []);

    if (userInfo === null) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Header />
            <div>
                <h2 className="text-xl font-bold my-4 text-center">Adresse de Livraison</h2>
                <ShippingForm userInfo={userInfo} totalAmount={totalTTC} />
            </div>
            <Footer />
        </>
    );
};

export default ShippingPage;