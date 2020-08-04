import React from 'react';
import { SampleContext } from './sample-context';

class Echo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
    };
  }

  handleTextChange = (event) => {
    this.setState({
      text: event.target.value,
    });
  }

  render = () => {
    const label = this.props.label ? this.props.label + ': ' : '';
    const text = this.state.text;

    // 여기!
    // 이 컴포넌트의 부모 노드 중 <SampleContext.Provider>가
    // 1. 없다면 기본값을 사용한다.
    // 2. 있다면 가장 가까운 것의 값을 사용한다.
    const enabled = this.context;

    return (
      <div>
        <label>
          {label}
          <input type="text" value={text} onChange={this.handleTextChange} disabled={!enabled} />
        </label>
        <br />
        <span>
          {text}
        </span>
      </div>
    );
  }
}

// 여기!
Echo.contextType = SampleContext;

export default Echo;
