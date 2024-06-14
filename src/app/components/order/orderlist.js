'use client';
import React, { useEffect, useState } from 'react';
import { getOrders } from './retrieveOrders';
import Order from './orders';
import { or } from 'firebase/firestore';


// Menu component as well
const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersData = await getOrders();
        console.log()
        setOrders(ordersData);
      } catch (error) {
        setError('Failed to fetch orders');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);



  // TODO Maybe loading animation
  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto p-4 flex justify-center items-center">
      <ul className="grid grid-cols-2 gap-6 mx-auto sm:grid-cols-2 lg:grid-cols-4">
        {orders.map((order) => (
          <li key={order.id} className="list-none flex justify-center items-center">
            <Order name={order.product_name} toppings={order.toppings} price={order.Total_Price} user_name={order.first_name + " " + order.last_name} />
          </li>
        ))}
      </ul>
    </div>
  );
  
};

export default OrdersList;
