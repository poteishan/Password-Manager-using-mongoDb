const Navbar = () => {
  return (
    <nav className="h-12 bg-slate-900 text-white">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4">
        <a href="/" className="text-xl font-bold">
          <span className="text-green-500">&lt;</span>
          Pass
          <span className="text-green-500">OP/&gt;</span>
        </a>

        <ul className="flex gap-4 text-sm">
          <li>
            <a className="hover:font-bold" href="/">Home</a>
          </li>
          <li>
            <a className="hover:font-bold" href="#about">About</a>
          </li>
          <li>
            <a className="hover:font-bold" href="#contact">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;