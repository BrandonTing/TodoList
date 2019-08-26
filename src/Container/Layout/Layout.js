import React, { Component } from 'react';

import classes from './Layout.module.css'

class Layout extends Component {
    render() {
        return (
            <React.Fragment>
                <div className={classes.Toolbar}>Toolbar</div>
                <main>{this.props.children}</main>
            </React.Fragment>
        )
    }
}

export default Layout;