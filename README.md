# Keto Pareja - App de Dieta Cetogénica

App de gestión de dieta cetogénica para parejas, diseñada para 30 días de seguimiento con perfiles diferenciados.


## 🥑 Características

- **Gestión de Perfiles**: Usuario A (Keto estándar) y Usuario B (Keto sin hojas crudas)
- **Planificador Semanal**: Grid de 7 días con almuerzo y cena
- **Auto-generación de Menú**: Algoritmo inteligente que respeta las restricciones de cada usuario
- **Lista de Compras Inteligente**: Agrupa ingredientes por categoría (Carnicería, Verdulería, Lácteos, Almacén)
- **Tracker de Keto Flu**: Registro de síntomas con recomendaciones personalizadas
- **Lógica de Vegetales Ocultos**: Sustitución automática de ensaladas crudas por vegetales cocidos para Usuario B
- **Persistencia Local**: Datos guardados en LocalStorage

## 🚀 Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build
```

## 📁 Estructura del Proyecto

```
src/
├── App.jsx                 # Componente principal con routing y estado global
├── main.jsx                # Entry point de React
├── index.css               # Estilos globales con Tailwind
├── components/
│   ├── Dashboard.jsx       # Vista principal con resumen del día
│   ├── Navigation.jsx      # Barra de navegación inferior
│   ├── RecipeCard.jsx      # Tarjeta de receta con macros y sustituciones
│   ├── RecipeList.jsx      # Listado filtrable de recetas
│   ├── WeeklyPlanner.jsx   # Planificador semanal drag & drop
│   ├── ShoppingList.jsx    # Lista de compras agrupada
│   └── KetoFluTracker.jsx  # Tracker de síntomas de adaptación
└── data/
    └── recipes.js          # Base de datos de 15 recetas argentinas
```

## 🍽️ Recetas Incluidas

1. Bondiola al Horno con Costra de Hierbas
2. Matambre Tiernizado a la Pizza
3. Hamburguesas Caseras al Plato
4. Pastel de Carne Keto (Sin Papa)
5. Milanesas de Pollo con Cobertura de Queso
6. **Espinacas a la Crema con Parmesano** *(HiddenVeg)*
7. **Puré de Coliflor con Mucha Manteca** *(HiddenVeg)*
8. **Torrejas de Acelga y Queso Fritas** *(HiddenVeg)*
9. Brócoli Gratinado con Cheddar y Panceta
10. Ensalada César Keto con Pollo
11. Ensalada de Rúcula, Jamón Crudo y Burrata
12. Omelette de Tres Quesos
13. Huevos Revueltos Cremosos con Salmón
14. Pan de Lino y Almendras
15. Zucchinis Rellenos de Carne y Queso

## 👤 Perfiles de Usuario

### Usuario A (Hombre)
- Keto estándar
- Todas las recetas disponibles
- Macros: 2000 kcal, 160g grasa, 100g proteína, 20g carbos

### Usuario B (Mujer)
- Keto sin hojas crudas
- Solo recetas con `isHiddenVegFriendly: true`
- Sustitución automática de ensaladas
- Macros: 1600 kcal, 130g grasa, 80g proteína, 20g carbos

## 🛠️ Stack Tecnológico

- **React 18** con Vite
- **React Router** para navegación SPA
- **Tailwind CSS** para estilos (modo oscuro)
- **Lucide React** para iconos
- **LocalStorage** para persistencia

## 📱 Diseño

- Mobile-first
- Modo oscuro con acentos verdes (tema Keto/aguacate)
- Componentes glassmorphism
- Animaciones suaves
- FAB flotante para acceso rápido a lista de compras
