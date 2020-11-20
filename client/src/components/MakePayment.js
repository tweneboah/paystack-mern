import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makePayment } from "../redux/paymentActions";
import Loading from "./Loading";
import Message from "./Message";

const MakePayment = () => {
  const [user, setUser] = useState("");
  const [email, setemail] = useState("");
  const [amount, setAmount] = useState("");

  //dispatch
  const dispatch = useDispatch();
  const payment = useSelector((state) => state.payment);

  const { loading, error } = payment;
  console.log(loading, error);

  const formSubmitHandler = async (e) => {
    const paymentDetails = {
      user,
      email,
      subaccount: "ACCT_sqoshxezjhzbmma" || user.subaccount.subaccountcode,
      // onClose: (e) => console.log(e),
      amount: amount * 100,
      callback_url: "http://localhost:3000/payment",
      channels: ["card", "bank", "ussd", "qr", "mobile_money", "bank_transfer"],
    };
    e.preventDefault();
    dispatch(
      makePayment(
        "https://api.paystack.co/transaction/initialize",
        paymentDetails
      )
    );
  };

  return (
    <div className="row container-height">
      <div className="col-lg-6 col-md-6 m-auto">
        <div className="container">
          <h1 className="text-center">Make payment</h1>
          {loading ? <Loading /> : error && <Message />}
          <form onSubmit={formSubmitHandler}>
            <fieldset>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">User</label>
                <input
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Amount</label>
                <input
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  type="number"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                />
              </div>
              <button type="submit" className="btn btn-info m-auto">
                Pay
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MakePayment;
