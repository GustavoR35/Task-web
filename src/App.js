import './App.css'
import { useState } from "react";
import { useEffect } from 'react';

import axios from 'axios';

var arr = new Array();

function App() {

  const [task, SetTask] = useState([])

  const fecthData = async () => {
    await axios("http://localhost:4003/findAluno", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        console.log("Sucesso em fetch categoria!", response.data);
        SetTask(response.data);
      })
      .catch((error) => {
        console.log("Erro em fetch categoria!", error);
      });
  };

  useEffect(() => {
    fecthData();
  }, [])


  const fecthAdd = async (data) => {
    await axios("http://localhost:4003/createAluno", {
      method: "POST",
      data: data,
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        console.log("Sucesso em fetch categoria!", response.data);
        fecthData();
      })
      .catch((error) => {
        console.log("Erro em fetch categoria!", error);
      });
  };

  const fecthDel = async (data) => {
    await axios("http://localhost:4003/deleteAluno", {
      method: "DELETE",
      data: data,
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        console.log("Sucesso em fetch categoria!", response.data);
        fecthData();
      })
      .catch((error) => {
        console.log("Erro em fetch categoria!", error);
      });
  };

  const fecthUpdate = async (data) => {
    await axios("http://localhost:4003/updateAluno", {
      method: "POST",
      data: data,
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        console.log("Sucesso em fetch categoria!", response.data);
        fecthData();
      })
      .catch((error) => {
        console.log("Erro em fetch categoria!", error);
      });
  }
  return (

    <div className='App'>
      <div>
        <label htmlFor="name">Tarefa</label>
        <br />
        <input type="text" id="name" />
      </div>

      <div>
        <input type="button" id="btn" value={"Adicionar"} onClick={() => {

          var nameValue = document.querySelector("#name").value

          fecthAdd({ nome: nameValue })

        }} />
      </div>

      <hr />

      <ul>
        {task.length > 0 && task.map((t) => {
          return (
            <li key={t.id}>
              <p>
                {t.nome}
              </p>
              -
           
              <button className='deletar' onClick={() => {
                fecthDel({
                  id: t.id
                })

              }}>
                deletar
              </button>

              <div className='btn'>

                <button onClick={() =>{

                var nameValue = document.querySelector("#name").value

                  fecthUpdate({ 
                    id: t.id,
                    nome: nameValue 
                  })

                 } }>alterar</button>
                
              </div>

            </li>

          )
        }
        )}
      </ul>
    </div>
  )
}

export default App
