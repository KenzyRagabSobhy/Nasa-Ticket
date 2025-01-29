import React, {useRef} from 'react';
import { BsTelephoneInboundFill } from "react-icons/bs";
import { AiOutlineMail} from "react-icons/ai";
import { BiSolidHome} from "react-icons/bi";
import {BsFillPostcardFill} from "react-icons/bs";

import {BsAirplaneFill} from "react-icons/bs";


import './Personal.css';
import ReactToPrint from 'react-to-print';

function TicketTemplate({generateNew}) {
	const componentRef = useRef();
	const formData = JSON.parse(localStorage.getItem('formData'));
  return (
    <div className="wrapper">
      <div className="download">
        <button className="generateNew" onClick={() => {
			generateNew();
			window.location.reload(false)
		}}>Generate New</button>
		<ReactToPrint trigger={() => <button className="generateNew">Download</button>
		}content={() => componentRef.current}/>
      </div>
		<div className="Ticket" id="Ticket" ref={componentRef}>
			<div className="contact_wrap pb">
					<div className="title" style={{ color: '#66e9fa',marginLeft:'20px'}}>
						Contact information
					</div>
					<div className="contact">
						<ul>
									<div className="icon"><span style={{marginRight:'20px',color:'#66e9fa'}}><BsTelephoneInboundFill/></span><label>Phone: </label></div>
									<div className="text">{formData[0].phone}</div>
									<div className="icon"><span style={{marginRight:'20px',color:'#66e9fa'}}><AiOutlineMail/></span><label>Email: </label></div>
									<div className="text">{formData[0].email}</div>
									<div className="icon"><span style={{marginRight:'20px',color:'#66e9fa'}}><BiSolidHome/></span><label>Address: </label></div>
									<div className="text" id='g2'>{formData[0].address}</div>
									<div className="icon"><span style={{marginRight:'20px',color:'#66e9fa'}}><BsFillPostcardFill/></span><label>National-ID: </label></div>
									<div className="text" id='g1'>{formData[0].nationalid}</div>
							
						</ul>
					</div>
				</div>
		
				<div className="header">
						<div className="name">
						 	{formData[0].fname} {formData[0].lname} 
							
					</div>
                
					{/* <div >
						<div className='fly'>
						{formData[0].flyfrom}
						<span style={{color:'white'}}><BsAirplaneFill/> </span>
						{formData[0].flyto}

						</div>
						<div className='goto'>
						      <label style={{color:'#66e9fa'}}> Departing: </label>
						       {formData[0].Departing}
						      <label style={{color:'#66e9fa'}}> Returing: </label>
						       {formData[0].Returing}
						</div>
					</div> */}
						<div className="ResumeText">
							<ul>
								{formData[0].flightDetails.map((item, index) => {
									return (item.flyfrom) ?
									(
										<div className="li_wrap">
											<div className="goto">
												<p><label style={{color:'#66e9fa'}}> Departing: </label>{item.Departing} - <label style={{color:'#66e9fa'}}> Returing: </label>{item.Returing} </p>
											</div>
											<div className="fly">
												<p>
												   {item.flyfrom}
												</p>
												<span style={{color:'white',marginTop:'15px'}}><BsAirplaneFill/> </span>
												<p>
												   {item.flyto}
												</p>
												
											</div>
										</div>
									):''
								})}
							</ul>
						</div>
			</div>
		</div>
	</div>
  );
}

export default TicketTemplate;