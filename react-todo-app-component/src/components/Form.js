import React from 'react'

export default function Form({ handleSubmit, value, setValue }) {

  const handleChange = (e) => {
    // console.log('e', e.target.value);  : 입력한 value 값이 나옴.
    // this.setState({value: e.target.value});
    setValue(e.target.value)
  };

  

  return (
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
  )
}
