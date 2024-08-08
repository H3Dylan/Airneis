import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ShippingForm = ({ userInfo, totalAmount }) => {
    const [selectedAddress, setSelectedAddress] = useState("");
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        region: "",
        postalCode: "",
        country: "",
        phoneNumber: "",
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (userInfo && userInfo.shippingAddresses && userInfo.shippingAddresses.length > 0) {
            const defaultAddress = userInfo.shippingAddresses[0];
            setSelectedAddress(defaultAddress.label);
            setFormData({
                firstName: defaultAddress.firstName || "",
                lastName: defaultAddress.lastName || "",
                addressLine1: defaultAddress.addressLine1 || "",
                addressLine2: defaultAddress.addressLine2 || "",
                city: defaultAddress.city || "",
                region: defaultAddress.region || "",
                postalCode: defaultAddress.postalCode || "",
                country: defaultAddress.country || "",
                phoneNumber: defaultAddress.phoneNumber || "",
            });
        }
    }, [userInfo]);

    const handleAddressChange = (e) => {
        const address = userInfo.shippingAddresses.find(
            (addr) => addr.label === e.target.value
        );
        setSelectedAddress(address.label);
        setFormData({
            firstName: address.firstName || "",
            lastName: address.lastName || "",
            addressLine1: address.addressLine1 || "",
            addressLine2: address.addressLine2 || "",
            city: address.city || "",
            region: address.region || "",
            postalCode: address.postalCode || "",
            country: address.country || "",
            phoneNumber: address.phoneNumber || "",
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        formData.label = selectedAddress
        navigate("/payment", { state: { shippingAddress:formData, totalAmount }});
    };

    return (
        <form
            className="flex flex-col gap-4 p-4 shadow-md items-center"
            onSubmit={handleSubmit}
        >
            <div className="md:flex md:justify-center md:items-center md:gap-12">
                <div >
                    {userInfo.shippingAddresses && userInfo.shippingAddresses.length > 0 && (
                        <div className="mb-4">
                            <label htmlFor="addressSelect" className="block mb-2">
                                Choisir une adresse
                            </label>
                            <select
                                id="addressSelect"
                                value={selectedAddress}
                                onChange={handleAddressChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            >
                                {userInfo.shippingAddresses.map((addr) => (
                                    <option key={addr._id} value={addr.label}>
                                        {addr.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                    <div className="mb-4">
                        <label htmlFor="firstName" className="block mb-2">
                            Prénom*
                        </label>
                        <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="lastName" className="block mb-2">
                            Nom*
                        </label>
                        <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="addressLine1" className="block mb-2">
                            Adresse 1*
                        </label>
                        <input
                            id="addressLine1"
                            name="addressLine1"
                            type="text"
                            value={formData.addressLine1}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="addressLine2" className="block mb-2">
                            Adresse 2 (optionnel)
                        </label>
                        <input
                            id="addressLine2"
                            name="addressLine2"
                            type="text"
                            value={formData.addressLine2}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                </div>
                <div>
                    <div className="mb-4">
                        <label htmlFor="city" className="block mb-2">
                            Ville
                        </label>
                        <input
                            id="city"
                            name="city"
                            type="text"
                            value={formData.city}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="region" className="block mb-2">
                            Région
                        </label>
                        <input
                            id="region"
                            name="region"
                            type="text"
                            value={formData.region}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="postalCode" className="block mb-2">
                            Code Postal
                        </label>
                        <input
                            id="postalCode"
                            name="postalCode"
                            type="text"
                            value={formData.postalCode}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="country" className="block mb-2">
                            Pays
                        </label>
                        <input
                            id="country"
                            name="country"
                            type="text"
                            value={formData.country}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="phoneNumber" className="block mb-2">
                            Numéro de téléphone mobile
                        </label>
                        <input
                            id="phoneNumber"
                            name="phoneNumber"
                            type="text"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                </div>
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                Enregistrer et Continuer
            </button>
        </form>
    );
};

export default ShippingForm;