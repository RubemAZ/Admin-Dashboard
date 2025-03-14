import { useState, useEffect } from 'react'
import type { ColumnType } from 'antd/es/table'
import MainList from '../components/MainList'
import MainListModal from '../components/MainListModal'
import MainListHeaderNavigation from '../components/MainListHeaderNavigation'
import api from '../services/api'
import '../App.css'

interface Service {
  id: number
  name: string
  description?: string
  createdAt: string
}

type ServiceCreate = Omit<Service, 'id' | 'createdAt'>

export default function Services() {
  const [services, setServices] = useState<Service[]>([])
  const [filteredServices, setFilteredServices] = useState<Service[]>([])
  const [selectedItems, setSelectedItems] = useState<Service[]>([])
  const [openModal, setOpenModal] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    setLoading(true)
    try {
      const response = await api.get('/services')
      setServices(response.data)
      setFilteredServices(response.data)
    } catch (error) {
      console.error('Erro ao buscar serviços:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async (values: ServiceCreate) => {
    try {
      if (editingService) {
        await api.put(`/services/${editingService.id}`, values)
      } else {
        await api.post('/services', values)
      }
      await fetchServices()
      setOpenModal(false)
      setEditingService(null)
    } catch (error) {
      console.error('Erro ao salvar serviço:', error)
    }
  }

  const handleEdit = (service: Service) => {
    setEditingService(service)
    setOpenModal(true)
  }

  const handleSelectItem = (item: Service, selected: boolean) => {
    if (selected) {
      setSelectedItems([...selectedItems, item])
    } else {
      setSelectedItems(selectedItems.filter((selected) => selected.id !== item.id))
    }
  }

  const handleSelectAll = (selectAll: boolean) => {
    setSelectedItems(selectAll ? [...filteredServices] : [])
  }

  const handleDeleteSelected = async () => {
    try {
      await Promise.all(selectedItems.map((item) => api.delete(`/services/${item.id}`)))
      await fetchServices()
      setSelectedItems([])
    } catch (error) {
      console.error('Erro ao deletar serviços:', error)
    }
  }

  const handleSearch = (searchTerm: string) => {
    const term = searchTerm.toLowerCase()
    setFilteredServices(services.filter((service) => service.name.toLowerCase().includes(term)))
  }

  const handleAdd = () => {
    setEditingService(null)
    setOpenModal(true)
  }

  const columns: ColumnType<Service>[] = [
    { title: 'Nome', dataIndex: 'name', key: 'name' },
    { title: 'Descrição', dataIndex: 'description', key: 'description' },
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
            totalItems={filteredServices.length}
            addButtonLabel="Adicionar Serviço"
        />
        <MainList
            data={filteredServices}
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
              setEditingService(null);
            }}
            onSave={handleCreate}
            fields={[{ name: 'name', label: 'Nome' }, { name: 'description', label: 'Descrição' }]}
            initialValues={editingService || undefined}
        />
      </div>
  )
}