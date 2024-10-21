import toast from "react-hot-toast";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";


const AddProduct = () => {


 const axiosPublic = useAxiosPublic()
 const navigate = useNavigate(); 

    const handleAddProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const name = formData.get("name");
        const image = formData.get("image");
        const price = formData.get("price");
        const category = formData.get("category");
        const brand = formData.get("brand");
      

        const info ={ name,image,category,price, brand}
        console.log(info);


        try {
            const response = await axiosPublic.put('/addproduct', info); // Send POST request
            console.log('Product added:', response.data);
            toast.success('Product added Successfully')
            setTimeout(() => {
                navigate('/'); 
            }, 2000);
        } catch (error) {
            console.error('Error adding product:', error);
        }

    }


    return (
        <div className="container px-4 py-10 mx-auto">
            <h1 className="text-4xl text-center font-semibold mt-10">Add Your Gadget</h1>
            <form onSubmit={handleAddProduct} className="mt-10">
                <div className="grid grid-cols-2 gap-8">
                    <div>
                        <label htmlFor="name" className="block mb-2">Name</label>
                        <input type="text" id="name" name="name" className="w-full p-2 border rounded-md focus:outline-slate-400" placeholder="Name" />

                        <label htmlFor="image" className="block mt-4 mb-2">Image</label>
                        <input type="text" id="image" name="image" className="w-full p-2 border rounded-md focus:outline-slate-400" placeholder="Image URL" />

                        <label htmlFor="price" className="block mt-4 mb-2">Price</label>
                        <input type="number" id="quantity" name="price" className="w-full p-2 border rounded-md focus:outline-slate-400" placeholder="price" />
                    </div>

                    <div>
                        <label htmlFor="category" className="block mb-2">Category</label>
                        <select
                        name="category"
                        id="category"
                        className="w-full p-2 border rounded-md focus:outline-slate-400"
                        type="text"
                       
                        placeholder="Select Category"
                    >
                        <option value="Mobile" selected>
                        Mobile
                        </option>
                        <option value="Tablet" selected>
                        Tablet
                        </option>
                        <option value="Laptop" selected>
                        Laptop
                        </option>
                        <option value="Earphone" selected>
                        Earphone
                        </option>
                        <option value="SoundBox" selected>
                        SoundBox
                        </option>
                    </select>

                        <label htmlFor="rating" className="block mt-4 mb-2">Brand</label>
                        <input type="text" id="rating" name="brand" className="w-full p-2 border rounded-md focus:outline-slate-400" min="1" max="5" step="0.1" placeholder="brand" />


                      

                    </div>
                </div>

                <button type="submit" className="btn-block px-4  py-2 mt-4 bg-green-600 text-white rounded hover:bg-green-700">
                    Add Product</button>
            </form>
        </div>
    );
};

export default AddProduct;