import './Profile.css'

export default function Profile() {
	return <div className='dropdown d-flex d-row justify-content-center'>
		<a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" data-bs-toggle="dropdown">
			<img src="https://avatars.githubusercontent.com/u/104317489?s=400&u=a4cd9035cdb17e0d8962b771ad0aaba2752aac96&v=4" alt="" width="32" height="32" className="rounded-circle me-2" />
			<strong>Gustavo Gomes</strong>
		</a>
		<ul className="dropdown-menu dropdown-menu-dark text-small shadow">
			<li>
				<a className="dropdown-item" href="#">
					Logout
				</a>
			</li>
		</ul>
	</div>
}