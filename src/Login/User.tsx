const User = () => {
  const userName = localStorage.getItem("userName");

  return <div>Welcome Back {userName}</div>;
};

export default User;
