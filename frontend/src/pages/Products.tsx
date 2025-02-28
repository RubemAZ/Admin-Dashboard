import { useState } from 'react';
import { Button } from 'antd';
import type { ColumnType } from 'antd/es/table';
import MainList from '../components/MainList';
import MainListModal from '../components/MainListModal';

const SPACING = 24;

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

type ProductCreate = Omit<Product, 'id'>;

export default function Products() {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: 'Notebook', price: 2999.99, stock: 10 },
    { id: 2, name: 'Mouse', price: 49.90, stock: 50 },
  ]);
  const [openModal, setOpenModal] = useState(false);

  const handleCreate = (values: ProductCreate): void => {
    setProducts([...products, { id: products.length + 1, ...values }]);
  };

  const handleDelete = (id: number): void => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const columns: ColumnType<Product>[] = [
    { title: 'Nome', dataIndex: 'name', key: 'name' },
    { title: 'Preço', dataIndex: 'price', key: 'price', render: (value: number) => `R$ ${value.toFixed(2)}` },
    { title: 'Estoque', dataIndex: 'stock', key: 'stock' },
  ];

  return (
      <div style={{ padding: SPACING }}>
        <Button type="primary" onClick={() => setOpenModal(true)}>
          Adicionar Produto
        </Button>
        <MainList
          data={products}
          columns={columns}
          onDelete={handleDelete}
        />
        <MainListModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          onSave={handleCreate}
          fields={[{ name: 'name', label: 'Nome' }, { name: 'price', label: 'Preço', type: 'number' }, { name: 'stock', label: 'Estoque', type: 'number' }]}
        />
      </div>
  );
}