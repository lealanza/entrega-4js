const url = 'https://pokeapi.co/api/v2/pokemon/'
const input = document.getElementById('input')
const btnAdd = document.getElementById('btn-add-poke')
const div = document.getElementById('div-container')
const showError = (id) =>{
    div.innerHTML =
            `<p styles="display: flex; justify-content: center; aling-items: center;" class="error">
            <img width="50px" src="./img/alerta.png">
            Lo sentimos, el Pokemon con el ID ${id} que estás buscando no esta en la lista, proba con otro!!!
        </p>
        `
}
const traerPoke = async () => {
    const idInput = input.value;
    const response = await fetch(url);
    const data1 = await response.json();
    const dataLength = data1.count
    const id = idInput.replace(/^(0+)/g, '');
    if (id === "" || id === "0") {
        return div.innerHTML = `<p styles="display: flex; justify-content: center; aling-items: center;" class="error">
        <img width="50px" src="./img/alerta.png">
    Ud no ingreso ningun numero o ingreso 0, por favor vuelva a ingresar otro numero.
    </p>`}
    if (id < dataLength) {
        const response = await fetch(url + id);
        if(response!==null){
            showError(id);    
        }
        const data = await response.json();
        console.log(data)
        if (id == data.id) {
            const peso = (data.weight) / 10;
            const nombre = data.name.toLocaleUpperCase();
            const types = data.types.map(data => data.type.name).join(" | ").toLocaleUpperCase();
            const html =
                `
            <div styles="display: flex; justify-content: center; aling-items: center;" class="div-value">
                Nombre: ${nombre} || Id: ${id}
                <img width="250px" src="${data.sprites.other.home.front_shiny}" class="img-result">
                Tipo: | ${types} |
                Peso: ${peso}Kg
            </div>
            `
            div.innerHTML = html;
            return data;
        }
    }
    else {
         showError(id);
    }
}
btnAdd.addEventListener('click', traerPoke);