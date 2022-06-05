import { useState } from 'react'
import './App.css'
import { v4 as uuidv4 } from 'uuid'
import ListComponent from './components/ListComponent'
import AlertComponent from './components/AlertComponent'

function App() {
  const [name, setName] = useState('')
  const [list, setList] = useState([])
  const [alert, setAlert] = useState({show: false, msg: '' ,type: ''})
  const [edit, setEdit] = useState(false)
  const [editId, setEditId] = useState(null)
  


  const submitData = (e) => {
    e.preventDefault()
    if(!name){
      setAlert({show: true, msg: 'กรุณาป้อนข้อมูล', type: 'error'})
    } else if(edit && name){
      const result = list.map((elmentList)=>{
        if(elmentList.id === editId){
          return {...elmentList,title: name}
        }
        return elmentList
      })
      setList(result)
      setName('')
      setEdit(false)
      setEditId(null)
      setAlert({show: true, msg: 'แก้ไขข้อมูลสำเร็จ', type: 'success'})
      
    } else {
      const newItem = {
        id: uuidv4(),
        title: name
      }
      setList([...list,newItem])
      setName('')
      setAlert({show: true, msg: 'บันทึกข้อมูลสำเร็จ', type: 'success'})
    }
    
  }

  const removeItem = (idRemove) => {
    const afterRemove = list.filter((listElement)=>listElement.id !== idRemove)
    setList(afterRemove)
    setAlert({show: true, msg: 'ลบข้อมูลสำเร็จ!!', type: 'error'})
  }

  const editItem = (idEdit) => {
    setEdit(true)
    setEditId(idEdit)
    const searchItem = list.find((listElement)=>listElement.id === idEdit)
    setName(searchItem.title)
  }

  const cancelEdit = () => {
    setName('')
    setEdit(false)
  }

  return (
    <section className='container'>

      <h1>Todo List App</h1>
      {alert.show && <AlertComponent list={list} setAlert={setAlert} msg={alert.msg} type={alert.type}/>} {/*{...alert} */}
      <form className='form-group' onSubmit={submitData}>
        <div className='form-control'>
          <input className='text-input' type="text" onChange={(e)=>setName(e.target.value)} value={name}/>
          <div className='submit-btn-group'>
            <button className={`submit-btn ${edit}`} type='submit'>
              {edit ? 'แก้ไข' : 'บันทึก'}
            </button>
            {edit && <button className={`submit-btn ${edit} cancel`} onClick={cancelEdit}>ยกเลิก</button>}
          </div>
        </div>
      </form>

      <section className='list-container'>
        {list.map((data)=>{
          return <ListComponent editItem={editItem} removeItem={removeItem} key={data.id} id={data.id} title={data.title}/> //{...data}
        })}
      </section>

    </section>
  )
}

export default App
