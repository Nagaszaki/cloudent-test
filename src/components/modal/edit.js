import React, {useRef,useEffect,useCallback,useState} from 'react';
import styled from 'styled-components';
import {useSpring, animated} from 'react-spring';
import {MdClose} from 'react-icons/md';
import Switch from '../switch/switch';
import Form from '../form/form';

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
  width: 660px;
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
  @media only screen and (max-width: 700px){
    width:90vw;
    height: 90vh;
  }

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
  width: 100%;
  background-color: #fff;
  border: 1px solid #707070;
  border-radius:5px;
  display:flex;
  flex-direction: column;
  justify-content:center;
  align-items:center;

  h3{
    @media only screen and (max-width: 700px){
      font-size:14px;
    }
  }
  label{
    @media only screen and (max-width: 700px){
      font-size:12px;
    }
  }

  & >h3{
    padding-left: 30px;
    align-self:flex-start;
  }

  & .textarea{
    width: 95%;
    height: 40px;
    margin-bottom: 10px;
  }
`;

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

    @media only screen and (max-width: 700px){
      padding:2px;
    }
  }
  .right{
    @media only screen and (max-width: 700px){
      display:flex;
      flex-direction:row;
    }
  }

  & .right button:nth-child(2){
    background-color:SlateBlue;
    color:white;
  }
`;

export const Edit = ({showModal,setShowModal,updateList,deleteForm,index}) =>{
  const modalRef = useRef();

  const [basicValue,setBasicValue] = useState(0);

  const animation = useSpring({
    config:{
      duration: 250
    },
    opacity: showModal ? 1: 0,
    transform: showModal ? `translateY(0%)` : `translateY(-100%)`
  });

  const closeModal = e =>{
    if(modalRef.current === e.target){
      setShowModal(false);
      setFormType('');
      setFormName('');
      setBasicValue(0);
    }
  };
  
  const keyPress = useCallback(e =>{
    if(e.key === 'Escape' && showModal){
      setShowModal(false);
      setFormType('');
      setFormName('');
      setBasicValue(0);
    }
  }, [setShowModal,showModal]);

  useEffect(() => {
    document.addEventListener('keydown',keyPress);
    return () => document.removeEventListener('keydown',keyPress)
  },[keyPress]);

  const list = ["Kit??lt??tt ??llapotban jelen??tse meg a bal oldali figyelmeztet?? s??vban, a p??ciens kartonban",
  "Megjelen??t??s a p??ciens port??lon"
  ];

  const [formName, setFormName] = useState('');
  const [formType, setFormType] = useState('');

  useEffect(() => {
    let arr = localStorage.getItem('formList');
    arr = JSON.parse(arr);
    if (arr!=null && arr.length > 0){
      setFormName(arr[index].name);
      setFormType(arr[index].type);
      setBasicValue(arr[index].basicValue);
    }
  },[showModal]);

  const handleChange = (e) =>{
    const {value} = e.target;
    setFormName(value);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if(formType !== '' && formName !== ''){
      let tempObj={};
      tempObj['name'] = formName;
      tempObj['type'] = formType;
      tempObj['basicValue'] = basicValue;
      updateList(tempObj,index);
    } else {
      alert('K??rem v??lassza ki a form t??pus??t ??s t??ltse ki a n??v mez??t!');
    }
  }

  const handleDelete = () =>{
    deleteForm(index);
    setFormType('');
    setFormName('');
    setBasicValue(0);
  }

  return(
    <>
      {showModal ? (
        <Background ref={modalRef} onClick={closeModal}>
          <animated.div style={animation}>
            <ModalContent showModal={showModal}>
                <Header>
                ??rlap mez?? szerkeszt??se
                <CloseModalButton aria-label='Close modal' onClick={() => setShowModal(prev=>!prev)}/>
                </Header>
                <Block>
                  <Form setFormType={setFormType} formType={formType} basicValue = {basicValue} setBasicValue={setBasicValue}/>
                  <Switch rounded={true} data={list[0]}/>
                  <Switch rounded={true} data={list[1]}/>
                </Block>
              <Block>
                <h3>Mez?? elnevez??se</h3>
                <input className="textarea" type="textarea" value = {formName} onChange = {handleChange}/>
              </Block>
              <ButtonContainer>
                <button className="left" onClick={handleDelete}>Mez?? t??rl??se</button>
                <div className="right">
                  <button onClick={() => (setShowModal(prev=>!prev), setFormType(''), setFormName(''))}>M??gsem</button>
                  <button onClick={handleUpdate}>Friss??t??s</button>
                </div>
              </ButtonContainer>
              </ModalContent>
          </animated.div>
        </Background>
      ) : null}
    </>
  )
};