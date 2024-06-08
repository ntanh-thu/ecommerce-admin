import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
}) {
  const [title, setTitle] = useState(existingTitle);
  const [description, setDescription] = useState(existingDescription);
  const [price, setPrice] = useState(existingPrice);
  const [images, setImages] = useState(existingImages);
  const [goToProduct, setGoToProduct] = useState(false);
  const router = useRouter();
  async function saveProduct(ev) {
    ev.preventDefault();
    const data = { title, description, price };
    if (_id) {
      await axios.put("/api/products", { ...data, _id });
    } else {
      await axios.post("/api/products", data);
    }
    setGoToProduct(true);
  }
  if (goToProduct) {
    router.push("/products");
  }

  async function uploadImage(ev) {
    const files = ev.target?.files;
    if (files?.length > 0) {
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }
      const res = await fetch("/api/upload", { method: "POST", body: data });
      console.log(res);
    }
  }
  return (
    <form onSubmit={saveProduct}>
      <label>Product Name</label>
      <input type="text" placeholder="product name" value={title} onChange={(ev) => setTitle(ev.target.value)} />
      <label>Photos</label>
      <div className="mb-2">
        <label className="w-24 h-24 cursor-pointer bg-gray-200 text-center gao-1 text-gray-500 rounded-lg flex text-sm items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
            />
          </svg>
          <div>Upload</div>
          <input type="file" className="hidden" onChange={uploadImage} />
        </label>
        <div>{!images?.length && <div>No photos in this product</div>}</div>
      </div>
      <label>Description</label>
      <textarea placeholder="description" value={description} onChange={(ev) => setDescription(ev.target.value)} />
      <label>Price (in USD)</label>
      <input type="number" placeholder="price" value={price} onChange={(ev) => setPrice(ev.target.value)} />
      <button className="btn-primary" type="submit">
        Save
      </button>
    </form>
  );
}
