import logo from '../../../public/ampath-logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { MdLogout } from 'react-icons/md';
import { GiHamburgerMenu } from 'react-icons/gi';
import storage from '../../../app/localStorage';

const HeaderWithLogo = () => {
  const navigate = useNavigate();

  const { user } = storage.loadData();
  const handleLogout = async () => {
    try {
      await fetch('/ws/rest/v1/session', {
        method: 'DELETE',
      }).then(() => {
        localStorage.removeItem('userInformation');
        localStorage.removeItem('authenticated');
        navigate('/login');
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="">
      <header className="bg-white shadow-md p-2 flex justify-between items-center">
        <span className="cursor-pointer ml-3">
          <Link to="/">
            <img src={logo} width={160} alt="AMPATH Logo" />
          </Link>
        </span>
        <button className="text-3xl mr-4 md:hidden">
          <GiHamburgerMenu />
        </button>
        <nav className="hidden md:block md:mr-12">
          <ul className="md:flex items-center gap-10">
            <li className="text-sm">
              Logged in as {' '}
              <span className="uppercase">
                <strong>{user && user.display}</strong>
              </span>
            </li>
            <li className="text-lg flex gap-2 items-center hover:shadow-lg hover:bg-slate-300 p-2 rounded-sm cursor-pointer">
              <MdLogout onClick={handleLogout} />
              Log out
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};
export default HeaderWithLogo;
