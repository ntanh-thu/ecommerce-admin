import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";

export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
  category: assignedCategory,
  properties: assignedProperties,
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [images, setImages] = useState(existingImages || []);
  const [goToProduct, setGoToProduct] = useState(false);
  const [isUploading, setUploading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(assignedCategory || "");
  const [productProperties, setProductProperties] = useState(assignedProperties || {});
  const router = useRouter();

  useEffect(() => {
    axios.get("/api/category").then((res) => {
      setCategories(res.data);
    });
  }, []);

  async function saveProduct(ev) {
    ev.preventDefault();
    const data = { title, description, price, images, category, properties: productProperties };
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
      setUploading(true);
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }
      const res = await axios.post("/api/upload", data);
      setImages((oldImage) => {
        return [...oldImage, ...res.data.links];
      });
      setUploading(false);
    }
  }

  const updateImagesOrder = (images) => {
    setImages(images);
  };

  const propertiesToFill = [];
  if (categories.length > 0 && category) {
    let catInfor = categories.find(({ _id }) => _id === category);
    propertiesToFill.push(...catInfor.properties);
    while (catInfor?.parent?._id) {
      const parentCat = categories.find(({ _id }) => _id === catInfor?.parent?._id);
      propertiesToFill.push(parentCat.properties);
      catInfor = parentCat;
    }
  }
  function setProductProp(propName, value) {
    setProductProperties((prev) => {
      const newProductPros = { ...prev };
      newProductPros[propName] = value;
      return newProductPros;
    });
  }
  return (
    <form onSubmit={saveProduct}>
      <label>Product Name</label>
      <input type="text" placeholder="product name" value={title} onChange={(ev) => setTitle(ev.target.value)} />
      <label>Category</label>
      <select
        value={category}
        onChange={(ev) => {
          setCategory(ev.target.value);
        }}
      >
        <option value={0}>Uncategorized</option>
        {categories.length > 0 && categories.map((c) => <option value={c._id}>{c.name}</option>)}
      </select>
      {categories.length > 0 &&
        propertiesToFill.map((p) => (
          <div className="flex gap-1">
            <div>{p.name}</div>
            <select
              value={productProperties[p.name]}
              onChange={(ev) => {
                setProductProp(p.name, ev.target.value);
              }}
            >
              {p.values.map((v) => (
                <option value={v}>{v}</option>
              ))}
            </select>
          </div>
        ))}
      <label>Photos</label>
      <div className="mb-2 flex flex-wrap gap-1">
        <ReactSortable list={images} setList={updateImagesOrder} className="flex flex-wrap gap-1">
          {!!images?.length &&
            images?.map((link) => (
              <div key={link} className="h-24">
                <img src={"http://" + link} alt="" className="rounded-lg" />
              </div>
            ))}
        </ReactSortable>
        {isUploading && (
          <div className="h-24 flex items-center">
            <Spinner />
          </div>
        )}
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
