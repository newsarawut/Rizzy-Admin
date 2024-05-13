"use client";

import { DataTable } from "@/components/custom ui/DataTable";
import { columns } from "@/components/orderItems/OrderItemsColumns";
import { useEffect, useState } from "react";

const OrderDetails = ({ params }: { params: { orderId: string } }) => {
  const [orderId, setOrderId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [totalAmount, setTotalAmout] = useState("");
  const [shippingRate, setShippingRate] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.ADMIN_DASHBOARD_URL}/orders/${params.orderId}`
        );
        const { orderDetails, customer } = await res.json();
        setOrderId(orderDetails._id);
        setCustomerName(customer.name);
        setStreet(orderDetails.shippingAddress.street);
        setCity(orderDetails.shippingAddress.city);
        setState(orderDetails.shippingAddress.state);
        setPostalCode(orderDetails.shippingAddress.postalCode);
        setCountry(orderDetails.shippingAddress.country);
        setTotalAmout(orderDetails.totalAmount);
        setShippingRate(orderDetails.shippingRate);
        setProducts(orderDetails.products);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [params.orderId]);

  return (
    <div className="flex flex-col p-10 gap-5">
      <p className="text-base-bold">
        Order ID: <span className="text-base-medium">{orderId}</span>
      </p>
      <p className="text-base-bold">
        Customer Name: <span className="text-base-medium">{customerName}</span>
      </p>
      <p className="text-base-bold">
        Shipping Address:{" "}
        <span className="text-base-medium">
          {street}, {city}, {state}, {postalCode}, {country}
        </span>
      </p>
      <p className="text-base-bold">
        Total Paid: <span className="text-base-medium">$ {totalAmount}</span>
      </p>
      <p className="text-base-bold">
        Shipping rate ID:{" "}
        <span className="text-base-medium">{shippingRate}</span>
      </p>
      <DataTable columns={columns} data={products} searchKey="product" />
    </div>
  );
};

export default OrderDetails;
