// charger.js
export function initChargerOptions(onChange) {
    const chargerOptions = document.querySelectorAll('.ev-charger-opt');

    chargerOptions.forEach(opt => {
        opt.addEventListener('click', () => {
        // Quitar la clase active de todos
        chargerOptions.forEach(o => o.classList.remove('active'));
        // Activar el seleccionado
        opt.classList.add('active');

        // Obtener potencia del cargador
        const kw = parseFloat(opt.querySelector('.ev-charger-kw').textContent);

        // Ejecutar callback para recalcular
        onChange(kw);
        });
    });
}