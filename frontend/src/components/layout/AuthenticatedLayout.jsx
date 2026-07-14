import Sidebar from './Sidebar';
import RightSidebar from './RightSidebar';

import '../../styles/authenticated-layout.css';

function AuthenticatedLayout({ children }) {
  return (
    <main className='authenticated-layout'>
      <Sidebar />

      <div className='authenticated-content'>{children}</div>

      <RightSidebar />
    </main>
  );
}

export default AuthenticatedLayout;
