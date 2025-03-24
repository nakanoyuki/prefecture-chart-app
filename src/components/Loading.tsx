const LoadingStyle: React.CSSProperties = {
  width: "600px",
  height: "300px",
  marginTop: "20px",
  textAlign: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export const Loading = () => {
  return <div style={LoadingStyle}>Loading...</div>;
};
