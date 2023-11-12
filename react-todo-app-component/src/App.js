// react functional component 로  hooks 사용해서 최적화 하기.
import React, {useState} from "react";
import "./App.css";
import List from "./components/List";
import Form from "./components/Form"

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

  // 필요한 컴포넌트 함수에 props 로 넘겨줌.
const [todoData, setTodoData] = useState([]);
const [value, setValue] = useState("");

// 다른 변수도 있어서 props 로 넘겨줌.
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
      /* tailwind 적용하기 */
      // container : 아이템 가운데 정렬 및 배경 색
      <div className="flex items-center justify-center w-screen h-screen bg-blue-100" >
        {/* todoBlock: 내부 패딩, 마진, 배경하얀색, 라운드, 섀도우, 반응형 */}
        <div className="w-full p-6 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg">
          {/* title: 타이틀과 deleteall 사이 간격, bottom-margin  */}
        <div className="flex justify-between mb-3">
          <h1>할 일 목록</h1>
        </div>
        <List todoData={todoData} setTodoData={setTodoData}/>
      <Form handleSubmit={handleSubmit} value={value} setValue={setValue}></Form>
      </div>
      </div>
    )
}

