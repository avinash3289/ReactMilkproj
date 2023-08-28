import React, { useState } from "react";
import styled from 'styled-components';
import { insertrate } from "../services/service";
const Background = styled.div`
min-width:1078px;
background: linear-gradient(45deg , #0e1023, #617587);
height:95vh;
position:fixed;
`;
const Container = styled.div`
  width:430px;
  transform:translate(60%,15%);
  background-color: #c9cfde;
  padding:4px 5px;
  border-radius:5px;
  border:2px solid burlywood;
  height:400px;
`;

const FormGroup = styled.div`
  margin-bottom:5px;
  margin-top: 1px;
  padding: 4px;
`;

const StyledLabel = styled.label`
  padding-bottom:3px;
  color: rgb(246, 7, 7);
  font-weight:600;
   
`;
const Heading=styled.p`
   color:green;
   text-align:center;
   font-size:25px;

`
const StyledInput = styled.input`
  width:370px;
  height:25px;
  color: black;
  font-weight: 500;
  border-radius: 6px;
  padding:3px;
  margin-bottom:5px;
`;

const ButtonContainer = styled.div`
 margin-top:15px; 
display:flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const InsertButton = styled.button`
  background-color: #0f75b9;
  height: 34px;
  color: whitesmoke;
  font-size: 16px;
  font-weight: 600;
  border-radius: 6px;
  transform: scale(0.9);

  &:hover {
    background-color: #0793f0;
    transform: scale(1);
    border-color: coral;
  }
`;

const UpdateButton = styled.button`
  background-color: #0bee25;
  height: 34px;
  color: whitesmoke;
  font-size: 16px;
  font-weight: 600;
  border-radius: 6px;
  transform: scale(0.9);

  &:hover {
    background-color: #1cff37;
    transform: scale(1);
    border-color: rgb(165, 58, 79);
  }
`;



function Ratechart() {
  const [ratechart, setChart] = useState({
    fat: '',
    snf1: '',
    snf2: '',
    snf3: '',
    snf4: ''
  });
  const [intialratechart, intialsetChart] = useState({
    fat: ' ',
    snf1: ' ',
    snf2: ' ',
    snf3: ' ',
    snf4: ' '
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setChart({ ...ratechart, [name]: value });
  };

  const handleInsert = async (e) => {
    e.preventDefault();
    console.log(ratechart);
    let res=await insertrate(ratechart);
    if(ratechart.fat.length>0 && ratechart.snf1.length>0 &&ratechart.snf2.length>0 && ratechart.snf3.length>0&& ratechart.snf4.length>0){
      if(res.data.submit==true){
        alert("Rate Fixed");
        setChart(intialratechart)
      }
      else{
        alert("rate not fix")
      }
    }
    else{
      alert("Enter Required Fields");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if(ratechart.fat.length>0 && ratechart.snf1.length>0 &&ratechart.snf2.length>0 && ratechart.snf3.length>0&& ratechart.snf4.length>0){
      if(res.data.submit==true){
        alert("Rate Updated");
        setChart(intialratechart)
      }
      else{
        alert("rate not Updated")
      }
    }
    else{
      alert("Enter Required Fields");
    }
  };

  return (
    <>
    <Background>
      <Container>
        <form>
          <Heading>Ratechart</Heading>
          <FormGroup>
            <StyledLabel>Fat</StyledLabel>
            <StyledInput
              type="text"
              name="fat"
              value={ratechart.fat}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <StyledLabel>8.60</StyledLabel>
            <StyledInput
              type="text"
              name="snf1"
              value={ratechart.snf1}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <StyledLabel>8.70</StyledLabel>
            <StyledInput
              type="text"
              name="snf2"
              value={ratechart.snf2}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <StyledLabel>8.80</StyledLabel>
            <StyledInput
              type="text"
              name="snf3"
              value={ratechart.snf3}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <StyledLabel>8.90</StyledLabel>
            <StyledInput
              type="text"
              name="snf4"
              value={ratechart.snf4}
              onChange={handleInputChange}
            />
          </FormGroup>
          <ButtonContainer>
            <div className="btns">
              <InsertButton onClick={handleInsert}>Insert</InsertButton>
            </div>
            <div className="btns">
              <UpdateButton onClick={handleUpdate}>Update</UpdateButton>
            </div>
          </ButtonContainer>
        </form>
      </Container>
      </Background>
    </>
  );
}

export default Ratechart;
