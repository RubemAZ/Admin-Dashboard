import { Layout, Menu, Button } from 'antd'
import { UserOutlined, ShopOutlined, ProductOutlined, BulbOutlined, BulbFilled } from '@ant-design/icons'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { MenuProps } from 'antd'
import '../App.css'

const { Header, Sider, Content } = Layout

type MenuItem = Required<MenuProps>['items'][number]

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
} as MenuItem)

type Theme = 'light' | 'dark'

interface DashboardLayoutProps {
    children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const [collapsed, setCollapsed] = useState(false)
    const [theme, setTheme] = useState<Theme>('light')

    const toggleTheme = (): void => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }

    return (
        <Layout>
            <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
                <div className="logo" />
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
                <div className="sider-actions">
                    <Button
                        icon={theme === 'dark' ? <BulbFilled /> : <BulbOutlined />}
                        onClick={toggleTheme}
                        className="theme-button"
                        aria-label={theme === 'dark' ? 'Mudar para modo claro' : 'Mudar para modo escuro'}
                    >
                        {collapsed ? '' : theme === 'dark' ? 'Modo Escuro' : 'Modo Claro'}
                    </Button>
                </div>
            </Sider>
            <Layout className={theme}>
                <Header>
                    <div className="header-title">
                        Dashboard Admin
                    </div>
                </Header>
                <Content className="content">
                    {children}
                </Content>
            </Layout>
        </Layout>
    )
}