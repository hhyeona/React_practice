// es7 extensions 설치 -> rfc : 함수형 컴포넌트 틀 생성 바로 가능.
import React from 'react'

export default function List({todoData, setTodoData}) {
    
  const btnStyle = {
    color: "#fff",
    border: "none",
    padding: "5px 9px",
    borderRadius: "50%",
    cursor: "pointer",
    float: "right",
  };
 
  const getStyle = (completed) => {
    return{
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration:  completed ? "line-through" : "none",
    }
  };

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
    <div>
        {todoData.map((data) => (
        <div style={getStyle(data.completed)} key={data.id} >  
        {/* key 속성에 unique 한 값 넣어주기. because of 리액트 돔에서 key 값으로 변경된 사항을 파악하고 그 부분만 실제 돔에 적용할 수 있기 때문. 
        따라서 unique 한 값이 없다면 (data, index) 에 index 를 넣어줌. but,index와 내용이 고정값이 아니라 그저 index가 0부터 시작되는거라 비추천.   */}
         <input 
         type="checkbox" 
         onChange={() => handleCompletChange(data.id)}
         defaultChecked={false} />
          {data.title}
          {/* 클릭 이벤트 발생 시 함수 호출하기 */}
         <button style={btnStyle} onClick={()=> handleClick(data.id)}>x</button>
         </div>

      ) )}
      </div>
  )
}

