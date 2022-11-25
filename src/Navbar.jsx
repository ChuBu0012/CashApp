import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <div className="my-8 w-[90%] m-auto">
      <Link to="/">
        <img src="/piggy-bank.png" className="m-auto w-20" alt="" />
      </Link>

      <div className="flex my-2 text-lg md:text-2xl justify-around text-pink-400">
        <Link to="/">Home</Link>
        <Link to="/AddList">AddList</Link>
      </div>
      <hr className=" h-[2px]   bg-red-300" />
    </div>
  );
};
export default NavBar;
