# ⚡ EV Charge Estimator

Calculadora interactiva para estimar el tiempo de carga y la energía añadida de un vehículo eléctrico, con estimado de hora de finalización.

---

## 🚀 Demo

🔗 [Ver demo en GitHub Pages](https://CarlosBecerra96.github.io/EV-Charge-Estimator/)

---

## 🎯 ¿Qué hace?

- Selecciona el tipo de cargador desde una lista cargada dinámicamente con **Fetch + JSON**
- Calcula la **energía necesaria** (kWh) y el **tiempo estimado** de carga
- Indica a qué hora **termina la carga** según la hora de inicio que ingreses
- Muestra notificaciones visuales de éxito y error con **Toastify**
- Valida los datos ingresados sin usar `alert`, `prompt` ni `confirm`

---

## 🛠 Tecnologías

| Tecnología | Uso |
|---|---|
| HTML5 | Estructura semántica |
| SASS | Estilos modulares con variables y parciales |
| JavaScript ES6+ | Módulos, Fetch API, manipulación del DOM |
| Toastify.js | Notificaciones visuales (CDN) |

---

## 📂 Estructura del proyecto

```
EV-Charge-Estimator/
│
├── index.html              # Página principal
├── data/
│   └── chargers.json       # Lista de cargadores (Fetch)
├── js/
│   ├── battery.js          # Lógica de cálculo de energía y hora fin
│   ├── charger.js          # Carga del JSON y render del select
│   └── main.js             # Eventos del DOM e integración
└── style/
    ├── _variables.scss     # Colores, tipografía, espaciado
    ├── _reset.scss         # Reset base
    ├── _components.scss    # Estilos de UI
    ├── main.scss           # Archivo principal SASS
    └── main.css            # CSS compilado (GitHub Pages)
```

---

## ▶️ Cómo correrlo localmente

1. Clona el repositorio:
```bash
git clone https://github.com/CarlosBecerra96/EV-Charge-Estimator.git
```

2. Abre la carpeta en VS Code:
```bash
cd EV-Charge-Estimator
code .
```

3. Inicia Live Server desde VS Code (clic derecho en `index.html` → *Open with Live Server*)

> No requiere instalar dependencias npm — Toastify se carga desde CDN.

---

## 💡 Funcionalidades principales

### Carga dinámica de cargadores
Los tipos de cargador se obtienen desde `data/chargers.json` usando `fetch()`, sin hardcodear opciones en el HTML.

### Cálculo de carga
```
Energía (kWh) = ((objetivo - actual) / 100) × capacidad batería
Tiempo (h)    = Energía / Potencia del cargador
```

### Hora de fin estimada
Dado el porcentaje actual, el objetivo y la hora de inicio, el simulador calcula exactamente a qué hora termina la carga, indicando si pasa al día siguiente.

---

## 👤 Autor

**Carlos Becerra**  
[GitHub](https://github.com/CarlosBecerra96)