// es7 extensions 설치 -> rfc : 함수형 컴포넌트 틀 생성 바로 가능.
import React from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

export default function List({todoData, setTodoData}) {
  
  /* tailwind 적용하기 */
  // const btnStyle = {
  //   color: "#fff",
  //   border: "none",
  //   padding: "5px 9px",
  //   borderRadius: "50%",
  //   cursor: "pointer",
  //   float: "right",
  // };
 
  // const getStyle = (completed) => {
  //   return{
  //     padding: "10px",
  //     borderBottom: "1px #ccc dotted",
  //     textDecoration:  completed ? "line-through" : "none",
  //   }
  // };

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
  
  const handleEnd = (results) => {
    // result 매개변수에는 source 항목 및 대상 위치와 같은 드래그 이벤트에 대한 정보가 포함됨.
    console.log('result', results)
    // 목적지가 없으면 (이벤트 취소) 이 함수 종료.
    if(!results.destination) return;

    // 리액트 불변성을 지켜주기 위해 새로운 todoData 생성
    const newTodoData = todoData;

    // 1. 변경시키는 아이템을 배열에서 지워줍니다.
    // 2. return 값으로 지워진 아이템을 잡아줌.(저장해둠)
    const [reorderedItem] = newTodoData.splice(results.source.index, 1);

    // 원하는 자리에 reorderedItem 을 insert 해줌.
    newTodoData.splice(results.destination.inex, 0, reorderedItem);
    setTodoData(newTodoData);
  }

  return (
    <div>
      {/* 드래그 앤 드랍 API 사용하기 */}
      <DragDropContext onDragEnd={handleEnd}>
      <Droppable droppableId="todo">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
        {todoData.map((data, index) => (
          <Draggable
          key={data.id}
          draggableId={data.id.toString()}
          index={index}>
        {(provided, snapshot) => (
        <div 
          key={data.id}
          {...provided.dragableProps} 
          ref={provided.innerRef}
          {...provided.dragHandleProps} 
            className={`${snapshot.isDragging ? "bg-gray-400" : "bg-gray-100"} flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 border rounded`}>  
        <div className='item-center'>
         <input 
            type="checkbox" 
            onChange={() => handleCompletChange(data.id)}
            defaultChecked={false} />
         <span className={data.completed ? 'line-through': undefined}> {data.title}</span> 
          </div>
          <div className='items-center'>
         <button className='px-4 py-2 float-right' onClick={()=> handleClick(data.id)}>x</button>
          </div>
         </div>
 
         )}
         </Draggable>
      ) )}
      {provided.placeholder}
      </div>
      )}
        </Droppable>
      </DragDropContext>
      </div>
  );
}

