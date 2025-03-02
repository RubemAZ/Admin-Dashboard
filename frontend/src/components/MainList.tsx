import { Table, Button, Checkbox } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'

interface ListItem {
  id: number
}

interface MainListProps<T extends ListItem> {
  data: T[]
  columns: ColumnsType<T>
  selectedItems: T[]
  onSelectItem: (item: T, selected: boolean) => void
  onEdit: (item: T) => void
}

export default function MainList<T extends ListItem>({ data, columns, selectedItems, onSelectItem, onEdit }: MainListProps<T>) {
  const selectionColumn: ColumnsType<T> = [
    {
      title: '',
      key: 'selection',
      width: 50,
      render: (_, record) => (
        <Checkbox
          checked={selectedItems.some((item) => item.id === record.id)}
          onChange={(e) => onSelectItem(record, e.target.checked)}
        />
      )
    }
  ]

  const editColumn: ColumnsType<T> = [
    {
      title: 'Ações',
      key: 'actions',
      render: (_, record) => (
        <Button
          type="link"
          icon={<EditOutlined />}
          onClick={() => onEdit(record)}
        >
          Editar
        </Button>
      )
    }
  ]

  return (
    <Table
      dataSource={data}
      columns={[...selectionColumn, ...columns, ...editColumn]}
      rowKey="id"
      pagination={false}
    />
  )
}