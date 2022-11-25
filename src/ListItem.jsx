import { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "./Navbar";
import { useNavigate } from "react-router-dom";

const ListItem = () => {
  const [ListItem, setListItem] = useState([]);
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API}/CashData`).then((res) => {
      setListItem(res.data);
    });
  }, []);
  return (
    <ul className="flex flex-col-reverse justify-center p-10">
      {ListItem.map((ele, index) => {
        let checkColoramount = "text-sky-600";
        let checkamount = "";
        if (ele.amount > 0) {
          checkColoramount = "text-lime-500";
          checkamount = "+";
        } else if (ele.amount < 0) {
          checkColoramount = "text-red-600";
          checkamount = "";
        }
        let updateat = new Date(ele.updatedAt);
        let formatdate = updateat.toLocaleDateString("th-TH", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
        return (
          <li
            className={`flex justify-between items-center p-4 bg-orange-100 rounded-lg m-auto w-full md:w-2/4 lg:w-3/6`}
            key={index}
          >
            <div className="flex justify-between items-center w-full">
              <div className="flex flex-col justify-center items-start">
                <span className=" text-header md:text-2xl">{ele.nameItem}</span>
                <span className=" text-slate-500">{formatdate}</span>
              </div>
              <div className=" flex flex-col justify-center items-center">
                <span className={`${checkColoramount} md:text-2xl`}>
                  {checkamount}
                  {ele.amount}
                </span>
                {ele.remain && (
                  <p className=" text-sky-700 md:text-xl">ค.ล. {ele.remain}</p>
                )}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default ListItem;
