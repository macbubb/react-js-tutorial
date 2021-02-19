import React from 'react';

class Move extends React.Component {
    render() {
        const step = this.props.stepNumber - 1;
        const move =this.props.lastMove[step];
        return (
            <span>

            </span>
        );
    }
}

export default Move;
