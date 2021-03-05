export const Title: React.FC<SpreadingProps<HTMLHeadingElement>> = ({ children, ...props }) => {
  return (
    <h1 {...props} style={{ padding: '10px', marginBottom: '30px' }}>
      {children}
    </h1>
  );
};
