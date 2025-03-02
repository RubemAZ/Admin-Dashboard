import { useState } from 'react'
import type { ColumnType } from 'antd/es/table'
import MainList from '../components/MainList'
import MainListModal from '../components/MainListModal'
import MainListHeaderNavigation from '../components/MainListHeaderNavigation'

const SPACING = 24

interface User {
  id: number
  name: string
  email: string
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'João Silva', email: 'joao@example.com' },
    { id: 2, name: 'Maria Oliveira', email: 'maria@example.com' }
  ])
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users)
  const [selectedItems, setSelectedItems] = useState<User[]>([])
  const [openModal, setOpenModal] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)

  const handleCreate = (values: Omit<User, 'id'>): void => {
    if (editingUser) {
      // Edição
      setUsers(users.map((user) => (user.id === editingUser.id ? { ...user, ...values } : user)))
      setEditingUser(null)
    } else {
      // Criação
      setUsers([...users, { id: users.length + 1, ...values }])
    }
    setOpenModal(false)
    setFilteredUsers(users)
  }

  const handleEdit = (user: User): void => {
    setEditingUser(user)
    setOpenModal(true)
  }

  const handleSelectItem = (item: User, selected: boolean): void => {
    if (selected) {
      setSelectedItems([...selectedItems, item])
    } else {
      setSelectedItems(selectedItems.filter((selected) => selected.id !== item.id))
    }
  }

  const handleSelectAll = (selectAll: boolean): void => {
    setSelectedItems(selectAll ? [...filteredUsers] : [])
  }

  const handleDeleteSelected = (): void => {
    setUsers(users.filter((user) => !selectedItems.includes(user)))
    setFilteredUsers(filteredUsers.filter((user) => !selectedItems.includes(user)))
    setSelectedItems([])
  }

  const handleSearch = (searchTerm: string): void => {
    const term = searchTerm.toLowerCase()
    setFilteredUsers(users.filter((user) => user.name.toLowerCase().includes(term)))
  }

  const handleAdd = (): void => {
    setEditingUser(null)
    setOpenModal(true)
  }

  const columns: ColumnType<User>[] = [
    { title: 'Nome', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' }
  ]

  return (
    <div style={{ padding: SPACING }}>
      <MainListHeaderNavigation
        selectedItems={selectedItems}
        onSelectAll={handleSelectAll}
        onDeleteSelected={handleDeleteSelected}
        onSearch={handleSearch}
        onAdd={handleAdd}
        totalItems={filteredUsers.length}
        addButtonLabel="Adicionar Usuário"
      />
      <MainList
        data={filteredUsers}
        columns={columns}
        selectedItems={selectedItems}
        onSelectItem={handleSelectItem}
        onEdit={handleEdit}
      />
      <MainListModal
        open={openModal}
        onClose={() => {
          setOpenModal(false)
          setEditingUser(null)
        }}
        onSave={handleCreate}
        fields={[{ name: 'name', label: 'Nome' }, { name: 'email', label: 'Email' }]}
        initialValues={editingUser || undefined}
      />
    </div>
  )
}