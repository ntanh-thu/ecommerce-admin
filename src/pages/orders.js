import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import CSTable from "../../components/CSTable";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    axios.get("/api/orders").then((response) => {
      setOrders(response.data);
      setLoading(false);
    });
  }, []);
  return (
    <Layout>
      <CSTable
        loading={loading}
        header={{ date: "Date", paid: "Paid", recipient: "Recipient", products: "Products" }}
        body={orders.map((order) => {
          return {
            ...order,
            date: new Date(order.createdAt).toLocaleString(),
            recipient: (
              <>
                {order.name} {order.email} <br />
                {order.city} {order.postalCode} {order.country} <br />
                {order.streetAddress}
              </>
            ),
            products: (
              <>
                {order?.line_items?.length > 0 &&
                  order.line_items.map((l) => (
                    <>
                      {l.price_data.product_data?.name} x{l.quantity} <br />
                    </>
                  ))}
              </>
            ),
          };
        })}
        width={{ date: "20%", paid: "20%", recipient: "20%", products: "20%" }}
      />
    </Layout>
  );
}
