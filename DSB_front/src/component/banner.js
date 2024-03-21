import React from 'react';
import './banner.css';

class Banner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentItem: 1
    };
  }

  componentDidMount() {
    // 매 2초마다 currentItem을 1씩 증가시켜서 숫자를 변경합니다.
    this.interval = setInterval(() => {
      const nextItem = this.state.currentItem % 3 + 1;
      this.setState({ currentItem: nextItem });
    }, 3000);
  }

  componentWillUnmount() {
    // 컴포넌트가 언마운트되기 전에 인터벌을 클리어합니다.
    clearInterval(this.interval);
  }

  render() {
    return (
      <banner>
        <div className="banner">
          <div className="banner_item">
            {this.state.currentItem}
          </div>
        </div>
      </banner>
    );
  }
}

export default Banner;
