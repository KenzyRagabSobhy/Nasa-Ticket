import React, { useEffect, useState } from 'react';
import DateTime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import TicketTemplate from './personal';
import './Personal.css';
function InputForm() {
    // Personal fields
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [nationalid, setnationalid] = useState('');
    
    // Contact fields
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');

   //book
//    const [Departing,setDeparting]=useState('');
//    const[Returing,setReturing]=useState('');
//    const[flyfrom,setflyfrom]=useState('');
//    const[flyto,setflyto]=useState('');
   const [flightCount, setflightCount] = useState(1);
   const [flightDetails, setflightDetails] = useState([
    {Departing:'',Returing:'',flyfrom:'' , flyto:'' },
    {Departing:'',Returing:'',flyfrom:'' , flyto:'' },
    {Departing:'',Returing:'',flyfrom:'' , flyto:'' },
   
]);
   const onChangeflightFields = (value, field, id) => {
    const obj = {
        ...flightDetails[id - 1],
        [`${field}`]: value
    }
    const latestData = flightDetails.map((el, index ) => (index === (id - 1) ? obj : el))
    setflightDetails(latestData);
}
    const [showTicket, setShowTicket] = useState(false);
    var idList = ['fname', 'lname', 'nationalid', 'phone', 'email',
     'address','Departing','Returing','flyto','flyfrom']

    useEffect(() => {
        sessionStorage.setItem("reloading", "true");
    }, []);
    
    // Ensure that form is cleared on page refresh
    window.onload = function() {
        const reloading = sessionStorage.getItem("reloading");
        if (reloading) {
            sessionStorage.removeItem("reloading");
            clearAll();
        }
    }

    // Additional validations before submitting the form
    // const checkValidity = () => {
    //     const validity = idList.map((item) => {
    //         if (!document.getElementById(item).validity.valid) {
    //             return false;
    //         }
    //         return true;
    //     });
    //     return validity.some((item, index) => {
    //         return item === false;
    //     });
    // }
    // const loadFile = (event) => {
    //     const file = event.target.files[0];
    //     const reader = new FileReader();
    //     reader.readAsDataURL(file);
    // }
    const expand = (id) => {
        const coll = document.getElementById(id);
        coll.classList.toggle("active");
            let content = coll.nextElementSibling;
            if (content.style.display === "flex") {
                coll.lastChild.className="fas fa-caret-down"
                content.style.display = "none";
            } else {
                content.style.display = "flex";
                coll.lastChild.className="fas fa-caret-up"
                content.style.marginBottom = "20px";
            }
    }

    const personalFields = () => {
        return (
            <>
               <div className="form-group">
                    <input type="text" name="fname" id="fname" placeholder="First Name" value={fname} onChange={(e) => {setFname(e.target.value)}} required />
                    <span style={{color: 'red', alignSelf: 'baseline'}}>*</span>
                </div>
                <div className="form-group">
                    <input type="text" name="lname" id="lname" placeholder="Last Name" value={lname} onChange={(e) => {setLname(e.target.value)}} required />
                    <span style={{color: 'red', alignSelf: 'baseline'}}>*</span>
                </div>
                
                <div className="form-group">
                <input type="number" name="Nationalid" id="nationalid" placeholder="your national id"  pattern="[0-9]{14}" value={nationalid} onChange={(e) => {setnationalid(e.target.value)}} required/>
                <span style={{color: 'red', alignSelf: 'baseline'}}>*</span>    
                </div>
            </>
        );
    }
    // const BookFields=()=>{
    //     return (
    //         <>
    //            <div className="form-group">
    //                 <label className='flight'>Departing:</label>
    //                 <input type="date" name="Departing" id="travel"  value={Departing} onChange={(e) => {setDeparting(e.target.value)}} required />
    //                 <span style={{color: 'red', alignSelf: 'baseline'}}>*</span>
    //             </div>
    //             <div className="form-group">
    //                 <label className='flight' id='re'>Returing:</label>
    //                 <input type="date" name="Returing" id="travel"  value={Returing} onChange={(e) => {setReturing(e.target.value)}} required />
    //                 <span style={{color: 'red', alignSelf: 'baseline'}}>*</span>
    //             </div>
    //             <div className="form-group">
    //                 <label className='flight' id='re' >Fly from:</label>
    //                 <input type="text" name="flyfrom"  placeholder='write your country' value={flyfrom} onChange={(e) => {setflyfrom(e.target.value)}} required />
    //                 <span style={{color: 'red', alignSelf: 'baseline'}}>*</span>
    //             </div>
    //             <div className="form-group">
    //                 <label className='flight' id='rs'>Fly to:</label>
    //                 <input type="text" name="flyto" placeholder='write the planet you want to visit' id="flyto"  value={flyto} onChange={(e) => {setflyto(e.target.value)}} required />
    //                 <span style={{color: 'red', alignSelf: 'baseline'}}>*</span>
    //             </div>
             
    //         </>
    //     );

    // }
    const flightFields = (id) => {
        idList.push(`Departing${id}`);
        idList.push(`Returing${id}`);
        idList.push(`flyfrom${id}`);
        idList.push(`flyto${id}`);
        return (
            <>
              {/* <div className="form-group">
                     <input type="date" name="Departing" id="travel" value={flightDetails[id-1].Departing} onChange={(e) => {onChangeflightFields(e.target.value, 'Departing', id)}}/>
                    <span style={{color: 'red', alignSelf: 'baseline'}}>*</span>
               </div> */}
               <div className="form-group">
               <label className='flight'>Departing:</label> 
                    <DateTime
                        timeFormat={false}
                        inputProps={{name: `Departing${id}`, placeholder: 'Starting Date', value: flightDetails[id-1].Departing.toString()}}
                        id={`Departing${id}`}
                        dateFormat="YYYY"
                        closeOnSelect
                        onChange={(date) => {
                        onChangeflightFields(date._d.getFullYear() , 'Departing', id);
                        <span style={{color: 'red', alignSelf: 'baseline'}}>*</span>
                    }}/>
                </div>
                <div className="form-group">
                <label className='flight' id='re'>Returing:</label>
                    <DateTime
                        timeFormat={false}
                        inputProps={{name: `Returing${id}`, placeholder: 'ending Date', value: flightDetails[id-1].Returing.toString()}}
                        id={`Returing${id}`}
                        dateFormat="YYYY"
                        closeOnSelect
                        onChange={(date) => {
                        onChangeflightFields(date._d.getFullYear() , 'Returing', id);
                        <span style={{color: 'red', alignSelf: 'baseline'}}>*</span>
                    }}/>
                </div>
              
               <div className="form-group">
                     <label className='flight' id='re' >Fly from:</label>
                     <input type="text" value={flightDetails[id-1].flyfrom} onChange={(e) => {onChangeflightFields(e.target.value, 'flyfrom', id)}} name={`flyfrom${id}`} id={`flyfrom${id}`} required />
                    <span style={{color: 'red', alignSelf: 'baseline'}}>*</span>
                </div>
                <div className="form-group">
                    <label className='flight' id='rs'>Fly to:</label>
                    <input type="text" value={flightDetails[id-1].flyto} onChange={(e) => {onChangeflightFields(e.target.value, 'flyto', id)}} name={`flyto${id}`} id={`flyto${id}`} required />
                    <span style={{color: 'red', alignSelf: 'baseline'}}>*</span>
                </div>
             
           </>
        );
                
    }

    const contactFields = () => {
        return (
            <>
                <div className="form-group">
                    <input type="tel" value={phone}onChange={(e) => {setPhone(e.target.value)}} name="telephone" id="phone" placeholder="Phone Number (EX: 01226963933)" pattern="[0-9]{11}" required />
                    <span style={{color: 'red', alignSelf: 'baseline'}}>*</span>
                </div>
                <div className="form-group">
                    <input type="email" value={email} onChange={(e) => {setEmail(e.target.value)}} name="email" id="email" placeholder="Email (EX: emailid@something.com)"required />  
                    <span style={{color: 'red', alignSelf: 'baseline'}}>*</span>
                </div>
                <div className="form-group">
                    <input type="text" value={address} onChange={(e) => {setAddress(e.target.value)}} name="address" id="address" placeholder="Address" required />
                    <span style={{color: 'red', alignSelf: 'baseline'}}>*</span>
                </div>
            </>
       );
    }

    const generate = async (e) => {
        const coll = document.getElementsByClassName("collapsible");
        
        for (let i = 0; i < coll.length; i++) {
            coll[i].nextElementSibling.style.display = "flex";
            coll[i].nextElementSibling.style.marginBottom = "20px";
        }
        // const isInvalid = await checkValidity();

        // if (!isInvalid) {
            const formData = [{
                fname,
                lname,
                phone,
                email,
                address,
                nationalid,
             
                flightDetails,
            }];
            await localStorage.setItem('formData', JSON.stringify(formData));
            setShowTicket(true);
    }
    const clearflight=()=>{
        setflightCount(flightCount - 1)
        if(flightCount === 2&& flightFields(2))
        {
           flightDetails[1].Departing='';
           flightDetails[1].Returing='';
           flightDetails[1].flyfrom='';
           flightDetails[1].flyto='';
        }
        if(flightCount === 3&& flightFields(3))
        {
           flightDetails[2].Departing='';
           flightDetails[2].Returing='';
           flightDetails[2].flyfrom='';
           flightDetails[2].flyto='';
        }

    }
    
    const clearAll = () => {
        idList = ['fname', 'lname','phone', 'email',
         'address','nationalid'];


        setShowTicket(false);

        localStorage.setItem('formData', '');
        

        // Personal Details
        setFname('');
        setLname('');
        setnationalid('');
    
        // Contact fields
        setPhone('');
        setEmail('');
        setAddress('');
        setflightCount(1);
        setflightDetails ([
            {Departing:'',Returing:'',flyfrom:'' , flyto:'' },
            {Departing:'',Returing:'',flyfrom:'' , flyto:'' },
            {Departing:'',Returing:'',flyfrom:'' , flyto:'' },
        ]);


        // setDeparting('');
        // setReturing('');
    }
    return (
        <div className="wrapper1">
            {!showTicket ? 
            <div className="TicketForm">
                <div className="TicketDetails">
                   
                    <h1 className="TicketHead">start your journey</h1>
                </div>
                <form className="formwrap" id="form">
                    <button type="button" className="collapsible" id="personal" onClick={() => expand("personal")}> Personal Details</button>
                    <div className="content">
                        {personalFields()}
                    </div>
                    <button type="button" className="collapsible" id="contactButton" onClick={() => expand("contactButton")}> Contact Details</button>
                    <div className="content">
                        {contactFields()}
                    </div>
                     <button type="button" className="collapsible" id="Book" onClick={() => expand("Book")}>Book The Ticket</button>
                    <div className="content" id="workExpWrap" style={{paddingBottom: '150px'}}>
                        {flightFields(1)}
                        {(flightCount === 2 || flightCount === 3 ) && flightFields(2)}
                        {(flightCount === 3 || flightCount === 4 ) && flightFields(3)}
                        <div className="addDeleteWrap">
                            <button type="button" className="submit" disabled={flightCount === 3} style={{marginRight: '25px'}} onClick={() => setflightCount(flightCount + 1)}> <i className="fas fa-plus" style={{color: flightCount === 5 ? 'lightgray' : 'gray'}}></i> Add</button>
                            <button type="button" className="submit" disabled={flightCount === 1} onClick={() => clearflight()}> <i className="fas fa-trash" style={{color: flightCount === 1 ? 'lightgray' : 'gray'}}></i>Delete</button>
                        </div>
                    </div>
                   
                    <div className="submitWrap">
                        <button type="submit" className="submit" id="submit" onClick={(e) => generate(e)}>Generate</button>
                        <button type="reset" className="submit" id="reset" onClick={() => clearAll()}>Reset</button>
                    </div>
                </form>
            </div> : <TicketTemplate generateNew={clearAll} />}
        </div>
    );
}

export default InputForm;

