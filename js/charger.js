// Carga los cargadores desde el JSON y llena el <select>
export async function loadChargers() {
    const select = document.getElementById('charger');

try {
    const response = await fetch('./data/chargers.json');

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }

    const chargers = await response.json();

    // Limpia el placeholder inicial
    select.innerHTML = '';

    // Opción deshabilitada por defecto
    const defaultOpt = document.createElement('option');
    defaultOpt.value = '';
    defaultOpt.textContent = 'Selecciona un cargador';
    defaultOpt.disabled = true;
    defaultOpt.selected = true;
    select.appendChild(defaultOpt);

    // Agrega cada cargador del JSON como opción
    chargers.forEach(c => {
        const option = document.createElement('option');
        option.value = c.power;
        option.textContent = `${c.type} — ${c.power} kW (${c.description})`;
        select.appendChild(option);
    });

} 
catch (error) {
    Toastify({
        text: '⚠️ No se pudieron cargar los tipos de cargador',
        duration: 4000,
        gravity: 'top',
        position: 'right',
        style: { background: '#c0392b' }
    }).showToast();
  }
}