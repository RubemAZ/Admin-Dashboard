import { Layout } from 'antd'
import './App.css'
import DashboardLayout from './components/DashboardLayout'

interface AppProps {
    children: React.ReactNode
}

export default function App({ children }: AppProps) {
    return (
        <Layout>
            <DashboardLayout>{children}</DashboardLayout>
        </Layout>
    )
}