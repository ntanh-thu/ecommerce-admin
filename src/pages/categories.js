import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { withSwal } from "react-sweetalert2";

function Categories({ swal }) {
  const [editedCategory, setEditedCatogory] = useState(null);
  const [name, setName] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [properties, setProperties] = useState([]);
  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    axios
      .get("/api/category")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {});
  }

  async function saveCategory(ev) {
    ev.preventDefault();
    const data = {
      name,
      parentCategory,
      properties: properties.map((p) => ({ name: p.name, values: p.values.split(",") })),
    };
    if (editedCategory) {
      data._id = editedCategory._id;
      await axios.put("/api/category", data);
      setEditedCatogory(null);
    } else {
      await axios.post("/api/category", data);
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
    setProperties(category.properties.map((p) => ({ name: p.name, values: p.values.join(",") })));
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
          await axios.delete("/api/category?_id=" + _id);
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
      <h1>Categories</h1>
      <label>{editedCategory ? `Edit category ${editedCategory.name}` : "Create new category"}</label>
      <form onSubmit={saveCategory}>
        <div className="flex gap-1">
          <input
            type="text"
            placeholder="Category name"
            onChange={(ev) => {
              setName(ev.target.value);
            }}
            value={name}
          />
          <select
            value={parentCategory}
            onChange={(ev) => {
              setParentCategory(ev.target.value);
            }}
          >
            <option value={0}>No parent category</option>
            {categories.length > 0 &&
              categories.map((category) => <option value={category._id}>{category.name}</option>)}
          </select>
        </div>
        <div className="mb-2">
          <label className="block">Properties</label>
          <button className="btn-default text-sm mb-2" type="button" onClick={addProperties}>
            Add new property
          </button>
          {properties?.length > 0 &&
            properties.map((property, i) => (
              <div className="flex gap-1 mb-2" key={i}>
                <input
                  type="text"
                  value={property.name}
                  className="mb-0"
                  onChange={(ev) => {
                    handlePropertyNameChange(i, property, ev.target.value);
                  }}
                  placeholder="property name (example:color)"
                />
                <input
                  type="text"
                  value={property.values}
                  className="mb-0"
                  onChange={(ev) => {
                    handlePropertyValuesChange(i, property, ev.target.value);
                  }}
                  placeholder="value, comma separated"
                />
                <button
                  className="btn-default"
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
                setProperties([])
              }}
            >
              Cancel
            </button>
          )}
          <button type="submit" className="btn-primary py-1">
            Save
          </button>
        </div>
      </form>
      {!editedCategory && (
        <table className="basic mt-4">
          <thead>
            <tr>
              <td>Category Name</td>
              <td>Parent Category</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 &&
              categories.map((category) => (
                <tr>
                  <td>{category.name}</td>
                  <td>{category?.parent?.name}</td>
                  <td>
                    <button
                      onClick={() => {
                        editCategory(category);
                      }}
                      className="btn-primary mr-1"
                    >
                      Edit
                    </button>
                    <button className="btn-primary" onClick={() => deleteCategory(category)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </Layout>
  );
}

export default withSwal(({ swal }, ref) => <Categories swal={swal} />);
