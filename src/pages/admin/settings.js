import { useEffect, useState } from "react";
import Layout from "../../../components/admin/Layout";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SettingsPage() {
  const [products, setProducts] = useState([]);
  const [feature, setFeature] = useState(null);
  const [product, setProduct] = useState(null);
  const route = useRouter();
  const fetchData = () => {
    axios.get("/api/admin/products").then((response) => {
      setProducts(response.data);
      setFeature(response.data.find((item) => item.setFeature === true));
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const onSetFeature = (product) => {
    axios
      .put("/api/products", {
        newID: product,
        oldID: feature?._id ? feature._id : null,
      })
      .then((res) => {
        fetchData();
      })
      .catch((err) => {});
  };

  return (
    <Layout>
      <h1 className="cstext-heading">Set Feature</h1>
      <div className="set-feature-section">
        <select
          value={
            (product !== null ? product : feature !== null && feature?._id) ||
            null
          }
          className="csselect"
          onChange={(ev) => {
            setProduct(ev.target.value);
          }}
        >
          {products.length > 0 ? (
            products.map((c, ci) => (
              <option value={c._id} key={ci}>
                {c.title}
              </option>
            ))
          ) : (
            <option>No Product Available to Set Feature</option>
          )}
        </select>
        {products.length > 0 ? (
          <button
            className="csbtn-save"
            disabled={
              !(product !== null && feature !== null && feature._id !== product)
            }
            onClick={() => {
              onSetFeature(product);
            }}
          >
            Save
          </button>
        ) : (
          <Link className="btn-add" href={"/admin/products/new"} c>
            Add new product
          </Link>
        )}
      </div>
    </Layout>
  );
}
