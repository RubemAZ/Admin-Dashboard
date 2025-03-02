import { Button } from 'antd'
import { Link } from 'react-router-dom'

const SPACING = 24
const BUTTON_SPACING = 8

const links = [
  { to: '/users', label: 'Gerenciar Usuários' },
  { to: '/services', label: 'Gerenciar Serviços' },
  { to: '/products', label: 'Gerenciar Produtos' }
]

export default function Home() {
  return (
    <div style={{ padding: SPACING }}>
      <h1>Bem-vindo ao Dashboard Admin</h1>
      <p>Gerencie usuários, serviços e produtos de forma eficiente.</p>
      <div style={{ marginTop: SPACING / 2 }}>
        {links.map((link, index) => (
          <Button
            key={link.to}
            type="primary"
            style={{ marginLeft: index > 0 ? BUTTON_SPACING : 0 }}
          >
            <Link to={link.to}>{link.label}</Link>
          </Button>
        ))}
      </div>
    </div>
  )
}