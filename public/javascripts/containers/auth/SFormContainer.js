import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { initialize } from 'redux-form';
import SForm from '../../components/auth/SForm';
import { authUserInfo } from '../../actions'

class submitForm extends Component {

    handleSubmit(data, url) {
        console.log('Submission received!', data);
        this.props.dispatch(authUserInfo(url, data));
    }

    render() {
        const  { authStatus, buttonText, url } = this.props
        return (
            <SForm onSubmit={this.handleSubmit.bind(this, url)}
                  authStatus={authStatus}
                  buttonText={buttonText}
                  />
        )
    }

}


let mapStateToProps = (state, ownProps) => {
    return {
        authStatus: state.authReducer,
        buttonText: ownProps.buttonText,
        url: ownProps.url
    }
}

export default connect(
    mapStateToProps
)(submitForm);
