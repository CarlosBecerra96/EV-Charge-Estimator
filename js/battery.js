/**
 * Calcula la energía necesaria y el tiempo estimado de carga.
 * @param {number} current - Porcentaje actual de batería
 * @param {number} target - Porcentaje objetivo
 * @param {number} chargerPower - Potencia del cargador en kW
 * @param {number} batteryCapacity - Capacidad total de la batería en kWh
 */
export function calculateChargeTime(current, target, chargerPower, batteryCapacity) {
  const energyNeeded = ((target - current) / 100) * batteryCapacity;
  const timeHours = energyNeeded / chargerPower;
  return { energyNeeded, timeHours };
}

/**
 * Calcula la hora estimada de fin de carga.
 * @param {string} startTime - Hora de inicio en formato "HH:MM"
 * @param {number} timeHours - Duración en horas (puede ser decimal)
 * @returns {object} Hora de fin en formato "HH:MM" y si es al día siguiente
 */
export function calculateEndTime(startTime, timeHours) {
  const [hours, minutes] = startTime.split(':').map(Number);

  // Convierte todo a minutos para operar fácilmente
  const startMinutes = hours * 60 + minutes;
  const durationMinutes = Math.round(timeHours * 60);
  const endMinutes = startMinutes + durationMinutes;

  // Calcula si la carga termina al día siguiente
  const nextDay = endMinutes >= 1440; // 1440 = 24h * 60min
  const endTotalMinutes = endMinutes % 1440;

  const endHour = Math.floor(endTotalMinutes / 60).toString().padStart(2, '0');
  const endMin  = (endTotalMinutes % 60).toString().padStart(2, '0');

  return {
    time: `${endHour}:${endMin}`,
    nextDay
  };
}