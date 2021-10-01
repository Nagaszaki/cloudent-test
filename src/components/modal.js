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
  background-color: SlateGray;
  color:white;
  width: 100%;
  font-weight:300;
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
  padding: 50px 20px;
  width: 800px;
  height: 800px;
  box-shadow: 0 5px 16px rgba(0,0,0,0.2);
  position: relative;
  z-index: 10;
  border-radius: 10px;
  background: lightgray;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  line-height: 1.8;
  color: #141414;

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

const Block = styled.div`
  margin:10px;
  padding:10px 0px;
  width: 100%;
  background-color: #fff;
  border: 1px solid #707070;
  border-radius:5px;
  display:flex;
  flex-direction: column;
  justify-content:center;
  align-items:center;

  & >h3{
    padding-left: 30px;
    align-self:flex-start;
  }

  & .textarea{
    width: 95%;
    height: 40px;
  }
`

const ButtonContainer = styled.div`
  width:100%;
  display:flex;
  justify-content: space-between;

  & button {
    border-radius:5px;
    margin:5px;
    padding:10px 15px;
    border: 0px;
    background-color:white;
    cursor:pointer;
  }

  & .left{
    background-color:Tomato;
    color:white;
    justify-self:flex-start;
  }

  & .right button:nth-child(2){
    background-color:SlateBlue;
    color:white;
  }
` 

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
                <Header>
                Új űrlap mező hozzáadása
                <CloseModalButton aria-label='Close modal' onClick={() => setShowModal(prev=>!prev)}/>
                </Header>
                <Block>
                  <Form/>
                  <Switch rounded={true} data={list[0]}/>
                  <Switch rounded={true} data={list[1]}/>
                </Block>
              <Block>
                <h3>Mező elnevezése</h3>
                <input className="textarea" type="textarea"/>
              </Block>
              <ButtonContainer>
                <button className="left">Mező törlése</button>
                <div className="right">
                  <button onClick={() => setShowModal(prev=>!prev)}>Mégsem</button>
                  <button>Létrehozás</button>
                </div>
              </ButtonContainer>
              </ModalContent>
          </animated.div>
        </Background>
      ) : null}
    </>
  )
}