// es7 extensions 설치 -> rfc : 함수형 컴포넌트 틀 생성 바로 가능.
import React from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import List from './List';

// eslint-disable-next-line react/display-name
const Lists = React.memo(({todoData, setTodoData, handleClick}) => {
 console.log("Lists Comonent")

  
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
    localStorage.setItem('todoData', JSON.stringify(newTodoData))
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
            <List
            key={data.id}
            id={data.id}
            title={data.title}
            completed={data.completed}
            todoData={todoData}
            setTodoData={setTodoData}
            provided={provided}
            snapshot={snapshot}
            handleClick={handleClick}>
              
            </List>
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

);
export default Lists;