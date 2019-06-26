import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd-mobile';

class CustomModal extends Component {
    constructor(props) {
        super(props);
        this.hideModal = this.hideModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    render() {
        const { visible, title, negative_button_text, positive_button_text, children } = this.props;
        return (
            <Modal
                visible={visible}
                transparent
                maskClosable={false}
                title={title}
                onClose={this.hideModal}
                footer={[
                    { text: negative_button_text, onPress: this.hideModal},
                    { text: positive_button_text, onPress: this.handleSubmit} 
                ]}
                wrapProps={{ onTouchStart: this.onWrapTouchStart }}
            >
                {children}
            </Modal>
        );
    }

    hideModal() {//hide modal
        const {hideModal} = this.props;
        hideModal();
    }

    handleSubmit() {//submit
        const {handleSubmit} = this.props;
        handleSubmit();
    }
}

CustomModal.propTypes = {//参数类型及是否必传
    visible: PropTypes.bool,
    title: PropTypes.string,
    negative_button_text: PropTypes.string.isRequired,
    positive_button_text: PropTypes.string.isRequired,
    children: PropTypes.node //自定义内容
};

CustomModal.defaultProps = {//默认参数
    visible: false,
    title: '标题',
    negative_button_text: '取消',
    positive_button_text: '确定'
};

export default CustomModal;