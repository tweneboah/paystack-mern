import React from "react";
import axios from "axios";

const Subscribe = () => {
  let [plan, setPlanCode] = React.useState("PLN_b42p2l4c09s24u4");
  let [email, setEmail] = React.useState("");
  let handleSubscription = async () => {
    // console.log(email);
    console.log({ plan, email, amount: 600 });
    let res = await axios.post("http://localhost:5000/paystack-post-handler", {
      paystackUrl: "https://api.paystack.co/transaction/initialize",
      data: {
        email,
        plan,
        amount: 600,
      },
    });
    console.log(res.data);
  };
  return (
    <div>
      <h1>Subscription</h1>
      <select
        onClick={(e) => {
          setPlanCode(e.target.value);
        }}
      >
        <option value={"PLN_b42p2l4c09s24u4"}>Monthly</option>
        <option value={"PLN_wcfw94769bj8fay"}>Annual</option>
      </select>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia
        perferendis consequuntur eaque error illo magnam molestias quos
        explicabo sit, ipsum qui saepe quaerat repellendus hic maxime asperiores
        eligendi soluta laborum. Lorem ipsum dolor, sit amet consectetur
        adipisicing elit. Repellat fugiat sunt fugit suscipit earum ut
        voluptates incidunt ex? Repellat tenetur excepturi reprehenderit nihil
        culpa assumenda. Facere nemo fugit eum nulla.
      </p>
      <div>{plan}</div>
      <input
        type="text"
        name="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSubscription} className="btn btn-success col mt-5">
        Subscribe
      </button>
    </div>
  );
};

export default Subscribe;
