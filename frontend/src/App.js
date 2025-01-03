
import './App.css';
import React,{useState,useEffect} from 'react';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import ContactDashboard from './components/ContactDashboard';
import ContactForm from './components/ContactForm';
import axios from 'axios';
import ContactDetails from './components/ContactDetails';

function App(){
  const [contacts,setContacts]=useState([]);
  const [editContact,setEditContact]=useState(null);
  const [searchTerm,setSearchTerm]=useState('');

  useEffect(()=>{
    fetchContacts();
  },[]);

  const fetchContacts=async()=>{
    try {
      const response=await axios.get('https://contactapp-mern-lpzw.onrender.com/api/contacts');
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts',error);
    }
  };

  const addOrUpdateContact=async(contact)=>{
    if(editContact){
      try {
        const response=await axios.put(`https://contactapp-mern-lpzw.onrender.com/api/contacts/${editContact._id}`,contact);
        setContacts(contacts.map((c)=>c._id===editContact._id?response.data:c));
        setEditContact(null)
      } catch (error) {
        console.error('Error updating contact:',error);
      }
    }else{
      try {
        const response=await axios.post('https://contactapp-mern-lpzw.onrender.com/api/contacts',contact);
        setContacts([...contacts,response.data]);
      } catch (error) {
        console.error('Error adding contact',error);
      }
    }
  };

  const handleEdit=(contact,navigate)=>{
    setEditContact(contact);
    navigate('/addContact');
  };

  const deleteContact=async(id)=>{
    try {
      await axios.delete(`https://contactapp-mern-lpzw.onrender.com/api/contacts/${id}`);
      setContacts(contacts.filter((c)=>c._id!==id));
    } catch (error) {
      console.error('Error deleting contact',error);
    }
  };

  const filteredContacts=contacts.filter((contact)=>{
    return contact.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return(
    <div className='container'>
      <Router>
        <div className='App'>
            <Routes>
              <Route path='/' 
                element={<ContactDashboard 
                          contacts={filteredContacts} 
                          deleteContact={deleteContact} 
                          onEdit={handleEdit}
                          setSearchTerm={setSearchTerm}
                          />}
              />

              <Route path='/addContact'
                element={<ContactForm
                          addOrUpdateContact={addOrUpdateContact}
                          editContact={editContact}/>}
              />

              <Route path='/contacts/:id'
                element={<ContactDetails/>}
              />
            </Routes>
        </div>
      </Router>

    </div>
  );

}

export default App;
