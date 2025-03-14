// src/pages/Users.tsx
import { useState, useEffect } from 'react'
import type { ColumnType } from 'antd/es/table'
import MainList from '../components/MainList'
import MainListModal from '../components/MainListModal'
import MainListHeaderNavigation from '../components/MainListHeaderNavigation'
import api from '../services/api'
import '../App.css'

interface User {
  id: number
  name: string
  email: string
  createdAt: string
}

type UserCreate = Omit<User, 'id' | 'createdAt'>

export default function Users() {
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [selectedItems, setSelectedItems] = useState<User[]>([])
  const [openModal, setOpenModal] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)

  // Carregar usuários ao montar o componente
  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const response = await api.get('/users')
      setUsers(response.data)
      setFilteredUsers(response.data)
    } catch (error) {
      console.error('Erro ao buscar usuários:', error)
    } finally {
      setLoading(false)
    }
  };

  const handleCreate = async (values: UserCreate) => {
    try {
      if (editingUser) {
        await api.put(`/users/${editingUser.id}`, values)
      } else {
        await api.post('/users', values)
      }
      await fetchUsers()
      setOpenModal(false)
      setEditingUser(null)
    } catch (error) {
      console.error('Erro ao salvar usuário:', error)
    }
  }

  const handleEdit = (user: User) => {
    setEditingUser(user)
    setOpenModal(true)
  }

  const handleSelectItem = (item: User, selected: boolean) => {
    if (selected) {
      setSelectedItems([...selectedItems, item])
    } else {
      setSelectedItems(selectedItems.filter((selected) => selected.id !== item.id))
    }
  }

  const handleSelectAll = (selectAll: boolean) => {
    setSelectedItems(selectAll ? [...filteredUsers] : [])
  }

  const handleDeleteSelected = async () => {
    try {
      await Promise.all(selectedItems.map((item) => api.delete(`/users/${item.id}`)))
      await fetchUsers()
      setSelectedItems([])
    } catch (error) {
      console.error('Erro ao deletar usuários:', error)
    }
  }

  const handleSearch = (searchTerm: string) => {
    const term = searchTerm.toLowerCase()
    setFilteredUsers(users.filter((user) => user.name.toLowerCase().includes(term)))
  }

  const handleAdd = () => {
    setEditingUser(null)
    setOpenModal(true)
  }

  const columns: ColumnType<User>[] = [
    { title: 'Nome', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
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
            totalItems={filteredUsers.length}
            addButtonLabel="Adicionar Usuário"
        />
        <MainList
            data={filteredUsers}
            columns={columns}
            selectedItems={selectedItems}
            onSelectItem={handleSelectItem}
            onEdit={handleEdit}
            loading={loading}
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