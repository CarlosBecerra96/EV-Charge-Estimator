/**
 * Carga los modelos de carro desde el JSON y llena el <select>.
 * También guarda los datos completos para mostrar la descripción visual.
 */
let carsData = [];

export async function loadCars() {
    const select = document.getElementById('carModel');

    try {
        const response = await fetch('./data/cars.json');

        if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
        }

        carsData = await response.json();

        select.innerHTML = '';

        const defaultOpt = document.createElement('option');
        defaultOpt.value = '';
        defaultOpt.textContent = 'Selecciona un modelo';
        defaultOpt.disabled = true;
        defaultOpt.selected = true;
        select.appendChild(defaultOpt);

        carsData.forEach((car, index) => {
        const option = document.createElement('option');
        option.value = car.battery;
        option.dataset.index = index; // referencia para buscar el carro luego
        option.textContent = `${car.brand} ${car.model} — ${car.battery} kWh`;
        select.appendChild(option);
    });

    // Actualiza la tarjeta visual cada vez que cambia la selección
    select.addEventListener('change', updateCarPreview);

    } catch (error) {
        Toastify({
        text: '⚠️ No se pudieron cargar los modelos de carro',
        duration: 4000,
        gravity: 'top',
        position: 'right',
        style: { background: '#c0392b' }
        }).showToast();
    }
}

/**
 * Muestra una tarjeta visual con marca, modelo y capacidad del carro elegido.
 */
function updateCarPreview() {
    const select = document.getElementById('carModel');
    const preview = document.getElementById('carPreview');
    const selectedOption = select.options[select.selectedIndex];
    const index = selectedOption.dataset.index;

    if (index === undefined) {
        preview.hidden = true;
        return;
    }

    const car = carsData[index];
    preview.hidden = false;
    preview.innerHTML = `
        <span class="car-preview__icon">🚗</span>
        <div class="car-preview__info">
        <span class="car-preview__name">${car.brand} ${car.model}</span>
        <span class="car-preview__battery">🔋 ${car.battery} kWh de capacidad</span>
        </div>
    `;
}