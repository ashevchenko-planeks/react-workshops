import { useState } from "react";
import { Product, categories, subcategories } from "@/interfaces/product";

interface ProductFormProps {
  data?: Product;
  onSubmit?: (value?: Product) => void;
  onCancel?: () => void;
}
function ProductForm({ data, onSubmit, onCancel }: Readonly<ProductFormProps>) {
  const initial_data = {
    name: "",
    price: "",
    category: "",
    subcategory: undefined
  };

  const [formData, setFormData] = useState(data ?? initial_data);

  const handleChange = (event: React.FormEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target as HTMLInputElement;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert(JSON.stringify(formData));
  };
  return (
    <div className="p-20">
      <div className="max-w-3xl mx-auto space-y-3">
        <form onSubmit={() => onSubmit ?? handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="category">Category:</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="input input-bordered w-full"
            >
              <option key={0} value=""></option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          {formData.category == "Category 2" && (
            <div className="flex flex-col">
              <label htmlFor="subcategory">Subcategory:</label>
              <select
                id="subcategory"
                name="subcategory"
                value={formData.subcategory}
                onChange={handleChange}
                className="input input-bordered w-full"
              >
                {subcategories.map((subcategory) => (
                  <option key={subcategory} value={subcategory}>
                    {subcategory}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="flex justify-between mt-10">
            <button
              onClick={(e) => {
                e.preventDefault();
                onCancel ?? setFormData(initial_data);
              }}
              className="btn btn-outline"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-outline btn-success">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;
