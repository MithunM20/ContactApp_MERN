import React,{useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./NavBar";

const ContactForm=({addOrUpdateContact,editContact})=>{
  const [name,setName]=useState('');
  const [phone,setPhone]=useState('');
  const [email,setEmail]=useState('');
  const navigate=useNavigate();

  useEffect(()=>{
    if(editContact){
      setName(editContact.name);
      setPhone(editContact.phone);
      setEmail(editContact.email);
    }
  },[editContact]);

  const handleSubmit=(e)=>{
    e.preventDefault();
    addOrUpdateContact({name,phone,email});
    setName('');
    setPhone('');
    setEmail('');
    navigate('/');
  };

  return(
    <div>
      <Navbar/>
      <h2>{editContact? 'Edit Contact' : 'Add Contact'}</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} required />

        <input type="text" placeholder="Phone" value={phone} onChange={(e)=>setPhone(e.target.value)} required/>

        <input type="text" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required />

        <button type="submit">
          {editContact ? 'Update Contact' : 'Add Contact'}
        </button>
      </form>
    </div>
  );

};

export default ContactForm;