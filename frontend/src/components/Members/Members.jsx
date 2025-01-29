import { useState } from 'react'
import { useEffect } from 'react'
import './Members.css'
import AddButton from '../AddButton/AddButton'
import Menu from '../Menu/Menu'

export default function Members() {
	const [members, setMembers] = useState([])

	useEffect(() => {
		getData().then((data) => {
			setMembers(data.members)
		})
	}, [])

	async function getData() {
		const endpoint = `http://${import.meta.env.VITE_ENDPOINT}:8000/get-members/`
		const response = await fetch(endpoint)
		const json = await response.json()
		return json
	}

	if (members.length == 0) {
		return <div className='d-flex justify-content-center align-items-center flex-column mt-5'>
			<h3>Para iniciar um grupo, cadastre os membros no link abaixo</h3>
			<a href='/novos-membros' className='btn btn-success'>Cadastrar membros</a>
		</div>
	}else{

	return <>
		<Menu />
		<main>
			<h1 className="p-3 h1">Membros</h1>
			<table className="table table-dark table-hover">
			<thead>
				<tr>
				<th scope="col">Número</th>
				<th scope="col">Nome</th>
				<th scope="col">Função</th>
				<th scope="col">Contato</th>
				<th scope="col">Ações</th>
				</tr>
			</thead>
			<tbody>
				{members.map((member) => (
					<tr key={member.id}>
						<th scope="row">{member.number}</th>
						<td>{member.name}</td>
						<td>{member.role}</td>
						<td>{member.contact}</td>
						<td>{member.stocks}</td>
					</tr>
				))}
			</tbody>
			</table>
		</main>
		<AddButton/>
	</>
	}
}