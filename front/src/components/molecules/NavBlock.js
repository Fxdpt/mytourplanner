import React from 'react'
import Toggler from '../atoms/Toggler'
import SignIn from '../organisms/SignIn'
import Modal from '../molecules/Modal'
import './NavBlock.css'


function NavBlock() {

    const isLogged = false

    if(!isLogged){
        return (
            <div>
                <ul className="navBlock">
                    <Toggler 
                        toggle={show => <li onClick={show}>SE CONNECTER</li>}
                        content={hide => (
                            <Modal>
                                <SignIn onClick={hide} />
                            </Modal>
                        )}
                    />
                    <Toggler 
                        toggle={show => <li onClick={show}>S'INSCRIRE</li>}
                        content={hide => (
                            <Modal>
                                inscrit toi ...
                                <span onClick={hide}>X</span>
                            </Modal>
                        )}
                    />
                </ul>
            </div>
        )
    }
}

export default NavBlock
