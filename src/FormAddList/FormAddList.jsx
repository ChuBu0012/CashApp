import { useEffect, useRef, useState } from "react";
import axios from "axios";
import NavBar from "../Navbar";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const FormAddList = () => {
  const navigate = useNavigate();
  const [PreRemain, setPreRemain] = useState([]);
  const [ListItem, setListItem] = useState([]);
  //ยอดรวมของเก่า

  function getData() {
    axios.get(`${import.meta.env.VITE_API}/CashData`).then((res) => {
      setListItem(res.data);
      const Allamount = res.data
        .map((ele) => {
          return ele.amount;
        })
        .reduce((a, b) => a + b);
      setPreRemain(Allamount);
    });
  }
  useEffect(() => {
    getData();
  }, []);

  const nameItem = useRef(null);
  const amount = useRef(null);

  const [nameSubmitBtn, setnameSubmitBtn] = useState("มีอะไรให้เพิ่มมุ้ย?");

  const Submit = (e) => {
    e.preventDefault();
    const nameItemList = nameItem.current.value;
    const amountList = Number(amount.current.value);
    const remain = Number(PreRemain) + amountList;
    axios
      .post(`${import.meta.env.VITE_API}/AddList`, {
        nameItem: nameItemList,
        amount: amountList,
        remain: remain,
      })
      .then((res) => {
        Swal.fire("เพิ่มรายการสำเร็จ", "ขอให้เป็นวันที่ดี...", "success");
        nameItem.current.value = "";
        amount.current.value = "";
        setnameSubmitBtn("มีอะไรให้เพิ่มมุ้ย?");
        getData();
      })
      .catch((err) => {
        Swal.fire(err.response.data.error, "ลองกลับไปดูดีๆสิ", "error");
      });
  };

  const checkinexcome = (e) => {
    const money = Number(amount.current.value);
    if (money > 0) {
      setnameSubmitBtn("😮ซื้ออะไรดีนะ?");
    } else if (money < 0) {
      setnameSubmitBtn("💸ปลิวอีกหนึ่ง");
    } else {
      setnameSubmitBtn("มีอะไรให้เพิ่มมุ้ย?");
    }
  };

  const ConfirmDel = (slug) => {
    Swal.fire({
      title: "กดผิดรึป่าว?",
      showCancelButton: true,
      cancelButtonText: "ใช่",
      cancelButtonColor: "green",
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "ไม่",
    }).then((result) => {
      if (result.isConfirmed) {
        DeleteItem(slug);
      }
      getData();
    });
  };

  const DeleteItem = (slug) => {
    axios
      .delete(`${import.meta.env.VITE_API}/delItem/${slug}`)
      .then((res) => {
        res.json(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className=" max-h-screen box-border">
      <NavBar />
      <h1 className="text-xl underline underline-offset-4 decoration-wavy mb-4 text-header text-center">
        เสียหรือได้เงินล่ะ ??
      </h1>
      <form
        onSubmit={Submit}
        className="flex flex-col h-56 justify-around items-center"
      >
        <div className="flex flex-col w-3/4 justify-center items-center">
          <label className="my-2 text-title font-medium">ชื่อรายการ</label>
          <input
            className="border-2 md:h-12 md:text-xl rounded-lg border-title text-title outline-none bg-white py-1 px-2 w-2/3"
            type="text"
            ref={nameItem}
            placeholder="ค่าอีหยังจ้ะ?"
          />
        </div>
        <div className="flex flex-col w-3/4 justify-center items-center">
          <label className="my-2 text-title font-medium">จำนวนเงิน</label>
          <input
            className="border-2 md:h-12 md:text-xl  rounded-lg border-title text-title outline-none bg-white py-1 px-2 w-2/3"
            type="number"
            ref={amount}
            onChange={checkinexcome}
            placeholder="100, -200"
          />
        </div>
        <div className=" h-32 flex justify-center items-center">
          <input
            type="submit"
            className="border-2 md:text-lg lg:text-xl p-1 mt-4 rounded-md text-white font-medium bg-header border-header"
            value={nameSubmitBtn}
          />
        </div>
      </form>

      <div>
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
                className="flex justify-between items-center p-4 bg-orange-100 rounded-lg m-auto w-full md:w-2/4"
                key={index}
              >
                <div className="flex justify-between items-center w-full">
                  <div className="flex flex-col justify-center items-start">
                    <span className=" text-header md:text-2xl">{ele.nameItem}</span>
                    <span className=" text-slate-500">{formatdate}</span>
                    <button
                      onClick={() => ConfirmDel(ele.slug)}
                      className=" bg-transparent text-red-500 md:text-xl "
                    >
                      ลบ
                    </button>
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
      </div>
    </div>
  );
};
export default FormAddList;
