import React from 'react'

const Navbar = () => {
    return (
        <nav className="navbar bg-body-tertiary">
            <div className="container-fluid d-flex justify-content-evenly">
                <a className="navbar-brand tx"  href="/">
                    <img src={process.env.PUBLIC_URL + '/logo.png'} alt="Logo" width="60" height="48" className="d-inline-block align-text-top"/>
                        ZenFlow
                </a>
            </div>
        </nav>
    )
}

export default Navbar