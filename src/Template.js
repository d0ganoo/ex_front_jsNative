class Template{
	displayModal(profil){
		return `<ul>
					<li>Lastname: ${profil.lastname}</li>
					<li>Firstname: ${profil.firstname}</li>
					<li>Company: ${profil.company}</li>
					<li>Email: ${profil.email}</li>
					<li>Phone: ${profil.phone}</li>
					<li>Address: ${profil.address}</li>
				</ul>`
	}

	profilItems(profil){
		return `<tr id="${profil.id}">
					<td>${profil.picture}</td>
					<td>${profil.lastname}</td>
					<td>${profil.firstname}</td>
					<td>${profil.balance}</td>
				</tr>`;
	}

	profilsList(tabProfils){
		return tabProfils.reduce((acc, profil) => acc + this.profilItems(profil), ' ');
	}

	renderProfils(element, tabProfils){
		element.innerHTML = this.profilsList(tabProfils);
		tabProfils.map(profil => {
			document.getElementById(profil.id).addEventListener('click', () => this.renderModal(profil));
		});
	}

	renderModal(profil){
		document.getElementById('modal').classList.remove('hidden');

		const modal_profil = document.getElementById('modal_profil');
		const buttonModal = document.getElementById('modal-button');
		const modal_content = document.getElementById('modal-content');
		const modal = document.getElementById('modal');

		modal_profil.innerHTML = this.displayModal(profil);

		buttonModal.addEventListener("click", () => {
			document.getElementById('modal').classList.add('hidden');
		});
		modal.addEventListener("click", (e) => {
			document.getElementById('modal').classList.add('hidden')
		});
		modal_content.addEventListener("click", (e) => e.stopPropagation());
	}
}

export default Template;