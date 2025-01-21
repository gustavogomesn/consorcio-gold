import plusIcon from '../../assets/plus.svg'
import './AddButton.css'
import NewLoan from '../NewLoan/NewLoan'
import LoanPayment from '../LoanPayment/LoanPayment'
import NewMeeting from '../NewMeeting/NewMetting'
import NewContrib from '../NewContrib/NewContrib'

export default function AddButton() {
	return <div className='dropdown d-flex d-row justify-content-center'>
		<div className='plus-button'>
			<a href="#" className="d-flex align-items-center text-white text-decoration-none" data-bs-toggle="dropdown">
				<img src={plusIcon}></img>
			</a>
			<ul className="dropdown-menu dropdown-menu-dark text-small shadow">
				<li>
					<NewMeeting/>
				</li>
			</ul>
		</div>
	</div>
}
