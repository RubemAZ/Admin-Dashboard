import { Button } from 'antd'
import { Link } from 'react-router-dom'

const links = [
  { to: '/users', label: 'Gerenciar Usuários' },
  { to: '/services', label: 'Gerenciar Serviços' },
  { to: '/products', label: 'Gerenciar Produtos' },
]

export default function Home() {
  return (
    <div>
      <h1>Bem-vindo ao Dashboard Admin</h1>
      <p>Gerencie usuários, serviços e produtos de forma eficiente.</p>
    </div>
  )
}