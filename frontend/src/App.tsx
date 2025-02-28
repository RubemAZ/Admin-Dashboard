import { Layout } from 'antd';
import DashboardLayout from './components/DashboardLayout';

const { Content } = Layout;

interface AppProps {
  children: React.ReactNode;
}

export default function App({ children }: AppProps) {
  return (
    <Layout>
      <DashboardLayout>
        <Content>{children}</Content>
      </DashboardLayout>
    </Layout>
  );
}