import Store from "./Store";
import Template from "./Template";

class App{
	constructor(store, template){
		this.store = store;
		this.template = template;
		this.sortKey = true;
	}

	displayCounterProfils(nbProfils, nbTotalProfils){
		let str = `<tr>${nbProfils}/ ${nbTotalProfils}</tr>`;
		document.getElementsByTagName('tfoot')[0].innerHTML = str;
	}

	counterProfils(profils){
		return profils.length;
	}

	displayProfils(element, filter, url){
		let profilsFiltered = [];
		this.store.getProfils(url).then(profils => {
			this.tabProfils = profils;
			this.tabFiltered = profils;
			this.template.renderProfils(element, this.tabProfils);
			this.displayCounterProfils(this.counterProfils(this.tabProfils), this.counterProfils(this.tabProfils));
		});

	}


	filter(element, str){
		str = str.value.toUpperCase();
		this.tabProfils = this.tabFiltered;
		let profilsFiltered = this.tabProfils.filter((profil) => profil.lastname.toUpperCase().includes(str) || profil.firstname.toUpperCase().includes(str));
		this.tabProfils = profilsFiltered;
		this.template.renderProfils(element, profilsFiltered);
		this.displayCounterProfils(this.counterProfils(profilsFiltered), this.counterProfils(this.tabFiltered));
	}

	sort(element, str){
		if(this.sortKey === true){
			if (str != "balance"){
				this.tabProfils.sort((a, b) => a[str].localeCompare(b[str]));
			}
			else{
				this.tabProfils.sort((a,b) => a[str] - b[str]);
			}
			this.sortKey = false;
		}
		else{
			if (str != "balance"){
				this.tabProfils.sort((a, b) => b[str].localeCompare(a[str]));
			}
			else{
				this.tabProfils.sort((a,b) => b[str] - a[str]);
			}
			this.sortKey = true;
		}
		this.template.renderProfils(element, this.tabProfils);
	}

	changeUrl(element, url){
		let res = url.search(/^(http:\/\/(www)?.[^\s]{1,128}\.[^\s]{3,4})/);
		if (res === 0){
			fetch(url)
			.then((profils) => {
				return profils.json();
				})
			.catch((e)=> console.error("Url valid but no destination",e))
		 	.then(profils => {
				this.tabProfils = profils;
				this.template.renderProfils(element, this.tabProfils);
			}).catch((e)=> console.error(e));
		}
		else{
			console.log("Bad url");
		}

	}


}

export default App;