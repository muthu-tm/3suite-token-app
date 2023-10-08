import React from 'react'
import MailchimpSubscribe from "react-mailchimp-subscribe";
import config from "../../config";
import Newsletter from './Newsletter';


function NewsletterSubscribe() {
    const MAILCHIMP_URL= config.mailChimpURL;
  return (
    <div>
        <MailchimpSubscribe
      url={ MAILCHIMP_URL }
      render={ ( props:any) => {
        const { subscribe, status, message } = props || {};
        return (
          <Newsletter
            status={ status }
            message={ message }
            onValidated={ (formData: any) => subscribe( formData ) }
          />
        );
      } }
    />
      
    </div>
  )
}

export default NewsletterSubscribe
