import React, { useState } from 'react'

// eslint-disable-next-line react/display-name
const List = React.memo(({id, title, completed, todoData, setTodoData, provided, snapshot, handleClick}) => {
 console.log("List Comonent")

 const [isEditing, setIsEditing] = useState(false);
 const [editedTitle, setEditedTitle] =useState(title);

  const handleCompletChange = (id) => {
    let newTodoData = todoData.map((data) => {
      if (data.id === id) {
        data.completed = !data.completed;
      }
      return data;
    })

    setTodoData(newTodoData);
    localStorage.setItem('todoData', JSON.stringify(newTodoData))

  }

  // title 수정 할 때 state 변경
  const handleEditChange = (e) => {
setEditedTitle(e.target.value)
  }
  // 수정하기 버튼 함수 : 기존 Data id 와 같은 곳에 제목은 새로운 제목으로 할당. 
  // 데이타 리스트 새로운 데이터로 변경 및 수정 종료. - UI 변경됨.
  const handleSubmit=(event)=>{
    event.preventDefault()

    let newTodoData = todoData.map(data => {
      if(data.id === id){
        data.title = editedTitle
      }
      return data;
    })
    setTodoData(newTodoData)
    localStorage.setItem('todoData', JSON.stringify(newTodoData))
    setIsEditing(false)

  }

  if(isEditing) {
    return(
      //  수정 할 때 UI
      <div 

        className="bg-gray-100 flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 border rounded">  
    <div className='item-center'>
      <form onSubmit={handleSubmit}>
     <input 
        // onChange={() => handleCompletChange(id)}
        // defaultChecked={completed} 
        value={editedTitle}
        onChange={handleEditChange}
        className='w-full px-3 py-2 mr-4 text-gray-500 rounded'/>
      </form>
      </div>
      <div className='items-center'>
     <button onClick={handleSubmit} className='px-4 py-2 float-right' type='submit'>save</button>
      </div>
     </div>
    )
  } else{
    return (
      // 수정 안 할 때 UI
      <div 
            key={id}
            {...provided.dragableProps} 
            ref={provided.innerRef}
            {...provided.dragHandleProps} 
              className={`${snapshot.isDragging ? "bg-gray-400" : "bg-gray-100"} flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 border rounded`}>  
          <div className='item-center'>
           <input 
              type="checkbox" 
              onChange={() => handleCompletChange(id)}
              defaultChecked={false} />
           <span className={completed ? 'line-through': undefined}> {title}</span> 
            </div>
            <div className='items-center'>
           <button className='px-4 py-2 float-right' onClick={()=> handleClick(id)}>x</button>
           <button className='px-4 py-2 float-right' onClick={()=> setIsEditing(true)}>edit</button>
            </div>
           </div>
    )
  }
  

 
}
);
export default List;