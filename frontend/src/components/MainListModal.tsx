import { Modal, Form, Input } from 'antd';
import type { FormInstance } from 'antd/es/form';

interface FormField {
  name: string;
  label: string;
  type?: 'text' | 'number';
}

interface MainListModalProps<T extends Record<string, string | number>> {
  open: boolean;
  onClose: () => void;
  onSave: (values: T) => void;
  fields: FormField[];
  initialValues?: T;
}

export default function MainListModal<T extends Record<string, string | number>>({
  open,
  onClose,
  onSave,
  fields,
  initialValues,
}: MainListModalProps<T>) {
  const [form]: [FormInstance<T>] = Form.useForm();

  const handleOk = (): void => {
    form.validateFields().then((values: T) => {
      onSave(values);
      form.resetFields();
      onClose();
    });
  };

  return (
    <Modal
      title="Adicionar Novo Item"
      open={open}
      onOk={handleOk}
      onCancel={onClose}
      okText="Salvar"
      cancelText="Cancelar"
    >
      <Form form={form} initialValues={initialValues} layout="vertical">
        {fields.map((field) => (
          <Form.Item
            key={field.name}
            name={field.name}
            label={field.label}
            rules={[{ required: true, message: `Insira o ${field.label.toLowerCase()}!` }]}
          >
            {field.type === 'number' ? <Input type="number" /> : <Input />}
          </Form.Item>
        ))}
      </Form>
    </Modal>
  );
}