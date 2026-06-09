import { calculateChargeTime, calculateEndTime } from './battery.js';
import { loadChargers } from './charger.js';

// Toastify viene del CDN, disponible como variable global

/**
 * Muestra una notificación visual con Toastify.
 * @param {string} message - Texto del mensaje
 * @param {'success'|'error'} type - Tipo de notificación
 */
function showNotification(message, type = 'success') {
  Toastify({
    text: message,
    duration: 3000,
    gravity: 'top',
    position: 'right',
    style: {
      background: type === 'success' ? '#27ae60' : '#c0392b',
      borderRadius: '8px',
      fontFamily: 'inherit'
    }
  }).showToast();
}

/**
 * Formatea horas decimales a texto legible (ej: 1.5 → "1h 30min")
 */
function formatTime(hours) {
    const h = Math.floor(hours);
    const min = Math.round((hours - h) * 60);
        if (h === 0) return `${min} min`;
        if (min === 0) return `${h}h`;
        return `${h}h ${min}min`;
}

document.addEventListener('DOMContentLoaded', () => {
  // Carga los cargadores desde el JSON al iniciar
  loadChargers();

  document.getElementById('calculateBtn').addEventListener('click', () => {
    const current      = parseInt(document.getElementById('current').value);
    const target       = parseInt(document.getElementById('target').value);
    const chargerPower = parseFloat(document.getElementById('charger').value);
    const startTime    = document.getElementById('startTime').value || '22:00';
    const batteryCapacity = 60; // kWh

    // Validaciones
    if (isNaN(current) || isNaN(target) || isNaN(chargerPower)) {
        showNotification('⚠️ Completa todos los campos', 'error');
        return;
    }
    if (current < 0 || current > 100 || target < 0 || target > 100) {
        showNotification('⚠️ Los porcentajes deben estar entre 0 y 100', 'error');
        return;
    }
    if (target <= current) {
        showNotification('⚠️ El objetivo debe ser mayor que la carga actual', 'error');
        return;
    }

    // Cálculos
    const { energyNeeded, timeHours } = calculateChargeTime(
        current, target, chargerPower, batteryCapacity
    );
    const { time: endTime, nextDay } = calculateEndTime(startTime, timeHours);
    const nextDayLabel = nextDay
        ? ' <span class="result__badge">día siguiente</span>'
        : '';

    // Muestra resultados en el DOM
    const resultDiv = document.getElementById('result');
    resultDiv.hidden = false;
    resultDiv.innerHTML = `
        <div class="result__item">
            <span class="result__label">⚡ Energía añadida</span>
            <span class="result__value">${energyNeeded.toFixed(2)} kWh</span>
        </div>
        <div class="result__item">
            <span class="result__label">⏱ Tiempo estimado</span>
            <span class="result__value">${formatTime(timeHours)}</span>
        </div>
        <div class="result__item">
            <span class="result__label">🔋 Nivel de carga</span>
            <span class="result__value">${current}% → ${target}%</span>
        </div>
        <div class="result__item">
            <span class="result__label">🕐 Inicio de carga</span>
            <span class="result__value">${startTime}</span>
        </div>
        <div class="result__item">
            <span class="result__label">✅ Lista a las</span>
            <span class="result__value result__value--accent">${endTime}${nextDayLabel}</span>
        </div>
    `;

    showNotification('✅ Cálculo realizado con éxito', 'success');
  });
});