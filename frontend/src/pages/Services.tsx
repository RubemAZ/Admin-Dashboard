import { useState } from 'react';
import type { ColumnType } from 'antd/es/table';
import MainList from '../components/MainList';
import MainListModal from '../components/MainListModal';
import MainListHeaderNavigation from '../components/MainListHeaderNavigation';

const SPACING = 24;

interface Service {
  id: number;
  name: string;
  description: string;
}

export default function Services() {
  const [services, setServices] = useState<Service[]>([
    { id: 1, name: 'Consultoria', description: 'Serviço de consultoria' },
    { id: 2, name: 'Manutenção', description: 'Manutenção geral' },
  ]);
  const [filteredServices, setFilteredServices] = useState<Service[]>(services);
  const [selectedItems, setSelectedItems] = useState<Service[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  const handleCreate = (values: Omit<Service, 'id'>): void => {
    if (editingService) {
      // Edição
      setServices(services.map((service) => (service.id === editingService.id ? { ...service, ...values } : service)));
      setEditingService(null);
    } else {
      // Criação
      setServices([...services, { id: services.length + 1, ...values }]);
    }
    setOpenModal(false);
    setFilteredServices(services);
  };

  const handleEdit = (service: Service): void => {
    setEditingService(service);
    setOpenModal(true);
  };

  const handleSelectItem = (item: Service, selected: boolean): void => {
    if (selected) {
      setSelectedItems([...selectedItems, item]);
    } else {
      setSelectedItems(selectedItems.filter((selected) => selected.id !== item.id));
    }
  };

  const handleSelectAll = (selectAll: boolean): void => {
    setSelectedItems(selectAll ? [...filteredServices] : []);
  };

  const handleDeleteSelected = (): void => {
    setServices(services.filter((service) => !selectedItems.includes(service)));
    setFilteredServices(filteredServices.filter((service) => !selectedItems.includes(service)));
    setSelectedItems([]);
  };

  const handleSearch = (searchTerm: string): void => {
    const term = searchTerm.toLowerCase();
    setFilteredServices(services.filter((service) => service.name.toLowerCase().includes(term)));
  };

  const handleAdd = (): void => {
    setEditingService(null);
    setOpenModal(true);
  };

  const columns: ColumnType<Service>[] = [
    { title: 'Nome', dataIndex: 'name', key: 'name' },
    { title: 'Descrição', dataIndex: 'description', key: 'description' },
  ];

  return (
      <div style={{ padding: SPACING }}>
        <MainListHeaderNavigation
          selectedItems={selectedItems}
          onSelectAll={handleSelectAll}
          onDeleteSelected={handleDeleteSelected}
          onSearch={handleSearch}
          onAdd={handleAdd}
          totalItems={filteredServices.length}
        />
        <MainList
          data={filteredServices}
          columns={columns}
          selectedItems={selectedItems}
          onSelectItem={handleSelectItem}
          onEdit={handleEdit}
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
  );
}