import { useState } from 'react'; // Importa 'useState' desde React para gestionar el estado en el componente.
import { ImSpinner9 } from "react-icons/im"; // Importa el ícono de spinner desde 'react-icons'.
import Alert from '../componentes/Alert.jsx'; // Importa el componente 'Alert' para mostrar mensajes de error.
import configAxios from '../config/axios.jsx'; // Importa la configuración de Axios para realizar solicitudes HTTP.

export default function Mostrar() { // Define el componente funcional 'Mostrar'.
  const [productos, setProductos] = useState([]); // Inicializa el estado para almacenar la lista de productos.
  const [spinner, setSpinner] = useState(false); // Inicializa el estado para mostrar u ocultar el spinner.
  const [globalErrorMsg, setGlobalErrorMsg] = useState(''); // Inicializa el estado para almacenar mensajes de error.

  const handleSubmit = async () => { // Define una función asíncrona que maneja el clic del botón para obtener productos.
    setGlobalErrorMsg(''); // Limpia cualquier mensaje de error previo.

    setSpinner(true); // Activa el spinner para mostrar que la solicitud está en curso.
    await new Promise(resolve => setTimeout(resolve, 1000)); // Introduce un retraso de 1 segundo para simular una carga.

    try {
      const { data } = await configAxios('/mostrar'); // Realiza una solicitud GET a '/mostrar' para obtener la lista de productos.
      setProductos(data); // Actualiza el estado con los productos obtenidos.
      if (!data.length) { // Si no hay productos, muestra un mensaje de error.
        setGlobalErrorMsg({
          msg: 'No hay productos para mostrar, se recomienda registrar al menos un producto',
          error: false
        });
      }
    } catch (error) { // Si ocurre un error durante la solicitud.
      setGlobalErrorMsg({
        msg: error.response?.data?.msg || 'Error en la solicitud: contactar al administrador',
        error: false
      });
    }

    setSpinner(false); // Desactiva el spinner después de completar la solicitud.
  };

  return (
    <>
      <a
        href='https://crud-producto-seven.vercel.app/'
        className="ml-5 underline">
        Regresar al Dashboard        
      </a>
      <div className="flex flex-col items-center my-4">
        <button
          type="submit"
          className="bg-indigo-600 w-4/5 md:w-1/3 py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:bg-blue-400"
          onClick={handleSubmit} // Asocia la función 'handleSubmit' al evento de clic del botón.
        >
          {spinner ? (
            <div className="flex items-center justify-center capitalize text-sm">
              <ImSpinner9 className="animate-spin h-5 w-5 text-white mr-2" /> {/* Muestra el spinner mientras se obtienen datos */}
              Obteniendo lista...
            </div>
          ) : (
            'Mostrar Lista' // Muestra el texto 'Mostrar' cuando el spinner está desactivado.
          )}
        </button>

        <div className='mx-2 text-sm md:text-base'>{globalErrorMsg.msg && <Alert props={globalErrorMsg} />}</div> {/* Muestra el mensaje de error si existe */}
      </div>

      <div className="flex justify-center">
        <table className="border-separate border-spacing-1 border border-slate-500 rounded w-full mx-1 my-4 md:w-1/2">
          <caption className="caption-top font-bold">
            Lista de Productos
          </caption>
          <thead>
            <tr className="bg-slate-200">
              <th className="border border-slate-600 rounded">Id Producto</th>
              <th className="border border-slate-600 rounded">Nombre del Producto</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto, index) => (
              <tr
                key={producto._id} // Usa el ID del producto como clave única para cada fila.
                className={`
                  ${index % 2 === 0 ? 'bg-white' : 'bg-slate-200'} text-black
                `} // Alterna el color de fondo basado en el índice de la fila.
              >
                <td>{producto.idproducto}</td> {/* Muestra el ID del producto */}
                <td>{producto.nombre}</td> {/* Muestra el nombre del producto */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};