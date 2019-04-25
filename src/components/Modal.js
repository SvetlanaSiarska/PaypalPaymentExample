import React from "react";
import ReactDOM from "react-dom";


const Modal = props => {
    const JSX_MODAL = (
        <div className="ui dimmer modals visible active"
        onClick={props.onDismiss} >  
          <div className="ui standard modal visible active"
           onClick={(e)=> e.stopPropagation()}>
              <i onClick={props.onDismiss} className="close icon"></i>
              <div className="header">{props.title}</div>
              <div className="content">{props.content}</div>
          </div>
        </div>
      );

    return ReactDOM.createPortal(JSX_MODAL, document.querySelector("#modal"));
}

export default Modal;