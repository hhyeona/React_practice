import React from 'react'

export default function List({id, title, completed, todoData, setTodoData, provided, snapshot}) {
  const handleCompletChange = (id) => {
    let newTodoData = todoData.map((data) => {
      if (data.id === id) {
        data.completed = !data.completed;
      }
      return data;
    })
    // this.setState({ todoData: newTodoData});
    setTodoData(newTodoData);
  }

  
  const handleClick = (id) => {
    // x 를 누르면 지워지는 거라서 나머지 (지워지지 않은 부분들이 )가 콘솔창에 보이게 됨.
    let newTodoData = todoData.filter(data => data.id !== id)
    // console.log("newTodoData", newTodoData)
    // this.setState( {todoData: newTodoData});
    setTodoData(newTodoData)
    
  };
  
  return (
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
          </div>
         </div>
  )
}
