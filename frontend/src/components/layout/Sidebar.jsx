import { NavLink } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

import '../../styles/sidebar.css';

function Sidebar() {
  return (
    <aside className='sidebar'>
      <div className='sidebar-logo'>
        <span>W</span>
      </div>

      <nav className='sidebar-navigation'>
        <NavLink to='/wallify-feed' className='sidebar-link'>
          <span>Wallify Feed</span>

          <ChevronRight size={24} />
        </NavLink>

        <NavLink to='/my-wallifies' className='sidebar-link'>
          <span>My Wallifies</span>

          <ChevronRight size={24} />
        </NavLink>

        <NavLink to='/wallify-users' className='sidebar-link'>
          <span>Wallify Users</span>

          <ChevronRight size={24} />
        </NavLink>

        <NavLink to='/need-help' className='sidebar-link'>
          <span>Need Help?</span>

          <ChevronRight size={24} />
        </NavLink>
      </nav>

      <section className='sidebar-description'>
        <p>
          <strong>No filters. No pressure. Just your thoughts.</strong> Confess
          your secrets, vent your frustrations, celebrate your wins, or simply
          say what's been weighing on your mind. <strong>Wallify</strong> is
          your anonymous space to express yourself, connect through shared
          experiences, and leave feeling a little lighter.
        </p>
      </section>
    </aside>
  );
}

export default Sidebar;
