import { useState } from 'react'
import { Button } from 'antd'
import type { ColumnType } from 'antd/es/table'
import MainList from '../components/MainList'
import MainListModal from '../components/MainListModal'

const SPACING = 24

interface Service {
  id: number
  name: string
  description: string
}

export default function Services() {
  const [services, setServices] = useState<Service[]>([
    { id: 1, name: 'Consultoria', description: 'Serviço de consultoria' },
    { id: 2, name: 'Manutenção', description: 'Manutenção geral' },
  ])
  const [openModal, setOpenModal] = useState(false)

  const handleCreate = (values: Omit<Service, 'id'>): void => {
    setServices([...services, { id: services.length + 1, ...values }]);
  }

  const handleDelete = (id: number): void => {
    setServices(services.filter((service) => service.id !== id));
  }

  const columns: ColumnType<Service>[] = [
    { title: 'Nome', dataIndex: 'name', key: 'name' },
    { title: 'Descrição', dataIndex: 'description', key: 'description' },
  ]

  return (
      <div style={{ padding: SPACING }}>
        <Button type="primary" onClick={() => setOpenModal(true)}>
          Adicionar Serviço
        </Button>
        <MainList
          data={services}
          columns={columns}
          onDelete={handleDelete}
        />
        <MainListModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          onSave={handleCreate}
          fields={[{ name: 'name', label: 'Nome' }, { name: 'description', label: 'Descrição' }]}
        />
      </div>
  )
}