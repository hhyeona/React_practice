import React from 'react'

export default function Form({ handleSubmit, value, setValue }) {

  const handleChange = (e) => {
    // console.log('e', e.target.value);  : 입력한 value 값이 나옴.
    // this.setState({value: e.target.value});
    setValue(e.target.value)
  };

  

  return (
    // tailwind 전, 원래 :  <form style={{ display: "flex"}} onSubmit={handleSubmit}>
    <form onSubmit={handleSubmit} className='flex pt-2'>
    <input 
    type="text" 
    name="value" 
    // 입력칸 / style={{flex:'10', padding: '5px'}}  
   className='w-full px-3 py-2 mr-4 text-gray-500 border rounded shadow'
    placeholder="해야 할 일을 입력하세요."
    value={value}
    onChange={handleChange}/>
    {/* 입력버튼 클릭 시  목록에 추가하고 && 입력란에 있던 글씨 지워야 함. 위에 onSubmit*/}
    <input 
    type="submit" 
    value="입력"
  //  className="btn" 
  // style={{flex: '1'}} 
  className='p-2 text-blue-400 border-2 border-blue-400 rounded hover:text-white hover:bg-blue-200'
   />
  </form>
  )
}
