import React, { useState, useEffect } from "react";

function Calendario() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // 0-based

  // Estado para día seleccionado
  const [selectedDate, setSelectedDate] = useState(null);

  // Estado para tareas: objeto con keys "YYYY-MM-DD" y valores array de tareas
  const [tasksByDate, setTasksByDate] = useState({});

  // Estado para nueva tarea (input)
  const [newTask, setNewTask] = useState("");

  // Calculamos primer día y cantidad de días en mes
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Armo array para días (con espacios vacíos antes del primer día)
  const daysArray = [];
  for (let i = 0; i < firstDay; i++) daysArray.push(null);
  for (let i = 1; i <= daysInMonth; i++) daysArray.push(i);

  // Función para formatear fecha YYYY-MM-DD para usar como key
  function formatDate(day) {
    const mm = String(month + 1).padStart(2, "0");
    const dd = String(day).padStart(2, "0");
    return `${year}-${mm}-${dd}`;
  }

  // Obtener tareas para el día seleccionado
  const selectedDateKey = selectedDate ? formatDate(selectedDate) : null;
  const tasksForSelected = selectedDateKey ? tasksByDate[selectedDateKey] || [] : [];

  // Función para agregar tarea nueva
  function addTask() {
    if (!newTask.trim() || !selectedDateKey) return;

    setTasksByDate((prev) => {
      const prevTasks = prev[selectedDateKey] || [];
      return {
        ...prev,
        [selectedDateKey]: [...prevTasks, newTask.trim()],
      };
    });

    setNewTask("");
  }

  return (
    <div className="p-4 w-4/5">
      <h2 className="text-2xl font-bold mb-4">
        {today.toLocaleString("default", { month: "long" })} {year}
      </h2>

      <div className="grid grid-cols-7 gap-2 mb-4">
        {/* Días de la semana */}
        {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((d) => (
          <div key={d} className="font-semibold text-center">
            {d}
          </div>
        ))}

        {/* Celdas del calendario */}
        {daysArray.map((day, idx) => (
          <div
            key={idx}
            className={`h-12 flex items-center justify-center border rounded cursor-pointer select-none
            ${
              day === selectedDate
                ? "bg-blue-500 text-white"
                : "hover:bg-blue-200"
            }`}
            onClick={() => day && setSelectedDate(day)}
          >
            {day || ""}
          </div>
        ))}
      </div>

      {/* Detalle tareas y agregar nueva */}
      {selectedDate && (
        <div className="p-4 border rounded bg-gray-100">
          <h3 className="text-xl mb-2">
            Tareas para {selectedDate} {today.toLocaleString("default", { month: "long" })} {year}
          </h3>

          <ul className="mb-4 list-disc list-inside">
            {tasksForSelected.length === 0 && <li>No hay tareas.</li>}
            {tasksForSelected.map((task, i) => (
              <li key={i}>{task}</li>
            ))}
          </ul>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Nueva tarea..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="flex-grow p-2 border rounded"
            />
            <button
              onClick={addTask}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Agregar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Calendario;
