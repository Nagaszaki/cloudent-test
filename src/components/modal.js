import React, {useRef,useEffect,useCallback,useState} from 'react';
import styled from 'styled-components';
import {useSpring, animated} from 'react-spring';
import {MdClose} from 'react-icons/md';
import Switch from './switch/switch';

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.8);
  position: fixed;
  display:flex;
  justify-content: center;
  align-items: center;
`

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

  p{
    margin-bottom: 1rem;
  }

  button{
    padding: 10px 24px;
    background: #141414;
    color: #fff;
    border: none;
  }
`;

const CloseModalButton = styled(MdClose)`
  cursor:pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
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

const [isToggled, setIsToggled] = useState(false);

  return(
    <>
      {showModal ? (
        <Background ref={modalRef} onClick={closeModal}>
          <animated.div style={animation}>
            <ModalContent showModal={showModal}>
              <h1>Űrlap mező hozzáadása</h1>
              <div>
              <label for="form-style">Űrlap mező típusa:
                <select name="form-style" id="form-style">
                  <option selected disabled>Válassz egy opciót</option>
                  <option value="boolean">Eldöntendő</option>
                  <option value="textarea">Kifejtendő</option>
                </select>
              </label>
              <label for="default_value">
                 Alapértelmezett állapot:
                <input type="radio" name="default_value" value="none"></input>
                <label for="none">Nincs</label>
                <input type="radio" name="default_value" value="yes"></input>
                <label for="yes">Igen</label>
                <input type="radio" name="default_value" value="no"></input>
                <label for="no">Nem</label>
                </label>
              </div>
              <Switch rounded={true}/>
              <Switch rounded={true}/>
              </ModalContent>
            <CloseModalButton aria-label='Close modal' onClick={() => setShowModal(prev=>!prev)}/>
          </animated.div>
        </Background>
      ) : null}
    </>
  )
}