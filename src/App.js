import styled from 'styled-components';
import { useState,useEffect } from 'react';
import { Modal } from './components/modal/modal';
import { GlobalStyle } from './globalStyle';
import Welcome from './components/welcome/welcome';

const Container = styled.div`
  padding:2% 20%;
  display: flex;
  flex-direction:column;
  align-items: center;
  width:100vw;
  background-color:AliceBlue;
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
      float:right;
      padding:5px;
      margin-bottom:5px;
      margin-top:-30px;
      width:100px;
    }
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
  button{
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
`

function App() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(prev => !prev);
  }

  const [list,setList] = useState([]);

  const saveForm = (formObj) =>{
    formObj['index'] = list.length;
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
    localStorage.setItem('List', JSON.stringify(tempList));
    setList(tempList);
  }

  return (
    <>
      <Container>
        <Welcome/>
        <FieldContainer>
        {list.map((obj)=>
          (obj.type === 'bool' ? 
          <>
          <BoolItem><img src="assets/Drag handle.svg"/>
          <div><p>{obj.name}</p>
          <button>Nem</button><button>Igen</button></div>
          <img src="assets/Edit_icon.svg"/></BoolItem>
          </>: 
          <>
          <TextItem><img src="assets/Drag handle.svg"/><div>{obj.name}
          <button>Nem</button><button>Igen</button>
            <br/><input type="textarea"/></div><img src="assets/Edit_icon.svg"/>
            </TextItem>
          </>)
        )
        }
        <Button onClick={openModal}>+ Új mező hozzáadása</Button>
        </FieldContainer>
        <Modal showModal={showModal} 
          setShowModal={setShowModal}
          save = {saveForm}
          deleteForm={deleteForm}></Modal>
        <GlobalStyle/>
      </Container>
    </>
  );
}

export default App;
