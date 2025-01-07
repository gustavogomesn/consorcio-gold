import './App.css'
import Members from './components/Members/Members'
import Loans from './components/Loans/Loans'
import NewMembers from './components/NewMembers/NewMembers';
import { BrowserRouter, Routes, Route } from "react-router";
import Charts from './components/Charts/Charts';
import Meetings from './components/Meetings/Meetings';


function App() {

	return (
		<Routes>
			<Route path="/" element={<Members />} />
			<Route path="reunioes" element={<Meetings />} />
			<Route path="membros" element={<Members />} />
			<Route path="novos-membros" element={<NewMembers />} />
			<Route path="emprestimos" element={<Loans />} />
			<Route path="graficos" element={<Charts />} />
		</Routes>
	)
}

export default App
