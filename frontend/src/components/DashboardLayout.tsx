import { Layout, Menu, Button } from 'antd';
import { UserOutlined, ShopOutlined, ProductOutlined, BulbOutlined, BulbFilled } from '@ant-design/icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { MenuProps } from 'antd';

const { Header, Sider, Content } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const createMenuItem = (
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
): MenuItem => ({
    key,
    icon,
    children,
    label,
} as MenuItem);

const SPACING = 16;
const LOGO_HEIGHT = 32;
const LOGO_BACKGROUND = 'rgba(255, 255, 255, 0.2)';

type Theme = 'light' | 'dark';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const [collapsed, setCollapsed] = useState(false);
    const [theme, setTheme] = useState<Theme>('light');

    const toggleTheme = (): void => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
                <div style={{ height: LOGO_HEIGHT, margin: SPACING, background: LOGO_BACKGROUND }} />
                <Menu
                    theme={theme}
                    defaultSelectedKeys={['1']}
                    mode="inline"
                    items={[
                        createMenuItem(<Link to="/users">Usuários</Link>, '1', <UserOutlined />),
                        createMenuItem(<Link to="/services">Serviços</Link>, '2', <ShopOutlined />),
                        createMenuItem(<Link to="/products">Produtos</Link>, '3', <ProductOutlined />),
                    ]}
                />
                <div style={{ padding: SPACING, textAlign: 'center' }}>
                    <Button
                        icon={theme === 'dark' ? <BulbFilled /> : <BulbOutlined />}
                        onClick={toggleTheme}
                        style={{
                            width: '100%',
                            marginTop: SPACING,
                            background: theme === 'dark' ? '#2f2f2f' : '#ffffff',
                            color: theme === 'dark' ? '#fff' : '#000',
                            border: 'none',
                            transition: 'background 0.3s ease, transform 0.2s ease',
                        }}
                        className={theme === 'dark' ? 'dark' : ''}
                    >
                        {collapsed ? '' : theme === 'dark' ? 'Modo Escuro' : 'Modo Claro'}
                    </Button>
                </div>
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: theme === 'dark' ? '#001529' : '#fff' }}>
                    <div
                        style={{
                            color: theme === 'dark' ? '#fff' : '#000',
                            padding: `${0}px ${SPACING}px`,
                            lineHeight: '64px',
                        }}
                    >
                        Dashboard Admin
                    </div>
                </Header>
                <Content
                    style={{
                        margin: `${SPACING}px`,
                        padding: 24,
                        background: theme === 'dark' ? '#1f1f1f' : '#fff',
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
}