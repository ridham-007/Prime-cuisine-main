import React, { useState, useEffect, useRef } from "react";
import ReactToPrint, { PrintContextConsumer } from 'react-to-print';
import { FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import question from "../img/user.png";
import { usePaystackPayment } from 'react-paystack';
import "../styles/checkoutBtn.css";

interface CartItem {
  id: string;
  img: string;
  title: string;
  amount: number;
  price: number;
}
const printPageStyle = `
    @page {
        size: auto;
        margin-top: 1.5cm;
        margin-bottom: 1.5cm;
    }

    @media print {
        body {
            -webkit-print-color-adjust: exact;
            color-adjust: exact;
            padding: 0 40px !important;
        }
        table, tr, td, th, tbody, thead, tfoot {
            page-break-inside: avoid !important;
        }
        td table {
            page-break-inside: auto !important;
        }
    }
`;
interface CartProps {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  handleChange: (item: CartItem, value: number) => void;
  setShow: React.Dispatch<React.SetStateAction<Boolean>>;
}

const Cart = ({ cart, setCart, handleChange, setShow }: CartProps) => {
  const [price, setPrice] = useState(0);

  const handleRemove = (id: string) => {
    const arr = cart.filter((item) => item.id !== id);
    setCart(arr);
    handlePrice();
    toast.error("Item removed from cart", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handlePrice = () => {
    let ans = 0;
    cart.forEach((item) => (ans += item.amount * item.price));
    setPrice(ans);
  };
  const containerRef = useRef(null);
  let date = new Date().toJSON().slice(0, 10);
  useEffect(() => {
    handlePrice();
  }, [cart]);

  const storedLastName = localStorage.getItem('lastName');
  const storedFirstName = localStorage.getItem('firstName');
  const storedEmail = localStorage.getItem('email');
  // const storedPhone = storeData && JSON.parse(storeData)?.user?.phone

  // const config = {
  //   reference: (new Date()).getTime().toString(),
  //   email: "example@email.com",
  //   // amount: 20000,
  //   publicKey: 'pk_test_your-public-key',
  // };

  // const onSuccess = (reference: any) => {
  //   console.log(reference);
  // };

  // const onClose = () => {
  //   console.log('closed')
  // }

  // const initializePayment = usePaystackPayment({
  //   ...config,
  //   amount: price * 100 + 100000, // Convert the price to the lowest currency unit (kobo) plus the delivery fee
  // });
  const handlePrintBill = (handlePrint: any) => {
    handlePrint();
    setTimeout(() => {
      // setShow(true)
      setCart([])
    }, 2500)
  }
  return (
    <>
      <section
        className="hidden print:block"
        ref={containerRef}
      >
        <div className="flex flex-row justify-between  items-center">
  
          {
            !!storedFirstName &&
            <div className="flex flex-col h-full justify-center items-center">
              <div><b>Name:</b> {storedFirstName + " " + storedLastName}</div>
              <div><b>Email:</b> {storedEmail}</div>
              {/* <div>Phone: {storedPhone}</div> */}
            </div>
          }
        </div>
        <div className="flex flex-row justify-between w-full border-b-2 font-bold text-xl mt-2 px-5">
          <div className="flex-[40%]">Food</div>
          <div className="flex justify-end ">Items</div>
          <div className="flex-1 flex justify-end">Price</div>
        </div>
        {cart.map((item) => (
          <div className="flex items-center justify-between mt-5 pb-2 border-b-2" key={item.id}>
            <div className="flex w-80">
              <img src={item.img} alt="" className="w-20 h-16 border-r-2" />
              <p className="font-bold ml-5 mt-4">{item.title}</p>
            </div>
            <div className="flex items-center justify-between pb-2 mt-2">
              <div>{item.amount}</div>
            </div>
            <div>
              <span className="text-brandColor py-1.5 px-2.5 rounded-lg mr-2.5"> &#x20B9; {item.price}</span>
            </div>
          </div>
        ))}
        <div className="flex justify-between mt-8">
          <span className="text-lg font-semibold">Meal Price :</span>
          <span className="text-lg font-semibold text-brandColor">  &#x20B9;{price}</span>
        </div>
        <div className="flex justify-between mt-4 border-b-2">
          <span className="text-lg font-semibold">Delivery Fee :</span>
          <span className="text-lg font-semibold text-brandColor">  &#x20B9;1000</span>
        </div>
        <div className="flex justify-between mt-4 border-b-2">
          <span className="text-xl font-bold">Total Cost :</span>
          <span className="text-xl font-bold text-brandColor">  &#x20B9;{price + 1000}</span>
        </div>
        <div className="flex w-full justify-center items-center mt-32">
          <p className="text-xl font-semibold">Enjoy Your Meal😀</p>
        </div>
      </section >
      <section className="w-full align-center items-center mx-auto container flex justify-center">
        <section className="mt-8 px-8">
          {cart.length === 0 ? (
            <div className="container mx-auto justify-center">
              <p className="text-center font-semibold text-xl">Nothing in cart yet</p>
              <img src={question} className="" alt="" />
            </div>

          ) : (
            cart.map((item) => (
              <div className="flex items-center justify-between mt-10 pb-2 border-b-2" key={item.id}>
                <div className="flex w-80">
                  <img src={item.img} alt="" className="w-20 h-16" />
                  <p className="font-bold ml-5 mt-4">{item.title}</p>
                </div>
                <div className="flex items-center justify-between pb-2 mt-2">
                  <button className="px-2.5 py-1.5 text-lg font-bold mr-1.5" onClick={() => handleChange(item, -1)}>
                    -
                  </button>
                  <button>{item.amount}</button>
                  <button className="px-2.5 py-1.5 text-lg font-bold mr-1.5" onClick={() => handleChange(item, 1)}>
                    +
                  </button>
                </div>
                <div>
                  <span className="text-brandColor py-1.5 px-2.5 rounded-lg mr-2.5"> &#x20B9; {item.price}</span>
                  <button
                    className="py-2 px-2.5 font-semibold bg-red-100 rounded-lg cursor-pointer text-brandColor hover:text-red-600"
                    onClick={() => handleRemove(item.id)}
                  >
                    <FaTrash title="Remove from cart" />
                  </button>
                </div>
              </div>
            ))
          )}
          {cart.length > 0 && (
            <>
              <div className="flex justify-between mt-8">
                <span className="text-lg font-semibold">Meal Price :</span>
                <span className="text-lg font-semibold text-brandColor">  &#x20B9;{price}</span>
              </div>
              <div className="flex justify-between mt-4 border-b-2">
                <span className="text-lg font-semibold">Delivery Fee :</span>
                <span className="text-lg font-semibold text-brandColor">  &#x20B9;1000</span>
              </div>
              <div className="flex justify-between mt-4 border-b-2">
                <span className="text-xl font-bold">Total Cost :</span>
                <span className="text-xl font-bold text-brandColor">  &#x20B9;{price + 1000}</span>
              </div>
              <section className="flex justify-between mt-12">
                <ReactToPrint
                  pageStyle={printPageStyle}
                  content={() => containerRef.current}
                  documentTitle="Food court"
                >
                  <PrintContextConsumer>
                    {({ handlePrint }) => (
                      <button
                        className="checkout-btn"
                        onClick={() => {
                          handlePrintBill(handlePrint)
                        }}
                      >
                        Checkout
                      </button>
                    )}
                  </PrintContextConsumer>
                </ReactToPrint>
              </section>
            </>
          )}
        </section>
      </section >
      <ToastContainer />
    </>
  );
};

export default Cart;

