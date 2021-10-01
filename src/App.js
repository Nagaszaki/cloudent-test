import styled from 'styled-components';
import { useState } from 'react';
import { Modal } from './components/modal/modal';
import { GlobalStyle } from './globalStyle';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Button = styled.button`
  min-width: 100px;
  padding: 16px 32px;
  border-radius: 4px;
  border: none;
  background: #141414;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
`;
function App() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(prev => !prev);
  }

  const [list,setList] = useState([]);

  const saveForm = (formObj) =>{
    let tempList = list;
    tempList.push(formObj);
    setList(tempList);
    setShowModal(false);
  }

  return (
    <>
      <Container>
        {list.map((obj)=> 
          <li>{obj.name}</li>
        )}
        <Button onClick={openModal}>Új mező hozzáadása</Button>
        <Modal showModal={showModal} 
        setShowModal={setShowModal}
        save = {saveForm}></Modal>
        <GlobalStyle/>
      </Container>
    </>
  );
}

export default App;
