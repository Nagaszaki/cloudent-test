import styled from 'styled-components';
import { useState } from 'react';
import { Modal } from './components/modal';
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const Button = styled.button`
  min-width: 100px;
  padding: 16px 32px;
  border-radius: 4px;
  border: none;
  background: #141414;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
`
function App() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(prev => !prev);
  }
  return (
    <>
      <Container>
        <Button onClick={openModal}>I'm a modal</Button>
        <Modal showModal={showModal} 
        setShowModal={setShowModal}></Modal>
      </Container>
    </>
  );
}

export default App;
