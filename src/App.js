import { useForm } from "react-hook-form";
import "./App.css";
import { Button } from "./components/button";
import { Input } from "./components/input";
import { Modal } from "./components/modal";
import Lottie from "lottie-react";
import successAnimation from "./lottie/success.json";
import { useState } from "react";

function App() {
  const [showModal, setShowModal] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onFormSubmit = (data) => {
    var requestOptions = {
      method: "POST",
      body: JSON.stringify(data),
      redirect: "follow",
    };
    //post data to postman mock server
    fetch(
      "https://ebb3766e-8043-4e1e-9375-4386e043c57c.mock.pstmn.io/user",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        if (result === "success") {
          setShowModal(true);
          reset();
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="App">
      {/* modal when request successed */}
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <div className="success-box">
          <Lottie
            style={{ width: "300px" }}
            animationData={successAnimation}
            loop={false}
          />

          <div className="text">Success! Your request has been processed</div>
        </div>
      </Modal>

      <form onSubmit={handleSubmit(onFormSubmit)} className="main">
        <Input
          register={{ ...register("name", { required: "Name is required" }) }}
          label={"Name"}
          placeholder="your name"
          error={errors?.name}
          errorMessage={errors?.name?.message}
        />
        <div className="space-vertical"></div>
        <Input
          register={{
            ...register("email", {
              required: "Email is required",
              validate: {
                matchPattern: (v) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                  "Email address must be a valid address",
              },
            }),
          }}
          type="text"
          label={"Email"}
          placeholder="Your email address"
          error={errors?.email}
          errorMessage={errors?.email?.message}
        />
        <div className="space-vertical"></div>

        <Input
          register={{
            ...register("phone", {
              required: "Phone number is required",
              validate: {
                matchPattern: (v) =>
                  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
                    v
                  ) || "Phone number is not a valid number",
              },
            }),
          }}
          type="tel"
          label={"Phone"}
          placeholder="Your phone number"
          error={errors?.phone}
          errorMessage={errors?.phone?.message}
        />
        <div className="space-vertical"></div>

        <Input
          register={{
            ...register("address", {
              required: "Address number is required",
            }),
          }}
          label={"Address"}
          placeholder="Your address"
          error={errors?.address}
          errorMessage={errors?.address?.message}
        />
        <div className="space-vertical"></div>

        <Input
          register={{
            ...register("birthDate", {
              required: "Date of birth number is required",
            }),
          }}
          error={errors?.birthDate}
          errorMessage={errors?.birthDate?.message}
          type="date"
          label={"Date of birth"}
        />
        <div className="space-vertical-2"></div>

        <Button>Submit</Button>
      </form>
    </div>
  );
}

export default App;
