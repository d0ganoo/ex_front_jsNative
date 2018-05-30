class Store{
	getProfils(url = "https://demo0050088.mockable.io/simple/profils"){
		return fetch(url).then(profils => profils.json(), error => console.error("Failed to load profils", error));
	}
}

export default Store;