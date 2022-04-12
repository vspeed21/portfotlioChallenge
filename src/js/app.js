const li = document.querySelectorAll('#li');
const bloques = document.querySelectorAll('#bloque');

//contadores

li.forEach( (tab, index) => {
  tab.addEventListener('click', () => {
    bloques.forEach((bloque) => {
      bloque.classList.remove('active');
    });
    li.forEach( (tab) => {
      tab.classList.remove('active');
    });
    bloques[index].classList.add('active')
    li[index].classList.add('active');
    
  })
});
contador();

function contador() {
  const contadores = document.querySelector('#contador');
  const divs = document.querySelectorAll('#proyecto-css');
  let cantidad = divs.length;
  
  contadores.textContent = `(${cantidad})`;
}