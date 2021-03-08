// 문서 > 설치 > 웹사이트에 React 추가
// https://ko.reactjs.org/docs/add-react-to-a-website.html

'use strict';

const e = React.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return 'You liked this.';
    }

    // return e(
    //   'button',
    //   { onClick: () => this.setState({ liked: true }) },
    //   'Like'
    // );
    return (
      <button onClick={() => this.setState({ liked: true })}>
        Like
      </button>
    );
  }
}

const domContainer = document.querySelector('#like_button_container');
ReactDOM.render(e(LikeButton), domContainer);

// 컴포넌트 재사용

// const domContainer2 = document.querySelector('#like_button_container2');
// ReactDOM.render(e(LikeButton), domContainer2);

// const domContainer3 = document.querySelector('#like_button_container3');
// ReactDOM.render(e(LikeButton), domContainer3);
