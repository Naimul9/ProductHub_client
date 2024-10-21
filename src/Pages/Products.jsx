import {  useEffect, useState } from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";


const Products = () => {
   
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        category: '',
        brand: '',
        minPrice: '',
        maxPrice: ''
    });
    const [sort, setSort] = useState('');

    const axiosPublic = useAxiosPublic();

    const fetchProducts = async () => {
        try {
            const query = new URLSearchParams({
                page: currentPage,
                search: searchTerm,
                category: filters.category,
                brand: filters.brand,
                minPrice: filters.minPrice,
                maxPrice: filters.maxPrice,
                sort: sort,
                limit: 10 
            }).toString();

            const response = await axiosPublic.get(`/products?${query}`);
            setProducts(response.data.products);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
   
        fetchProducts()
    }, [currentPage, filters, sort]);


    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        });

        if (result.isConfirmed) {
            try {
                await axiosPublic.delete(`/products/${id}`);
                Swal.fire({
                    title: "Deleted!",
                    text: "Your item has been deleted.",
                    icon: "success"
                });

                fetchProducts();

            } catch (error) {
                console.error('Failed to delete', error);
                error("Failed to delete.");
            }
        }
    };


    return (
        <div className="container mx-auto my-10 px-4">

            {/* Search Input with Button Inside */}
            <div className="flex flex-col lg:flex-row justify-between mb-7 space-y-4 lg:space-y-0">
                <div className="flex w-full lg:max-w-xs">
                    <input 
                        type="text" 
                        value={searchTerm} 
                        onChange={(e) => setSearchTerm(e.target.value)} 
                        placeholder="Search products..." 
                        className="input input-bordered lg:w-64 w-full "
                    />
                    <button 
                        onClick={() => { setCurrentPage(1), fetchProducts(); }} 
                        className="btn bg-orange-400 hover:bg-orange-600 text-white">
                        Search
                    </button>

                   <Link to={'/addproduct'}> <button className="btn lg:w-32 w-32 ml-4 bg-green-500 hover:bg-green-700 text-white">Add New Item</button></Link>
                </div>
                
                {/* Sorting Dropdown */}
                <select 
                    value={sort} 
                    onChange={(e) => { setSort(e.target.value); setCurrentPage(1); }} 
                    className="select select-bordered select-sm w-full lg:w-32">
                    <option value="">Sort By</option>
                    <option value="lowToHigh">Low to High</option>
                    <option value="highToLow">High to Low</option>
                </select>
            </div>

            

            {/* Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-7">
                <select 
                    value={filters.category} 
                    onChange={(e) => { setFilters({...filters, category: e.target.value}); setCurrentPage(1); }} 
                    className="select select-bordered select-sm w-full">
                    <option value="">All Categories</option>
                    <option value="Mobile">Mobile</option>
                    <option value="Tablet">Tablet</option>
                    <option value="Laptop">Laptop</option>
                    <option value="Earphones">Earphone</option>
                    <option value="Soundbox">Soundbox</option>
                </select>

                <select 
                    value={filters.brand} 
                    onChange={(e) => { setFilters({...filters, brand: e.target.value}); setCurrentPage(1); }} 
                    className="select select-bordered select-sm w-full">
                    <option value="">All Brands</option>
                    <option value="Apple">Apple</option>
                    <option value="Samsung">Samsung</option>
                    <option value="Sony">Sony</option>
                    <option value="Google">Google</option>
                    <option value="Acer">Acer</option>
                    <option value="Asus">Asus</option>
                    <option value="Lenovo">Lenovo</option>
                    <option value="Bose">Bose</option>
                    <option value="Edifier">Edifier</option>
                    <option value="Honor">Honor</option>
                    <option value="Xiaomi">Xiaomi</option>
                    <option value="Marshall">Marshall</option>
                    <option value="Dell">Dell</option>
                    <option value="MSI">MSI</option>
                    <option value="Harman Kardon">Harman Kardon</option>
                    <option value="JBL">JBL</option>
                </select>

                <input 
                    type="number" 
                    value={filters.minPrice} 
                    onChange={(e) => { setFilters({...filters, minPrice: e.target.value}); setCurrentPage(1); }} 
                    placeholder="Min Price" 
                    className="input input-bordered h-8 w-full"
                />
                <input 
                    type="number" 
                    value={filters.maxPrice} 
                    onChange={(e) => { setFilters({...filters, maxPrice: e.target.value}); setCurrentPage(1); }} 
                    placeholder="Max Price" 
                    className="input input-bordered h-8 w-full"
                />
            </div>  

            {/* Loading Indicator */}
          
                <>
                    {/* Products Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {products.map(product => (
                            <div key={product.id} className="card bg-base-100 shadow-xl">
                                <figure className="px-10 pt-10">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        loading="lazy"
                                        className="rounded-xl w-full"
                                    />
                                </figure>
                                <div className="card-body ">
                                    <p className="text-sm">{product.brand}</p>
                                    <h2 className="card-title">{product.name}</h2>
                                    <p>{product.category}</p>
                                    <p className="text-lg font-bold">${product.price}</p>
                                    <div className="card-actions flex justify-between">
                                       <Link to={`/products/updateproduct/${product._id}`} > <button className="btn bg-green-600
                                        text-white rounded-lg hover:bg-green-700">Update</button> </Link>
                                        <button onClick={()=>handleDelete(product._id)} className="btn bg-red-600 hover:bg-red-800 text-white">Delete</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                  

                    {/* Pagination Controls */}
                    <div className="flex justify-center mt-10">
                        <button 
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
                            disabled={currentPage === 1}
                            className="btn  bg-blue-600 hover:bg-blue-800 text-white mr-2">
                            Previous
                        </button>
                        <span className="mx-2 flex items-center">Page {currentPage} of {totalPages}</span>
                        <button 
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
                            disabled={currentPage === totalPages}
                            className="btn bg-blue-600 hover:bg-blue-800 text-white">
                            Next
                        </button>
                    </div>
                </>
           
        </div>
    );
};

export default Products;
