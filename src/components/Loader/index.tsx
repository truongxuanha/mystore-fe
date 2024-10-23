function Loader() {
  return (
    <div className="fixed w-full inset-0 top-0 bottom-0 flex items-center justify-center bg-slate-200/20 backdrop-blur-sm z-50">
      <div className="w-full h-full flex items-center justify-center">
        <div className="loader"></div>
      </div>
    </div>
  );
}

export default Loader;
