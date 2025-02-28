import { Table, Button, Popconfirm } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'

interface ListItem {
  id: number
}

interface MainListProps<T extends ListItem> {
  data: T[]
  columns: ColumnsType<T>
  onDelete: (id: number) => void
}

export default function MainList<T extends ListItem>({ data, columns, onDelete }: MainListProps<T>) {
  const actionColumn: ColumnsType<T> = [
    {
      title: 'Ações',
      key: 'actions',
      render: (_, record) => (
        <Popconfirm
          title="Tem certeza que deseja excluir este item?"
          onConfirm={() => onDelete(record.id)}
          okText="Sim"
          cancelText="Não"
        >
          <Button type="link" danger icon={<DeleteOutlined />} />
        </Popconfirm>
      ),
    },
  ]

  return (
    <Table
      dataSource={data}
      columns={[...columns, ...actionColumn]}
      rowKey="id"
      pagination={false}
    />
  )
}