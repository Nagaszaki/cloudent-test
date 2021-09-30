import React, {useRef,useEffect,useCallback} from 'react';
import styled from 'styled-components';
import {useSpring, animated} from 'react-spring';
import {MdClose} from 'react-icons/md';
import Switch from './switch/switch';
import Form from './form/form';

const Header = styled.div`
  top:0px;
  left:0px;
  padding:5px 10px;
  position: absolute;
  background-color: #2196f3;
  color:white;
  width: 100%;
`;

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.8);
  position: fixed;
  display:flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  width: 800px;
  height: 500px;
  box-shadow: 0 5px 16px rgba(0,0,0,0.2);
  position: relative;
  z-index: 10;
  border-radius: 10px;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color: #141414;

`;
const ModalWrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr 0.1fr;
`;

const CloseModalButton = styled(MdClose)`
  cursor:pointer;
  position: absolute;
  top: 5px;
  right: 5px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;

export const Modal = ({showModal,setShowModal}) =>{
  const modalRef = useRef()

  const animation = useSpring({
    config:{
      duration: 250
    },
    opacity: showModal ? 1: 0,
    transform: showModal ? `translateY(0%)` : `translateY(-100%)`
  })

  const closeModal = e =>{
    if(modalRef.current === e.target){
      setShowModal(false);
    }
  };
  
  const keyPress = useCallback(e =>{
    if(e.key === 'Escape' && showModal){
      setShowModal(false);
    }
  }, [setShowModal,showModal]);

  useEffect(() => {
    document.addEventListener('keydown',keyPress);
    return () => document.removeEventListener('keydown',keyPress)
  },[keyPress]);

  const list = ["Kitöltött állapotban jelenítse meg a bal oldali figyelmeztető sávban, a páciens kartonban",
  "Megjelenítés a páciens portálon"
  ]


  return(
    <>
      {showModal ? (
        <Background ref={modalRef} onClick={closeModal}>
          <animated.div style={animation}>
            <ModalContent showModal={showModal}>
              <ModalWrapper>
              <div>
                <Header>
                Új űrlap mező hozzáadása
                <CloseModalButton aria-label='Close modal' onClick={() => setShowModal(prev=>!prev)}/>
                </Header>
                <Form/>
                <Switch rounded={true} data={list[0]}/>
                <Switch rounded={true} data={list[1]}/>
              </div>
              <div>
                <h3>Mező elnevezése</h3>
                <input type="textarea"></input>
              </div>
              </ModalWrapper>
              </ModalContent>
              <button>Létrehozás</button>
          </animated.div>
        </Background>
      ) : null}
    </>
  )
}