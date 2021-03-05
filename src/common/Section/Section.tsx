export const Section: React.FC<SpreadingProps<HTMLDivElement>> = ({ children, ...props }) => {
  return (
    <section
      {...props}
      style={{ border: '1px solid', borderRadius: '10px', padding: '10px', marginBottom: '20px' }}
    >
      {children}
    </section>
  );
};
