import { Link } from 'react-router';
import Profile from '../Profile/Profile'
import './Menu.css'

export default function Menu() {
	return <div className='d-flex flex-column p-3 text-white bg-dark sidebar col-2'>
		<Link to="/" className="nav-link" aria-current="page">
			<span className='fs-4'>GOLD</span>	
		</Link>
		<ul className='nav flex-column mb-auto'>
			<li className='nav-item hover-purple rounded'>
				<Link to="/reunioes" className="nav-link" aria-current="page">Reuniões</Link>
			</li>
			<li className='nav-item hover-purple rounded'>
				<Link to="/emprestimos" className="nav-link" aria-current="page">Empréstimos</Link>		
			</li>
			<li className='nav-item hover-purple rounded'>
				<Link to="/graficos" className="nav-link" aria-current="page">Gráficos</Link>
			</li>
			<li className='nav-item hover-purple rounded'>
				<Link to="/membros" className="nav-link" aria-current="page">Membros</Link>
				
			</li>
		</ul>

		<Profile></Profile>
	</div>

}
