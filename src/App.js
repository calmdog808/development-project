import './App.css';
import BakeryItem from "./components/BakeryItem";
import bakeryData from "./assets/bakery-data.json";
import "./App.css";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button} from "@mui/material"
import Grid from '@mui/material/Unstable_Grid2';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

import { Checkbox, Radio, Space, RadioChangeEvent } from 'antd';



function App() {
  let total = 0
  const [cart, setCart] = useState({});
  const [type, setType] = useState("all");  
  const [type2, setType2] = useState([]);
  const [filterCheck, setFilterCheck] = useState([false, false, false]);
  const [howSort, setSort] = useState("bestsellers")


  const selectFilterType = eventKey => {
    setType(eventKey);
  };

  const selectFilterType2 = e => {
    if (e.target.checked) {
      setType2([...type2, e.target.value]);
      if (e.target.value ==="nut-free") {
        const newFilterCheck = [...filterCheck]
        newFilterCheck[0]=true
        setFilterCheck(newFilterCheck)
      }
      else if (e.target.value ==="gluten-free") {
        const newFilterCheck = [...filterCheck]
        newFilterCheck[1]=true
        setFilterCheck(newFilterCheck)
      }
      else {
        const newFilterCheck = [...filterCheck]
        newFilterCheck[2]=true
        setFilterCheck(newFilterCheck)
      }
    } else {
      setType2(type2.filter(id => id !== e.target.value));
      if (e.target.value ==="nut-free") {
        const newFilterCheck = [...filterCheck]
        newFilterCheck[0]=false
        setFilterCheck(newFilterCheck)
      }
      else if (e.target.value ==="gluten-free") {
        const newFilterCheck = [...filterCheck]
        newFilterCheck[1]=false
        setFilterCheck(newFilterCheck)
      }
      else {
        const newFilterCheck = [...filterCheck]
        newFilterCheck[2]=false
        setFilterCheck(newFilterCheck)
      }
    }
  };

  const matchesFilterType = item => {
    // all items should be shown when no filter is selected
    if(type === "all") { 
      return true
    } else if (type === item.category) {
      return true
    }  
      else if (type !== item.category) {
      return false
    } 
      else {
      return false
    }
  }

  const matchesFilterType2 = item => {
    if (type2.length === 0) {
      return true
    } else if (type2.every(x => item.allergen.includes(x))) {
      return true
    } 
    else{
      return false
    }
  }

  const selectSort = (e: RadioChangeEvent) => {
    setSort(e.target.value)
  }


  const reset = () => {
    setType("all")
    setType2([])
    setSort("bestsellers")
    setFilterCheck([false,false,false])
  }


  const filteredData = bakeryData.filter(matchesFilterType)
  const filteredData2 = bakeryData.filter(matchesFilterType2)

  const finalFiltered = filteredData.filter(value => filteredData2.includes(value));

  let finalData 
  if (howSort === "price") {
    finalData = [...finalFiltered].sort((a, b) => a.price - b.price)
  }
  else if (howSort==="bestsellers") {
    finalData = [...finalFiltered].sort((a, b) => a.rank - b.rank)
  }


  

  return (

    <div className="App">
      <h1>my bakery</h1> 

      <Grid container spacing={8} sx={{px: 12, py: 2}}>
        <Grid xs>
            <h2>filter</h2>

            <p>product category</p>
            <Nav onSelect={selectFilterType}>
              <Nav.Item><Nav.Link eventKey="all">All</Nav.Link></Nav.Item>
              <Nav.Item><Nav.Link eventKey="baked good">baked good</Nav.Link></Nav.Item>
              <Nav.Item><Nav.Link eventKey="drink">drink</Nav.Link></Nav.Item>
              <Nav.Item><Nav.Link eventKey="ice cream">ice cream</Nav.Link></Nav.Item>
            </Nav>

            <br/>
            <br/>


            <p>dietary restriction</p>
            <div >
                <Checkbox onChange={selectFilterType2} value = "nut-free" checked = {filterCheck[0]}>
                  nut-free
                </Checkbox>
                <Checkbox onChange={selectFilterType2} value = "gluten-free" checked = {filterCheck[1]}>
                  gluten-free
                </Checkbox>
                <Checkbox onChange={selectFilterType2} value = "dairy-free" checked = {filterCheck[2]}>
                  dairy-free
                </Checkbox>
            </div>

            <br/>
            <br/>
            <p>sort by</p>
            <Radio.Group onChange={selectSort} defaultValue={"bestsellers"}>
              <Space direction="vertical">
                <Radio  value={"bestsellers"} >bestsellers</Radio>
                <Radio  value={"price"} >price low to high</Radio>
              </Space>
            </Radio.Group>

            <p>reset</p>
            <Button 
                  variant="contained" 
                  disableElevation
                  onClick={reset}
              >
                  clear filers
              </Button>

        </Grid>
        <Grid container spacing={2} xs={8}>
          {finalData.map(item => 
          <Grid container spacing={2} xs={6} md={4}>
            <BakeryItem 
              item={item}
              handler = {setCart}
              cart = {cart}
            />
          </Grid> 
          )}
        </Grid>

        <Grid container direction="column" xs={2}>
          <h2>favorites</h2>
          <br/>
          <p> {Object.values(cart).map((item) => {
          total += item.price 
          return (
            <p key={item.name}> {item.name}</p>
          )
          })}
          </p>
          <br/>
          <p>total: ${total.toFixed(2)}</p>
          
        </Grid>
 
      </Grid>
    </div>

  );



}

export default App;
