import { Link } from 'react-router-dom';
import { LogOut, ChevronRight } from 'lucide-react';

import useAuth from '../../hooks/useAuth';
import { logout } from '../../services/authService';

import '../../styles/right-sidebar.css';

function RightSidebar() {
  const { user, setUser } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();

      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <aside className='right-sidebar'>
      <header className='right-sidebar-header'>
        <Link to='/view-profile' className='profile-link'>
          <span className='profile-username'>
            {user?.username || 'Username'}
          </span>

          <div className='profile-avatar'>
            <span>{user?.username?.charAt(0).toUpperCase() || 'W'}</span>
          </div>
        </Link>
      </header>

      <section className='bento-container'>
        <div className='bento-box'>
          <span>Bento Art Here</span>
        </div>

        <div className='bento-box'>
          <span>Bento Art Here</span>
        </div>
      </section>

      <button type='button' className='logout-button' onClick={handleLogout}>
        <span>Logout</span>

        <ChevronRight size={22} />
      </button>
    </aside>
  );
}

export default RightSidebar;
