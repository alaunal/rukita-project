export type ILayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<ILayoutProps> = ({ children }) => {
  return (
    <main className="relative w-full h-screen bg-slate-100 flex">
      {children}
    </main>
  );
};

export default Layout;
