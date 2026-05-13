import { calcEnergyAdded, calcChargeTime } from './battery.js';
import { initChargerOptions } from './charger.js';

const currentBatt = document.getElementById('currentBatt');
const targetBatt = document.getElementById('targetBatt');
const battFill = document.getElementById('battFill');
const battPctLabel = document.getElementById('battPctLabel');
const targetLabel = document.getElementById('targetLabel');
const resultHours = document.getElementById('resultHours');
const resultMins = document.getElementById('resultMins');
const resultSub = document.getElementById('resultSub');
const kwAdded = document.getElementById('kwAdded');
const miAdded = document.getElementById('miAdded');
const costEst = document.getElementById('costEst');

const batteryCapacity = 82; // kWh
const rangeMiles = 250;
let chargerPower = 11; // valor inicial

function updateCalculator() {
  const currentPct = parseInt(currentBatt.value);
  const targetPct = parseInt(targetBatt.value);

  battFill.style.width = `${currentPct}%`;
  battPctLabel.textContent = `${currentPct}%`;
  targetLabel.textContent = `${targetPct}%`;

  const energyAdded = calcEnergyAdded(batteryCapacity, currentPct, targetPct);
  const { h, m } = calcChargeTime(energyAdded, chargerPower);

  resultHours.textContent = h;
  resultMins.textContent = m.toString().padStart(2, '0');
  resultSub.textContent = `charging ${currentPct}% → ${targetPct}% · adding ${energyAdded.toFixed(1)} kWh`;

  kwAdded.textContent = `${energyAdded.toFixed(1)} kWh`;
  miAdded.textContent = `+${Math.round(rangeMiles * (targetPct - currentPct) / 100)} mi`;
  costEst.textContent = `~$${(energyAdded * 0.16).toFixed(2)}`;
}

// Eventos sliders
currentBatt.addEventListener('input', updateCalculator);
targetBatt.addEventListener('input', updateCalculator);

// Eventos cargadores
initChargerOptions(newKw => {
  chargerPower = newKw;
  updateCalculator();
});

// Inicializar
updateCalculator();
