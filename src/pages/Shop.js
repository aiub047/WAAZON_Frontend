import {useState, useEffect} from "react";
import apiService from "../services/apiService";
import {ProductOverview} from './ProductOverview';


export const Shop = () => {

    const [products, setProducts] = useState([]);
    const loadProducts = async () => {
        const productData = await apiService.get('products');
        setProducts(productData);
    }

    useEffect(() => {
        (async () => {
            await loadProducts();
        })();
    }, []);


    return (
        <div>
            <div className="row">
                {products.map(p => (
                    <ProductOverview key={p.id} product={p}/>
                ))}
            </div>
        </div>
    );
}