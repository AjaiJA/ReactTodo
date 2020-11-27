import React from 'react';

function Modal({open,children}) 
{
    if(!open) return null;

    return(
        <div className="settings-modal">
            {children}
        </div>
    )
}

export default Modal;