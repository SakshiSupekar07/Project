import React, { useState, useContext, useEffect } from 'react';
import './Menu.css'
import { fetchMenu, fetchMenuByType } from '../../Services/MenuService';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartProvider';
import { addItemToCart } from '../../Services/AddToCartService';
import { isLoggedIn } from '../../components/Auth';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';
import { UserContext } from '../../context/UserProvider';
import Base from '../../components/Base/Base';

const Menu = () => {

    const [data, setData] = useState([]);
    const [type, setType] = useState('Breakfast');
    const { cartData } = useContext(CartContext);
    const { userData } = useContext(UserContext)

    const navigate = useNavigate();

    useEffect(() => {
        fetchMenu().then((response) => {
            // response.
            //console.log(response.data[0])
            setData(response)
        })
            // .then((response))
            //   .then((data) => setData(data))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    const getMenuByType = (type) => {
        console.log(type)
        fetchMenuByType(type).then((response) => {
            // response.
            //console.log(response.data[0])
            console.log(response)
            setData(response)
        })
    }

    const addToCart = (id) => {
        if(isLoggedIn() && userData != null){
            addItemToCart(userData.userId, id).then((response)=>{
                console.log(response)
                toast.success("Item added to cart successfully..!")
            }).catch((error) => {
                console.log(error)
            })
        }
        else {
            toast.error("Please login to add items to cart..")
        }
    }

    return (
        <Base>
        <div className='menu-container'>
            <div className="menu-header">
                <div className="menu-display" id="menu-display">
                    {/* <h2>Top Thalis For You</h2> */}
                    {
                        data && (
                            <div className='menu-type'>
                                <button onClick={() => getMenuByType("Thali")}>Thali</button> | <button onClick={() => getMenuByType("Breakfast")}>Breakfast</button>
                            </div>
                        )
                    }
                    <div className="menu-grid">
                        {data.map((data) => (
                            <div key={data.menuId} className="menu-card">
                                <img src={data.imageUrl} alt={data.menuName} className="menu-image" />
                                <div className="menu-info">
                                    <h3>{data.menuName}</h3>
                                    <p className="menu-description">{data.description}</p>
                                    <p className="menu-price">Price:<img src={assets.ruppee} className='ruppee-img' /> {data.price}</p>
                                    <div className='menu-buttons'>
                                        <button onClick={() => addToCart(data.menuId)} className="add-to-cart">Add to Cart</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        </Base>
    );
};

export default Menu;
