import styled from 'styled-components';
import { useState,useEffect } from 'react';
import { Modal } from './components/modal/modal';
import { GlobalStyle } from './globalStyle';
import Welcome from './components/welcome/welcome';
import {Edit} from './components/modal/edit';

const Container = styled.div`
  padding:2% 20%;
  display: flex;
  flex-direction:column;
  align-items: center;
  width:100vw;
  height:100vh;
`;

const Button = styled.button`
  margin: 2% 10%;
  padding: 16px 32px;
  border-radius: 4px;
  border: 1px dashed;
  background: rgba(72, 61, 139,0.1);
  color: rgb(72, 61, 139);
  font-size: 24px;
  cursor: pointer;
`;

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content:center;
  width:110%;
  border:1px solid gray;
  border-radius:5px;
  background-color:white;
  
  ul{
    list-style-type: none;
    width:100%;
    display: flex;
    flex-direction: column;
    align-items:space-around;
    justify-content:center;
    width:100%;
    padding-left:20px;
  }
`;

const BoolItem=styled.div`
  padding:10px;
  display:flex;
  justify-content:space-around;
  align-items:center;
  border-bottom: 1px solid gray;
  div{
    width:80%;
    p{
      margin-top:10px;
    }
    button{
      cursor:pointer;
      border:none;
      border-radius:5px;
      float:right;
      padding:5px;
      margin-bottom:5px;
      margin-top:-30px;
      width:100px;
    }
    .selected{
      background-color:SlateBlue;
      color:white;
    }
  }
  img:nth-child(3){
    cursor:pointer;
  }
`

const TextItem=styled.div`
  display:flex;
  justify-content:space-around;
  align-items:center;
  padding:10px;
  border-bottom:1px solid gray;
  width:100%;
  div{
    width:80%;
    p{
      margin-top:10px;
    }
    .selected{
      background-color:SlateBlue;
      color:white;
    }
    button{
      cursor:pointer;
      border:none;
      border-radius:5px;
      float:right;
      padding:5px;
      margin-bottom:5px;
      width:100px;
    }
    input{
      width:100%;
      height:200px;
    }
  }
  img:nth-child(3){
    cursor:pointer;
  }
`

function App() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(prev => !prev);
  }

  const [list,setList] = useState([]);

  const saveForm = (formObj) =>{
    let tempList = list;
    tempList.push(formObj);
    localStorage.setItem('formList', JSON.stringify(tempList));
    setList(tempList);
    setShowModal(false);
  }

  useEffect(() => {
    let arr = localStorage.getItem('formList');
    if (arr){
      let obj = JSON.parse(arr);
      setList(obj);
    }
  },[]);

  const deleteForm = (index) => {
    let tempList = list;
    tempList.splice(index,1);
    localStorage.setItem('formList', JSON.stringify(tempList));
    setList(tempList);
    setModal(false);
  }

  const [modal,setModal] = useState(false);

  const [currentIndex,setCurrentIndex] = useState(0);


  const toggle = () => {
    setModal(!modal);
  }

  const updateList = (obj,index) => {
    let tempList = list;
    tempList[index] = obj;
    localStorage.setItem("formList", JSON.stringify(tempList));
    setList(tempList);
    window.location.reload();
  }

  const updateSelected = (index,value) =>{
    value = parseInt(value);
    index = parseInt(index);
    let tempList = list;
    tempList[index].basicValue = value;
    localStorage.setItem("formList", JSON.stringify(tempList));
    setList(tempList);
    window.location.reload();
  }


  return (
    <>
      <Container>
        <Welcome/>
        <FieldContainer>
        {list && list.map((obj,index)=>
          (obj.type === 'bool' ? 
          <>
          <BoolItem>
            <img src="assets/Drag handle.svg"/>
            <div>
              <p>{obj.name}</p>
              {obj.basicValue === 2 ? 
              <> <button name={index} class="selected" value={2} onClick={(e)=> updateSelected(e.target.name,e.target.value)}>Nem</button>
              <button onClick={(e)=> updateSelected(e.target.name,e.target.value)} name={index} value={1}>Igen</button> 
              </>: null}

              {obj.basicValue === 1 ?
               <> <button name={index} value={2} onClick={(e)=> updateSelected(e.target.name,e.target.value)}>Nem</button>
               <button onClick={(e)=> updateSelected(e.target.name,e.target.value)} name={index} class="selected" value={1}>Igen</button> 
               </>: null}

              {obj.basicValue === 0 ? <> <button name={index} value={2} onClick={(e)=> updateSelected(e.target.name,e.target.value)}>Nem</button>
              <button onClick={(e)=> updateSelected(e.target.name,e.target.value)} name={index} value={1}>Igen</button> 
              </>: null}
            </div>
            <img src="assets/Edit_icon.svg" alt={index} onClick={(e) => (setCurrentIndex(e.target.alt), setModal(true))}/>
            </BoolItem>
          </>: 
          <>
          <TextItem>
            <img src="assets/Drag handle.svg"/>
            <div>
              <p>{obj.name}</p>
              {obj.basicValue === 2 ? 
              <> <button name={index} class="selected" value={2} onClick={(e)=> updateSelected(e.target.name,e.target.value)}>Nem</button>
              <button onClick={(e)=> updateSelected(e.target.name,e.target.value)} name={index} value={1}>Igen</button> 
              </>: null}

              {obj.basicValue === 1 ?
               <> <button name={index} value={2} onClick={(e)=> updateSelected(e.target.name,e.target.value)}>Nem</button>
               <button onClick={(e)=> updateSelected(e.target.name,e.target.value)} name={index} class="selected" value={1}>Igen</button> 
               </>: null}

              {obj.basicValue === 0 ? <> <button name={index} value={2} onClick={(e)=> updateSelected(e.target.name,e.target.value)}>Nem</button>
              <button onClick={(e)=> updateSelected(e.target.name,e.target.value)} name={index} value={1}>Igen</button> 
              </>: null}
            <br/><input type="textarea"/></div>
            <img src="assets/Edit_icon.svg" alt={index} onClick={(e) => (setCurrentIndex(e.target.alt), setModal(true))}/>
            </TextItem>
          </>)
        )
        }
        <Button onClick={openModal}>+ Új mező hozzáadása</Button>
        </FieldContainer>
        <Modal showModal={showModal} 
          setShowModal={setShowModal}
          save = {saveForm}/>
          <Edit showModal={modal} 
          setShowModal={toggle}
          deleteForm={deleteForm}
          updateList = {updateList}
          index = {currentIndex}/>
        <GlobalStyle/>
      </Container>
    </>
  );
}

export default App;
