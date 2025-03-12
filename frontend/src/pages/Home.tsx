import { Button } from 'antd'
import { Link } from 'react-router-dom'

const links = [
    { to: '/users', label: 'Gerenciar Usuários' },
    { to: '/services', label: 'Gerenciar Serviços' },
    { to: '/products', label: 'Gerenciar Produtos' },
]

export default function Home() {
    return (
        <div className="home-container">
            <h1>Bem-vindo ao Dashboard Admin</h1>
            <p>Gerencie usuários, serviços e produtos de forma eficiente.</p>
            <div className="button-group">
                {links.map((link) => (
                    <Button key={link.to} type="primary">
                        <Link to={link.to}>{link.label}</Link>
                    </Button>
                ))}
            </div>
        </div>
    )
}