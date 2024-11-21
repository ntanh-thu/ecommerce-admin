import { useEffect, useState } from "react";
import Layout from "../../../components/admin/Layout";
import axios from "axios";
import { withSwal } from "react-sweetalert2";
import CSTable from "../../../components/admin/CSTable";

function Categories({ swal }) {
  const [editedCategory, setEditedCatogory] = useState(null);
  const [name, setName] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetchCategories();
  }, []);

  function fetchCategories() {
    axios
      .get("/api/admin/category")
      .then((res) => {
        setCategories(res.data);
        setLoading(false);
      })
      .catch((err) => {});
  }

  async function saveCategory(ev) {
    setLoading(true);
    ev.preventDefault();
    const data = {
      name,
      parentCategory,
      properties: properties.map((p) => ({
        name: p.name,
        values: p.values.split(","),
      })),
    };
    if (editedCategory) {
      data._id = editedCategory._id;
      await axios.put("/api/admin/category", data);
      setEditedCatogory(null);
    } else {
      await axios.post("/api/admin/category", data);
    }
    setName("");
    setParentCategory(0);
    setProperties([]);
    fetchCategories();
  }

  function editCategory(category) {
    setEditedCatogory(category);
    setName(category.name);
    setParentCategory(category.parent?._id);
    setProperties(
      category.properties.map((p) => ({
        name: p.name,
        values: p.values.join(","),
      }))
    );
  }

  function deleteCategory(category) {
    swal
      .fire({
        title: "Are you sure ?",
        text: `Do you want to delete ${category.name}?`,
        showCancelButton: true,
        cancelButtonText: "Cancel",
        confirmButtonText: "Yes, Delete !",
        confirmButtonColor: "#d55",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const { _id } = category;
          await axios.delete("/api/admin/category?_id=" + _id);
          fetchCategories();
        }
      })
      .catch((error) => {
        // when promise rejected...
      });
  }

  function addProperties() {
    setProperties((prev) => {
      return [...prev, { name: "", values: "" }];
    });
  }

  function handlePropertyNameChange(i, property, newName) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[i].name = newName;
      return properties;
    });
  }
  function handlePropertyValuesChange(i, property, newValues) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[i].values = newValues;
      return properties;
    });
  }
  function removeProperty(iToRemove) {
    setProperties((prev) => {
      const newProperties = [...prev].filter((property, index) => {
        return index !== iToRemove;
      });
      return newProperties;
    });
  }
  return (
    <Layout>
      <h1 className="cstext-heading">Categories</h1>
      <form onSubmit={saveCategory} className="category-form">
        <label className="cslabel">
          {editedCategory
            ? `Edit category ${editedCategory.name}`
            : "Create new category"}
        </label>
        <div className="category-form-item">
          <input
            type="text"
            placeholder="Category name"
            className="csinput"
            onChange={(ev) => {
              setName(ev.target.value);
            }}
            value={name}
          />
          <select
            value={parentCategory}
            className="csselect"
            onChange={(ev) => {
              setParentCategory(ev.target.value);
            }}
          >
            <option value={0}>No parent category</option>
            {categories.length > 0 &&
              categories.map((category, i) => (
                <option value={category._id} key={i}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>
        <div className="">
          <label className="block cslabel">Properties</label>
          <button
            className="btn-default text-sm my-2"
            type="button"
            onClick={addProperties}
          >
            Add new property
          </button>
          {properties?.length > 0 &&
            properties.map((property, i) => (
              <div className="category-form-item" key={i}>
                <input
                  type="text"
                  value={property.name}
                  className="csinput"
                  onChange={(ev) => {
                    handlePropertyNameChange(i, property, ev.target.value);
                  }}
                  placeholder="property name (example:color)"
                />
                <input
                  type="text"
                  value={property.values}
                  className="csinput"
                  onChange={(ev) => {
                    handlePropertyValuesChange(i, property, ev.target.value);
                  }}
                  placeholder="value, comma separated"
                />
                <button
                  className="btn btn-red"
                  type="button"
                  onClick={() => {
                    removeProperty(i);
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
        </div>
        <div className="flex gap-1">
          {editedCategory && (
            <button
              className="btn-default"
              onClick={() => {
                setEditedCatogory(null);
                setName("");
                setParentCategory("");
                setProperties([]);
              }}
            >
              Cancel
            </button>
          )}
          <button type="submit" className="py-1 csbtn-save">
            Save
          </button>
        </div>
      </form>
      {!editedCategory && (
        <CSTable
          loading={loading}
          header={{
            name: "Category Name",
            parent: "Parent Category",
            actions: "",
          }}
          body={categories.map((category) => {
            console.log(category);

            return {
              ...category,
              parent: category.parent ? category.parent.name : "--",
              actions: (
                <div className="actions">
                  <button
                    onClick={() => {
                      editCategory(category);
                    }}
                    className="btn btn-default mr-1"
                  >
                    Edit
                  </button>
                  <button
                    className="csbtn-red"
                    onClick={() => deleteCategory(category)}
                  >
                    Delete
                  </button>
                </div>
              ),
            };
          })}
        />
      )}
    </Layout>
  );
}

export default withSwal(({ swal }, ref) => <Categories swal={swal} />);
