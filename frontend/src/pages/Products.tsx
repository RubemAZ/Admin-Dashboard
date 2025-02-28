import { useState } from 'react';
import type { ColumnType } from 'antd/es/table';
import MainList from '../components/MainList';
import MainListModal from '../components/MainListModal';
import MainListHeaderNavigation from '../components/MainListHeaderNavigation';

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
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [selectedItems, setSelectedItems] = useState<Product[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleCreate = (values: ProductCreate): void => {
    if (editingProduct) {
      // Edição
      setProducts(products.map((product) => (product.id === editingProduct.id ? { ...product, ...values } : product)));
      setEditingProduct(null);
    } else {
      // Criação
      setProducts([...products, { id: products.length + 1, ...values }]);
    }
    setOpenModal(false);
    setFilteredProducts(products);
  };

  const handleEdit = (product: Product): void => {
    setEditingProduct(product);
    setOpenModal(true);
  };

  const handleSelectItem = (item: Product, selected: boolean): void => {
    if (selected) {
      setSelectedItems([...selectedItems, item]);
    } else {
      setSelectedItems(selectedItems.filter((selected) => selected.id !== item.id));
    }
  };

  const handleSelectAll = (selectAll: boolean): void => {
    setSelectedItems(selectAll ? [...filteredProducts] : []);
  };

  const handleDeleteSelected = (): void => {
    setProducts(products.filter((product) => !selectedItems.includes(product)));
    setFilteredProducts(filteredProducts.filter((product) => !selectedItems.includes(product)));
    setSelectedItems([]);
  };

  const handleSearch = (searchTerm: string): void => {
    const term = searchTerm.toLowerCase();
    setFilteredProducts(products.filter((product) => product.name.toLowerCase().includes(term)));
  };

  const handleAdd = (): void => {
    setEditingProduct(null);
    setOpenModal(true);
  };

  const columns: ColumnType<Product>[] = [
    { title: 'Nome', dataIndex: 'name', key: 'name' },
    { title: 'Preço', dataIndex: 'price', key: 'price', render: (value: number) => `R$ ${value.toFixed(2)}` },
    { title: 'Estoque', dataIndex: 'stock', key: 'stock' },
  ];

  return (
      <div style={{ padding: SPACING }}>
        <MainListHeaderNavigation
          selectedItems={selectedItems}
          onSelectAll={handleSelectAll}
          onDeleteSelected={handleDeleteSelected}
          onSearch={handleSearch}
          onAdd={handleAdd}
          totalItems={filteredProducts.length}
        />
        <MainList
          data={filteredProducts}
          columns={columns}
          selectedItems={selectedItems}
          onSelectItem={handleSelectItem}
          onEdit={handleEdit}
        />
        <MainListModal
          open={openModal}
          onClose={() => {
            setOpenModal(false);
            setEditingProduct(null);
          }}
          onSave={handleCreate}
          fields={[{ name: 'name', label: 'Nome' }, { name: 'price', label: 'Preço', type: 'number' }, { name: 'stock', label: 'Estoque', type: 'number' }]}
          initialValues={editingProduct || undefined}
        />
      </div>
  );
}