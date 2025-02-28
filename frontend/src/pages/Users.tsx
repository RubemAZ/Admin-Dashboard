import { useState } from 'react'
import { Button } from 'antd'
import type { ColumnType } from 'antd/es/table'
import MainList from '../components/MainList'
import MainListModal from '../components/MainListModal'

const SPACING = 24

interface User {
  id: number
  name: string
  email: string
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'João Silva', email: 'joao@example.com' },
    { id: 2, name: 'Maria Oliveira', email: 'maria@example.com' },
  ]);
  const [openModal, setOpenModal] = useState(false)

  const handleCreate = (values: Omit<User, 'id'>): void => {
    setUsers([...users, { id: users.length + 1, ...values }])
  }

  const handleDelete = (id: number): void => {
    setUsers(users.filter((user) => user.id !== id))
  }
  const columns: ColumnType<User>[] = [
    { title: 'Nome', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
  ]

  return (
      <div style={{ padding: SPACING }}>
        <Button type="primary" onClick={() => setOpenModal(true)}>
          Adicionar Usuário
        </Button>
        <MainList
          data={users}
          columns={columns}
          onDelete={handleDelete}
        />
        <MainListModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          onSave={handleCreate}
          fields={[{ name: 'name', label: 'Nome' }, { name: 'email', label: 'Email' }]}
        />
      </div>
  )
}