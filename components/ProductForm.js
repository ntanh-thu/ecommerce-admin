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

  const [messageValidate, setMessageValidate] = useState({
    title: false,
    description: false,
    price: false,
    images: false,
    category: false,
  });

  const router = useRouter();

  useEffect(() => {
    const defaultCategory = [{ _id: "0", name: "Uncategorized", properties: [] }];
    axios.get("/api/category").then((res) => {
      if (_id) {
        setCategories(res.data);
      } else {
        setCategories(defaultCategory.concat(res.data));
      }
    });
  }, []);

  async function saveProduct(ev) {
    ev.preventDefault();
    const data = {
      title,
      description,
      price,
      images,
      category,
      properties: productProperties,
    };
    if (validateProduct(data)) {
      if (_id) {
        await axios.put("/api/products", { ...data, _id, category: category === "0" ? "" : category });
      } else {
        await axios.post("/api/products", data);
      }
      setGoToProduct(true);
    }
  }

  if (goToProduct) {
    router.push("/products");
  }

  const validateProduct = (data) => {
    if (data.title.length === 0) {
      setMessageValidate((item) => {
        return { ...item, title: true };
      });
      return false;
    } else if (data.category.length === 0) {
      setMessageValidate((item) => {
        return { ...item, category: true };
      });
      return false;
    } else if (data.images.length === 0) {
      setMessageValidate((item) => {
        return { ...item, images: true };
      });
      return false;
    } else if (data.description.length === 0) {
      setMessageValidate((item) => {
        return { ...item, description: true };
      });
      return false;
    } else if (data.price.length === 0) {
      setMessageValidate((item) => {
        return { ...item, price: true };
      });
      return false;
    } else {
      setMessageValidate((item) => {
        return { title: false, description: false, images: false, price: false };
      });
      return true;
    }
  };

  function getBase64(file, cb) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      setImages((prev) => [...prev, reader.result]);
    });
    if (file) {
      reader.readAsDataURL(file[0]);
    }
  }
  async function uploadImage(ev) {
    const files = ev.target?.files;
    if (messageValidate.images) {
      setMessageValidate({ ...messageValidate, images: false });
    }
    if (files?.length > 0) {
      setUploading(true);
      getBase64(files);
      setUploading(false);
    }
  }

  const updateImagesOrder = (images) => {
    setImages(images);
  };

  const properties = (categories, category) => {
    const propertiesToFill = [];
    if (categories.length > 0 && category.length !== 0) {
      let catInfor = categories.find(({ _id }) => _id === category);
      propertiesToFill.push(...catInfor.properties);
      if (catInfor?.parent?._id) {
        const parentCat = categories.find(({ _id }) => _id === catInfor?.parent?._id);
        propertiesToFill.push(...parentCat.properties);
      }
      return propertiesToFill;
    } else {
      return [];
    }
  };
  function setProductProp(propName, value) {
    setProductProperties((prev) => {
      const newProductPros = { ...prev };
      newProductPros[propName] = value;
      return newProductPros;
    });
  }

  return (
    <div className="product-form-bg">
      <form onSubmit={saveProduct} className="product-form">
        <div className="product-form-row">
          <div className="product-form-row-item">
            <label className="cslabel">Product Name</label>
            <input
              type="text"
              placeholder="product name"
              className="csinput"
              value={title}
              onChange={(ev) => {
                if (messageValidate.title) {
                  setMessageValidate({ ...messageValidate, title: false });
                }
                setTitle(ev.target.value);
              }}
            />
            {messageValidate.title ? <div className="cstext-validate">Product name cannot be empty !</div> : null}
          </div>
          <div className="product-form-row-item">
            <label className="cslabel">Category</label>
            <select
              value={category}
              className="csselect"
              onChange={(ev) => {
                if (messageValidate.category) {
                  setMessageValidate({ ...messageValidate, category: false });
                }
                setCategory(ev.target.value);
              }}
            >
              {categories.length > 0 &&
                categories.map((c, ci) => (
                  <option value={c._id} key={ci}>
                    {c.name}
                  </option>
                ))}
            </select>
            {messageValidate.category ? <div className="cstext-validate">Please select a product category.</div> : null}
          </div>
        </div>
        {properties(categories, category).length !== 0 && (
          <div className="product-form-property-row">
            {properties(categories, category).map((p, i) => (
              <div key={i} className="product-form-property-row-item">
                <label className="cslabel">{p.name[0].toUpperCase() + p.name.substring(1)}</label>
                <div>
                  <select
                    value={productProperties[p.name]}
                    className="csselect"
                    onChange={(ev) => {
                      setProductProp(p.name, ev.target.value);
                    }}
                  >
                    {p.values.map((v, vi) => (
                      <option value={v} key={vi}>
                        {v}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="product-form-row">
          <div className="product-form-row-item">
            <label className="cslabel">Description</label>
            <textarea
              placeholder="description"
              className="cstextarea"
              value={description}
              onChange={(ev) => {
                setDescription(ev.target.value);
                if (messageValidate.description) {
                  setMessageValidate({ ...messageValidate, description: false });
                }
              }}
            />
            {messageValidate.description ? (
              <div className="cstext-validate">Product description cannot be empty.</div>
            ) : null}
          </div>
          <div className="product-form-row-item">
            <label className="cslabel">Photos</label>
            <div className="my-2 flex flex-wrap gap-1">
              <ReactSortable list={images} setList={updateImagesOrder} className="flex flex-wrap gap-1">
                <>
                  {!!images?.length &&
                    images?.map((link, i) => (
                      <div key={i} className="upload-file">
                        <img src={link} alt="" className="rounded-lg" />
                      </div>
                    ))}
                  <label className="upload">
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
                    <div>Add image</div>
                    <input type="file" className="hidden" onChange={uploadImage} />
                  </label>
                </>
              </ReactSortable>
              {isUploading && (
                <div className="h-24 flex items-center">
                  <Spinner />
                </div>
              )}
            </div>
            {messageValidate.images ? <div className="cstext-validate">Please select a product image.</div> : null}
          </div>
        </div>
        <div>
          <div>
            <label className="cslabel">Price (in USD)</label>
            <input
              type="number"
              placeholder="price"
              className="csinput"
              value={price}
              onChange={(ev) => {
                if (messageValidate.price) {
                  setMessageValidate({ ...messageValidate, price: false });
                }
                setPrice(ev.target.value);
              }}
            />
            {messageValidate.price ? (
              <div className="cstext-validate">Please enter a valid price (greater than 0).</div>
            ) : null}
          </div>
        </div>

        <div className="product-form-control-row">
          <button className="csbtn-save" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
