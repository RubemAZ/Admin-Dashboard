// src/pages/Products.tsx
import { useState, useEffect } from 'react'
import type { ColumnType } from 'antd/es/table'
import MainList from '../components/MainList'
import MainListModal from '../components/MainListModal'
import MainListHeaderNavigation from '../components/MainListHeaderNavigation'
import api from '../services/api'
import '../App.css'

interface Product {
  id: number
  name: string
  price: number
  stock: number
  createdAt: string
}

type ProductCreate = Omit<Product, 'id' | 'createdAt'>

export default function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [selectedItems, setSelectedItems] = useState<Product[]>([])
  const [openModal, setOpenModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const response = await api.get('/products')
      setProducts(response.data)
      setFilteredProducts(response.data)
    } catch (error) {
      console.error('Erro ao buscar produtos:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async (values: ProductCreate) => {
    try {
      if (editingProduct) {
        await api.put(`/products/${editingProduct.id}`, values)
      } else {
        await api.post('/products', values)
      }
      await fetchProducts()
      setOpenModal(false)
      setEditingProduct(null)
    } catch (error) {
      console.error('Erro ao salvar produto:', error)
    }
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setOpenModal(true)
  }

  const handleSelectItem = (item: Product, selected: boolean) => {
    if (selected) {
      setSelectedItems([...selectedItems, item])
    } else {
      setSelectedItems(selectedItems.filter((selected) => selected.id !== item.id))
    }
  }

  const handleSelectAll = (selectAll: boolean) => {
    setSelectedItems(selectAll ? [...filteredProducts] : [])
  }

  const handleDeleteSelected = async () => {
    try {
      await Promise.all(selectedItems.map((item) => api.delete(`/products/${item.id}`)))
      await fetchProducts()
      setSelectedItems([])
    } catch (error) {
      console.error('Erro ao deletar produtos:', error)
    }
  }

  const handleSearch = (searchTerm: string) => {
    const term = searchTerm.toLowerCase()
    setFilteredProducts(products.filter((product) => product.name.toLowerCase().includes(term)))
  }

  const handleAdd = () => {
    setEditingProduct(null)
    setOpenModal(true)
  }

  const columns: ColumnType<Product>[] = [
    { title: 'Nome', dataIndex: 'name', key: 'name' },
    { title: 'Preço', dataIndex: 'price', key: 'price', render: (value: number) => `R$ ${value.toFixed(2)}` },
    { title: 'Estoque', dataIndex: 'stock', key: 'stock' },
    { title: 'Criado em', dataIndex: 'createdAt', key: 'createdAt', render: (value: string) => new Date(value).toLocaleString() },
  ]

  return (
      <div className="page-content">
        <MainListHeaderNavigation
            selectedItems={selectedItems}
            onSelectAll={handleSelectAll}
            onDeleteSelected={handleDeleteSelected}
            onSearch={handleSearch}
            onAdd={handleAdd}
            totalItems={filteredProducts.length}
            addButtonLabel="Adicionar Produto"
        />
        <MainList
            data={filteredProducts}
            columns={columns}
            selectedItems={selectedItems}
            onSelectItem={handleSelectItem}
            onEdit={handleEdit}
            loading={loading}
        />
        <MainListModal
            open={openModal}
            onClose={() => {
              setOpenModal(false);
              setEditingProduct(null);
            }}
            onSave={handleCreate}
            fields={[
              { name: 'name', label: 'Nome' },
              { name: 'price', label: 'Preço', type: 'number' },
              { name: 'stock', label: 'Estoque', type: 'number' },
            ]}
            initialValues={editingProduct || undefined}
        />
      </div>
  )
}