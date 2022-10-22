import React from 'react';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import AddItem from './AddItem';
import AuthContext from '../context/AuthContext';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import { useState,useContext} from 'react';
export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const [Alert,setAlert] = useState('');
  const [search,setSearch] = useState('');
  const [searchresult,setSearchResult] = useState(null);
  const [loader,setLoader] = useState(true);
  const {authToken} = useContext(AuthContext);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    localStorage.removeItem('steps');
  }
  const handleChange = React.useCallback((newValue) => {
    setOpen(newValue);
  }, []);
  const toSearch = async (e)=>{
    e.preventDefault();
    if(e.target.value==="" || String(e.target.value).indexOf("#")!==-1){
      setSearchResult(null)
    }
    setSearch(e.target.value);
    // setSearchResult(null)
    setLoader(true)
    if(e.target.value!==""){
      await fetch("http://127.0.0.1:8000/api/gosearch/",{
          method:'POST',
          body: JSON.stringify({item:e.target.value}),
          headers:{
              'Content-Type':'application/json',
              'Authorization':'Bearer '+ String(authToken.access),
          },
      }).then(response=>response.json()).then(json=>{
          if(json["notfound"]){
            setSearchResult(json["notfound"])
          }else{
            setSearchResult(json["search_result"]);
          }
          setLoader(false);
      })
    }
  }
  const getItem = (e)=>{
    console.log("Hui")
  }
  console.log(search);
  return (
    <div className='allbody dashboard'>
        {Alert}
        <Button className='add-item' onClick={handleOpen} variant="contained">Add Recipe</Button>
        <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <Box >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <AddItem setOpen={setOpen} setAlert={setAlert} open={open} Open={handleChange}/>
            </Typography>
          </Box>
        </Modal>
        <form className="dashboard-search-form form-inline align-center my-2 my-lg-0 d-inline w-100">
          <TextField className='search-box' value={search} onChange={toSearch} size="small" id="fullWidth" label="Search Recipe" variant="outlined" autoComplete='false'/>
          {searchresult?
          <div className="search_result">
            {loader?
            <div className="loader" style={{marginTop:0}}>
                <img src="./loading.gif" width={40} alt="" />
            </div>:
            Array.isArray(searchresult)?
            <List>
              {searchresult.map((sr,ind)=>{
                  return(
                    <ListItem disablePadding>
                        <ListItemButton onClick={getItem}>
                            <li  key={"item"+ind}><b>{search.charAt(0).toUpperCase() + search.slice(1)}</b>{sr.substring(search.length)}</li>
                        </ListItemButton>
                    </ListItem>
                )
              })}
            </List>
            :searchresult}
          </div>
          :null}
          <Button className='search-item' onClick={()=>{console.log("Hello")}} variant="contained">Search</Button>
        </form>
    </div>
  )
}
