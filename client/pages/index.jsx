const Index = ({ currentUser }) => {
  return currentUser ? <h1>You are signin </h1> : <h2>YOu are not sign in</h2>;
};

export default Index;
