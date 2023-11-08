// react functional component 로  hooks 사용해서 최적화 하기.
import React, {useState} from "react";
import "./App.css";
import List from "./components/List";

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


    return(
      <div className="container">
        <div className="todoBlock">
        <div className="title">
          <h1>할 일 목록</h1>
        </div>
        
        <List todoData={todoData} setTodoData={setTodoData}/>
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

