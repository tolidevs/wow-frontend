import React, { Component } from 'react';
import {
    Modal,
    Button,
    Icon
} from "semantic-ui-react";

class RemoveFromWatchListModal extends Component{
    state = { open: false }

    handleOpen = () => this.setState({ open: true })

    handleClose = () => this.setState({ open: false })

    render() {
        const { title, id, unsave } = this.props
        return (
            <Modal open={this.state.open}
                trigger={<Icon
                    name="heart"
                    size="big"
                    onClose={this.handleClose}
                    onClick={this.handleOpen}
                />}
                basic
                size="tiny"
            >
                <Modal.Content>
                    <p>Are you sure you would like to remove {title} from your watchlist?</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button basic color='red' onClick={this.handleClose} inverted>
                        <Icon name='remove' /> No
                    </Button>
                    <Button color='green' onClick={() => {
                        unsave(id)
                        this.handleClose()
                    }
                    } inverted>
                    <Icon name='checkmark' /> Yes
              </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

export default RemoveFromWatchListModal
