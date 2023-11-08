// react functional component 로  hooks 사용해서 최적화 하기.
import React, {useState} from "react";
import "./App.css";

// export default class App extends Component{
export default function App() {
  // state = {
  //   todoData: [
  //     {
  //       id: "1",
  //       title: "공부하기",
  //       completed: false,
  //     },
  //     {
  //       id: "2",
  //       title:"청소하기",
  //       completed: false,
  //     }
  //   ],
  //   // 입력으로 인한 이벤트 발생 시 그 값(value)을 state 에 저장해야 함.  value={this.state.value} 값.
  //   value: "",
  // };

const [todoData, setTodoData] = useState([]);
const [value, setValue] = useState("");


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


  const handleClick = (id) => {
    // x 를 누르면 지워지는 거라서 나머지 (지워지지 않은 부분들이 )가 콘솔창에 보이게 됨.
    let newTodoData = todoData.filter(data => data.id !== id)
    // console.log("newTodoData", newTodoData)
    // this.setState( {todoData: newTodoData});
    setTodoData(newTodoData)
    
  };

  const handleChange = (e) => {
    // console.log('e', e.target.value);  : 입력한 value 값이 나옴.
    // this.setState({value: e.target.value});
    setValue(e.target.value)
  };

  const handleSubmit = (e) => {
    // form 안에 input 을 전송할 때 페이지 리로드 되는 걸 막아줌.
    e.preventDefault();

    // 새로운 할 일 데이터 
    let newTodo = {
      // id 는 unique 한 값으로 주기 위해 현재 시간.
      id: Date.now(),
      title: value,
      completed: false
    };

    // 원래 있던 할 일에 새로운 할 일 추가해주기. (전개연산자) / 그 후, 입력 창에 value 빈 값으로 세팅
    // this.setState({todoData: [...todoData, newTodo], value: ""});
    setTodoData(prev => [...prev, newTodo]);
    setValue("");
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

    return(
      <div className="container">
        <div className="todoBlock">
        <div className="title">
          <h1>할 일 목록</h1>
        </div>
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

        <form style={{ display: "flex"}} onSubmit={handleSubmit}>
          <input 
          type="text" 
          name="value" 
          style={{flex:'10', padding: '5px'}} 
          placeholder="해야 할 일을 입력하세요."
          value={value}
          onChange={handleChange}/>
          {/* 입력버튼 클릭 시  목록에 추가하고 && 입력란에 있던 글씨 지워야 함. 위에 onSubmit*/}
          <input 
          type="submit" 
          value="입력" 
          className="btn" 
          style={{flex: '1'}} />
        </form>
      </div>
      </div>
    )
}

