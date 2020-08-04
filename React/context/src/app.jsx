import React from 'react';
import Echo from './echo';
import { SampleContext } from './sample-context';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      enabled: true,
      text: '',
    };
  }

  handleToggleClick = () => {
    this.setState((state) => ({enabled: !state.enabled}));
  }

  render = () => {
    const enabled = this.state.enabled;
    const echoesInContext = [];
    const echoesOutOfContext = [];
    for (let i = 0; i < 3; i += 1) {
      echoesInContext.push(<Echo key={i} label={`In context (${i + 1})`} />);
      echoesOutOfContext.push(<Echo key={i} label={`Out of context (${i + 1})`} />);
    }
    return (
      <div className="App">

        {/* <SampleContext.Provider> 안의 것들은 context의 영향을 받는다. */}
        <SampleContext.Provider
          value={enabled}
        >
          {echoesInContext}
        </SampleContext.Provider>

        {/* <SampleContext.Provider> 밖의 것들은 context의 영향을 받지 않고 기본값으로 나온다. */}
        {echoesOutOfContext}

        <div>
          <button type="button" onClick={this.handleToggleClick}>
            Toggle
          </button>
          <br />
          <span>
            {`\`enabled\` state: ${enabled}`}
          </span>
        </div>
      </div>
    );
  }
}

export default App;
