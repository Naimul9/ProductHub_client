import { useEffect, useState } from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true); // State for loading indicator
    const [error, setError] = useState(null); // State for error handling
    const [successMessage, setSuccessMessage] = useState(null); // State for success message
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                const response = await axiosPublic.get(`/product-detail/${id}`);
                setProduct(response.data); // Set product data
                setLoading(false); // Set loading to false when data is loaded
            } catch (err) {
                console.error("Error fetching product details:", err);
                setError("Failed to fetch product details.");
                setLoading(false); // Set loading to false in case of error
            }
        };

        fetchProductDetail(); // Fetch product details when component mounts
    }, [id, axiosPublic]);

    if (loading) {
        return <div className="text-center">Loading...</div>; // Loading message while data is being fetched
    }

    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const name = formData.get("name");
        const image = formData.get("image");
        const price = formData.get("price");
        const category = formData.get("category");
        const brand = formData.get("brand");

        const updatedProduct = {
            name,
            image,
            price: parseFloat(price), // Convert price to number
            category,
            brand,
        };

        try {
            // Make a PUT request to update the product
            const response = await axiosPublic.put(`/products/${id}`, updatedProduct);
            console.log(response);
            setSuccessMessage("Product updated successfully!");
            setTimeout(() => {
                navigate('/'); 
            }, 2000);
        } catch (error) {
            console.error("Error updating product:", error);
            setError("Failed to update the product. Please try again.");
        }
    };

    return (
        <div className="container px-4 py-10 mx-auto">
            <h1 className="text-4xl text-center font-semibold mt-10">Update Your Gadget</h1>

            {error && <div className="text-center text-red-500">{error}</div>}
            {successMessage && <div className="text-center text-green-500">{successMessage}</div>}

            <form onSubmit={handleUpdateProduct} className="mt-10">
                <div className="grid grid-cols-2 gap-8">
                    <div>
                        <label htmlFor="name" className="block mb-2">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="w-full p-2 border rounded-md focus:outline-slate-400"
                            defaultValue={product?.name || ''} // Check if product is defined
                        />

                        <label htmlFor="image" className="block mt-4 mb-2">Image</label>
                        <input
                            type="text"
                            id="image"
                            name="image"
                            className="w-full p-2 border rounded-md focus:outline-slate-400"
                            placeholder="Image URL"
                            defaultValue={product?.image || ''}
                        />

                        <label htmlFor="price" className="block mt-4 mb-2">Price</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            className="w-full p-2 border rounded-md focus:outline-slate-400"
                            defaultValue={product?.price || ''}
                        />
                    </div>

                    <div>
                        <label htmlFor="category" className="block mb-2">Category</label>
                        <select
                            name="category"
                            id="category"
                            className="w-full p-2 border rounded-md focus:outline-slate-400"
                            defaultValue={product?.category || ''}
                        >
                            <option value="Mobile">Mobile</option>
                            <option value="Tablet">Tablet</option>
                            <option value="Laptop">Laptop</option>
                            <option value="Earphone">Earphone</option>
                            <option value="SoundBox">SoundBox</option>
                        </select>

                        <label htmlFor="brand" className="block mt-4 mb-2">Brand</label>
                        <input
                            type="text"
                            id="brand"
                            name="brand"
                            className="w-full p-2 border rounded-md focus:outline-slate-400"
                            defaultValue={product?.brand || ''}
                        />
                    </div>
                </div>

                <button type="submit" className="btn-block px-4 py-2 mt-4  bg-green-600 text-white rounded hover:bg-green-700">
                    Update Product
                </button>
            </form>
        </div>
    );
};

export default UpdateProduct;
