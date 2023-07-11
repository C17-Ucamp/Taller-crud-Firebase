import React, { useEffect, useState } from 'react'
import {db} from "./Firebase/firebase"
import { collection, getDocs,addDoc,doc, deleteDoc, updateDoc } from 'firebase/firestore'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const App = () => {
  // JS

  // useState = almacena el estado inicial 
  // user = contiene el estado actual
  // setUser = el estado que se va a actualizar
  const [users, setUsers] = useState([])
  const [name, setName] = useState("")
  const [mail, setMail] = useState("")
  const [mesa, setMesa] = useState(0)
  const [date, setDate] = useState(null)

  const refCollection = collection(db,'reservaciones')

 // Formulario
const [formUpdate, setUpdateform] = useState(false)
const [item, setItem] = useState(null)

  const getUsers =  async() =>{
    const data = await getDocs(refCollection)
    console.log("Aquí getUsers", data)
    setUsers(data.docs.map((doc)=>({...doc.data(), id: doc.id})))
  }

  const createUser = async() =>{
  await addDoc(refCollection, { nombre: name, correo: mail, mesa: mesa, date: date })
  getUsers()
  }

  const borrarUser = async(id) => {
    const userDoc = doc(refCollection, id)
    console.log("---->",userDoc)
    await deleteDoc(userDoc)
    getUsers(); 
  }

  const formUpdateOpen = (data) => {
    setUpdateform(true)
    setItem(data)
  }

  const handleChange = (e) => {
    setItem({
      ...item,
      [e.target.name]: e.target.value
    })
  }
  
  const upDate = async(id) =>{
     await updateDoc(doc(refCollection, id), item)
     setUpdateform()
     getUsers()
  } 



useEffect(()=>{
 getUsers()
},[])

  return (
    <>
      {/* HTMl */}
      <h1>Reservaciones</h1>

      <Form.Control type="text" placeholder='Nombre' onChange={(e)=>{setName(e.target.value)}}/>
      <Form.Control type="text" placeholder='Correo' onChange={(e)=>{setMail(e.target.value)}}/>
      <Form.Control t type="text" placeholder='# de personas' onChange={(e)=>{setMesa(e.target.value)}}/>
      <Form.Control type="date" onChange={(e)=>{setDate(e.target.value)}}/>
      <Button  variant="primary" onClick={createUser}>Enviar</Button>

      {users.map((item)=>{
        return(
          <div key={item.id}>
            <h1>Nombre: {item.nombre}</h1>
            <h1>Correo: {item.correo}</h1>
            <h1>N° de personas: {item.mesa}</h1>
            <h1>Fecha: {item.date}</h1>
            <Button variant="warning" onClick={()=>borrarUser(item.id)}>Eliminar</Button>
            <Button variant="warning" onClick={()=> formUpdateOpen(item)}>Editar</Button>
          </div>
        )
      })
      }

      { formUpdate && (
          <div>
      <input type="text" placeholder='Nombre' value={item.nombre} name="nombre" onChange={handleChange}/>
      <input type="text" placeholder='Correo' value={item.correo} name="correo" onChange={handleChange}/>
      <input type="text" placeholder='# de personas' value={item.mesa} name="mesa" onChange={handleChange}/>
      <input type="date" value={item.date} name="date" onChange={handleChange}/>
      <button onClick={() => upDate(item.id)}>Enviar</button>
          </div>
        )
      }

    </>
  )
}

export default App
