import Profile from '../Profile/Profile'
import './Menu.css'

export default function Menu() {
	return <div className='d-flex flex-column p-3 text-white bg-dark sidebar col-2'>
		<a href="/" className='text-center mb-3'>
			<span className='fs-4'>GOLD</span>
		</a>
		<ul className='nav flex-column mb-auto'>
			<li className='nav-item hover-purple rounded'>
				<a href="/reunioes" className="nav-link" aria-current="page">
					Reuniões
				</a>
			</li>
			<li className='nav-item hover-purple rounded'>
				<a href="/emprestimos" className="nav-link" aria-current="page">
					Empréstimos
				</a>
			</li>
			<li className='nav-item hover-purple rounded'>
				<a href="graficos" className="nav-link" aria-current="page">
					Gráficos
				</a>
			</li>
			<li className='nav-item hover-purple rounded'>
				<a href="/membros" className="nav-link" aria-current="page">
					Membros
				</a>
			</li>
		</ul>

		<Profile></Profile>
	</div>

}