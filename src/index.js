import Store from "./Store";
import App from "./App";
import Template from "./Template";
import './index.css'

const tbody = document.getElementsByTagName('tbody')[0];
const tfoot = document.getElementsByTagName('tfoot')[0];
const sortable = document.getElementsByClassName('sortable');
const filter = document.getElementById('filter');
const url = document.getElementById('url');


const store = new Store();
const template = new Template();
const app = new App(store, template);

url.addEventListener('input', () => app.changeUrl(tbody, url.value));

app.displayProfils(tbody, filter);

filter.addEventListener('input', () => app.filter(tbody,filter));


[...sortable].map(element => element.addEventListener('click', () => app.sort(tbody, element.innerHTML.toLowerCase())));


