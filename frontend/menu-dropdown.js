const details = document.querySelector('details');
const summary = document.querySelector('summary');
const options = details.querySelectorAll('li');

let typeSelected = "";

options.forEach( (op) => {
    op.addEventListener("click", () => {
        summary.textContent = op.textContent;
        details.dataset.value = op.dataset.value;
        details.removeAttribute("open");
    })
})