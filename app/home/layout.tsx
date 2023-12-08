import { NextAuthProvider } from '../next-authprovider'
import TopBar from '../components/TopBar'

interface Props {
  children: React.ReactNode
}


const DashboardLayout = ({ children } : Props) => {
  return (
    <div className="grid p-4 h-full w-full overflow-hidden">
      <TopBar />
        <NextAuthProvider>
          {children}
        </NextAuthProvider>
     </div>
  )
}


export default DashboardLayout;
