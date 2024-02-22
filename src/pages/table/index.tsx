import Table from "@/components/Table";
import Layout from "../Layout";
import Dialog from "@/components/Dialog";
import { useState } from "react";
import ProductForm from "@/components/ProductForm";
import { Product } from "@/interfaces/product";

export default function TablePage() {
  const [showForm, setShowForm] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const columns = [
    {
      header: "Actions",
      accessor: "id",
      render: (value: string | number) => {
        return (
          <div>
            <button
              className="btn btn-outline btn-error btn-md"
              onClick={() => setShowDelete(true)}
            >
              Delete
            </button>
            <button
              className="btn btn-outline btn-primary btn-md"
              onClick={() => setShowForm(true)}
            >
              Edit
            </button>
            <Dialog
              isOpen={showDelete}
              onClose={() => {
                setShowDelete(false);
              }}
            >
              <div>
                <h3>
                  Are you sure you wanna delete this item?
                  {data.find(({ id }) => id === value)?.name}
                </h3>
              </div>
              <div className="mt-4 flex gap-2 justify-between">
                <button className="btn btn-outline btn-md" onClick={() => setShowDelete(false)}>
                  Cancel
                </button>
                <button
                  className="btn btn-outline btn-error btn-md"
                  onClick={() => {
                    setShowDelete(false);
                    setProducts(products.filter(({ id }) => id !== value));
                  }}
                >
                  Delete
                </button>
              </div>
            </Dialog>
            <Dialog
              isOpen={showForm}
              onClose={() => {
                setShowForm(false);
              }}
            >
              <ProductForm
                data={data.find(({ id }) => id === value)}
                onCancel={() => {
                  setShowForm(false);
                }}
                onSubmit={() => {
                  setShowForm(false);
                }}
              />
            </Dialog>
          </div>
        );
      }
    },
    {
      header: "Name",
      accessor: "name"
    },
    {
      header: "Price",
      accessor: "price"
    },
    {
      header: "Category",
      accessor: "category"
    }
  ];

  const data: Product[] = [
    {
      id: 1,
      name: "BOSH washing machine",
      price: 2000,
      category: "Category 1"
    },
    {
      id: 2,
      name: "TEFAL grill",
      price: 1500,
      category: "Category 2"
    },
    {
      id: 3,
      name: "TEFAL grill next",
      price: 1500,
      category: "Category 2"
    }
  ];
  const [products, setProducts] = useState<Product[]>(data);
  return (
    <Layout>
      <div className="p-20">
        <Table columns={columns} data={products} />
      </div>
    </Layout>
  );
}
