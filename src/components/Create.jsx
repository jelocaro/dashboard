import axios from "axios";
import Swal from 'sweetalert2'
import React, { useEffect, useState } from "react";

function Create({ title }) {

  const [showModal, setShowModal] = React.useState(false);

  const [APIData, setAPIData] = useState([]);
  useEffect(() => {
    axios.get('http://pruebasclaro.movilbox.net:81/desarrollo/test_mbox/public/api/profiles')
      .then(response => {
        setAPIData(response.data.profiles)
      });
  }, [])

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [perfil, setPerfil] = useState(1);

  const postData = async (e) => {
    e.preventDefault();
    let idPerfil = 1;
    switch (perfil) {
      case "practicante":
        idPerfil = 1
        break;
      case "Desarrollador":
        idPerfil = 2
        break;
      case "Vendedor":
        idPerfil = 3
        break;
      case "Administrador":
        idPerfil = 4
        break;
      default:
        break;
    }
    console.log(idPerfil);
    try {
      const config = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      };

      const body = JSON.stringify({
        name: nombre,
        email: email,
        profile: idPerfil
      });
      const res = await axios.post('http://pruebasclaro.movilbox.net:81/desarrollo/test_mbox/public/api/1214743938/users', body, config);

      if (res.status === 201) {
        Swal.fire({
          title: '👍🏽 Muy Bien!',
          text: 'El Usuario ha sido creado satisfactoriamente!'
        });
        setShowModal(false);
        window.location.reload();
      } else {
        Swal.fire(
          'Error!',
          'El Usuario Ya existe!',
          'error'
        );
        console.log(res.status);
      }

    } catch (err) {
      Swal.fire(
        '🙁 Ups!',
        'El usuario no puede ser creado.',
        'error'
      );
    }
  }

  return (
    <>

      <button type="button" className="text-white border focus:outline-none bg-main-default font-semibold w-full rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 flex items-center gap-2" onClick={() => setShowModal(true)}>
        {title}
      </button>

      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    {title} Usuario
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <form>
                    <div className="-space-y-px rounded-md shadow-sm">
                      <div>
                        <label className="sr-only">
                          Nombre
                        </label>
                        <input
                          id="nombre"
                          name="nombre"
                          type="nombre"
                          required onChange={e => setNombre(e.target.value)}
                          className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          placeholder="Nombre"
                        />
                      </div>
                      <div>
                        <label className="sr-only">
                          Correo Electrónico
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required onChange={e => setEmail(e.target.value)}
                          className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          placeholder="Correo Electrónico"
                        />
                      </div>
                    </div>
                    <div className="mt-2">
                      <label className="mt-2">Perfil</label>
                      <select
                        id="profile"
                        name="profile" onChange={e => setPerfil(e.target.value)}
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      >
                        {
                          APIData.map(element => {
                            return (
                              <option className="profiles" key={element.id}>{element.name}</option>
                            )
                          })
                        }
                      </select>
                    </div>
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">

                      <button
                        className="bg-main-default text-white active:bg-emerald-600 font-semibold text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="submit"
                        onClick={postData}
                      >
                        Agregar
                      </button>
                      <button
                        className="bg-white text-main-default active:bg-green-600 border border-main-default font-semibold text-sm px-6 py-3 rounded hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Cancelar
                      </button>
                    </div>
                  </form>
                </div>
                {/*footer*/}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

export default Create