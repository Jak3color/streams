import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from '../Modal';
import history from '../../history';
import { Link } from 'react-router-dom';
import { fetchStream, deleteStream } from '../../actions';

class StreamDelete extends Component {

    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id)
    }

    renderActions() {
        const { id } = this.props.match.params;
        return (
            <React.Fragment >
                <button onClick={() => this.props.deleteStream(id)} className='ui negative button'>Delete</button>
                <Link to="/" className='ui button'>Cancel</Link>
            </React.Fragment>
        );

    }



    renderContent() {
        if (!this.props.stream) {
            return 'Are you sure you wish to delete this stream?';
        }
        else {
            return `Are you sure you wish to delete the ${this.props.stream.title} stream?`;
        }
    }

    render() {
        return (
            <Modal
                title="Delete Stream"
                content={this.renderContent()}
                actions={this.renderActions()}
                onDismiss={() => history.push('/')}
            />
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] }
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);