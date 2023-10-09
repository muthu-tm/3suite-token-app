import React,{useState} from "react";
import { sanitize } from "../../utils/sanitize";
import loadingGif from "../../assets/Images/loading-green-loading.gif"
import { images } from "../../assets/image";
 

function Newsletter({ status, message, onValidated }:any) {
  const [error, setError] = useState<any>(null);
  const [email, setEmail] = useState<any>(null);

  const handleFormSubmit = () => {
    setError(null);

    if (!email) {
      setError("Please enter a valid email address");
      return null;
    }

    const isFormValidated = onValidated({ EMAIL: email });

    return email && email.indexOf("@") > -1 && isFormValidated;
  };

  const handleInputKeyEvent = (event:any) => {
    setError(null);
    if (event.keyCode === 13) {
      event.preventDefault();
      handleFormSubmit();
    }
  };

  const getMessage = (message:any) => {
    if (!message) {
      return null;
    }
    const result = message?.split("-") ?? null;
    if ("0" !== result?.[0]?.trim()) {
      return sanitize(message);
    }
    const formattedMessage = result?.[1]?.trim() ?? null;
    return formattedMessage ? sanitize(formattedMessage) : null;
  };
  return (
    <div className="newsletter" id="newsletter" data-aos="zoom-in-up">
      <div className="n-head">Join with our 3Suite App</div>
      <div className="n-desc">
        Step into the realm of seamless token deployment with our cutting-edge
        web3 technology. Our suite of products is meticulously designed to
        revolutionize how you create, deploy, and manage token contracts on the
        blockchain. The EverRise Ecosystem helps provide security solutions for
        both DeFi projects and holders.
      </div>
      <div className="get-in-touch">
        <input placeholder="Get in touch with us"  className="GT-cta"  onChange={(event) => setEmail(event?.target?.value ?? "")}
            onKeyUp={(event) => handleInputKeyEvent(event)}/>
        <button className="sub-cta" onClick={handleFormSubmit}>Submit</button>
      </div>
      <div style={{textAlign:"center",marginTop:30}}>
        { 'sending' === status ? <img src={images.LoadingGif.src} alt="" className="n-gif" /> : null }
        { status ===  'error' || error ? (
          <div
            className="text-red-700 pt-2"
            style={{color:"#FF0000",fontSize:14,fontWeight:500,width:"100%"}}
            dangerouslySetInnerHTML={{ __html: error || getMessage( message ) }}
          />
        ) : null }
        {'success' === status && 'error' !== status && !error && (
          <div className="text-green-200 font-bold pt-2"  style={{color:"#3ca775",fontSize:14,fontWeight:500,width:"100%"}} dangerouslySetInnerHTML={{ __html: sanitize(message) }} />
        )}
        </div>
    </div>
  );
}

export default Newsletter;
