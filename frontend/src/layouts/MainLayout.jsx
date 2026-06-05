import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 p-4 lg:p-6">
          <Navbar />
          <main className="mt-6 space-y-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
