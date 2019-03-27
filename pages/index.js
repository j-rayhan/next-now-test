import React from 'react';
import { bindActionCreators } from 'redux';
import { startClock, addCount, serverRenderClock } from '../store';
import { connect } from 'react-redux';
import Page from '../components/Page';
import Navigation from '../components/navigation';

const Home = () => (
  <div>
    <h1>Home</h1>
    <Navigation />
  </div>
);

class Counter extends React.Component {
  static getInitialProps({ store, isServer }) {
    store.dispatch(serverRenderClock(isServer));
    store.dispatch(addCount());

    return { isServer };
  }

  componentDidMount() {
    // this.timer = this.props.startClock();
  }

  componentWillUnmount() {
    // clearInterval(this.timer);
  }

  render() {
    return <Page title="Index Page" linkTo="/other" />;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addCount: bindActionCreators(addCount, dispatch),
    startClock: bindActionCreators(startClock, dispatch)
  };
};

// export default connect(
//   null,
//   mapDispatchToProps
// )(Counter);

export default Home;
