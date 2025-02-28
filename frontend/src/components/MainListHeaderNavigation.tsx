import { Button, Input, Space, Popconfirm } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

interface MainListHeaderNavigationProps<T> {
  selectedItems: T[];
  onSelectAll: (selectAll: boolean) => void
  onDeleteSelected: () => void
  onSearch: (searchTerm: string) => void
  totalItems: number
}

export default function MainListHeaderNavigation<T>({
  selectedItems,
  onSelectAll,
  onDeleteSelected,
  onSearch,
  totalItems,
}: MainListHeaderNavigationProps<T>) {
  const isAllSelected = selectedItems.length === totalItems && totalItems > 0

  const handleSelectAllToggle = () => {
    onSelectAll(!isAllSelected)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value)
  }

  return (
    <Space style={{ marginBottom: 16, width: '100%', justifyContent: 'space-between' }}>
      <Space>
        <Button onClick={handleSelectAllToggle}>
          {isAllSelected ? 'Desmarcar Todos' : 'Selecionar Todos'} ({selectedItems.length}/{totalItems})
        </Button>
        <Popconfirm
          title={`Tem certeza que deseja excluir ${selectedItems.length} item(s) selecionado(s)?`}
          onConfirm={onDeleteSelected}
          okText="Sim"
          cancelText="Não"
          disabled={selectedItems.length === 0}
        >
          <Button
            type="primary"
            danger
            disabled={selectedItems.length === 0}
          >
            Excluir Selecionados
          </Button>
        </Popconfirm>
      </Space>
      <Input
        placeholder="Pesquisar por nome"
        prefix={<SearchOutlined />}
        onChange={handleSearch}
        style={{ width: 200 }}
        allowClear
      />
    </Space>
  )
}