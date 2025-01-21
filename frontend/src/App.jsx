import './App.css'
import { BrowserRouter, Routes, Route } from "react-router";
import Members from './components/Members/Members'
import Loans from './components/Loans/Loans'
import NewMembers from './components/NewMembers/NewMembers';
import Charts from './components/Charts/Charts';
import Meetings from './components/Meetings/Meetings';
import SelectedMeeting from './components/SelectedMeeting/SelectedMeeting';

function App() {

	return (
		<Routes>
			<Route path="/" element={<Members />} />
			<Route path="reunioes" element={<Meetings />} />
			<Route path="reuniao/:id" element={<SelectedMeeting />} />
			<Route path="membros" element={<Members />} />
			<Route path="novos-membros" element={<NewMembers />} />
			<Route path="emprestimos" element={<Loans />} />
			<Route path="graficos" element={<Charts />} />
		</Routes>
	)
}

export default App
