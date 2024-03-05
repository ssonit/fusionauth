"use client";
import instance from "@/lib/instance";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useEffect, useState } from "react";

const style = { layout: "vertical" };

async function createOrder() {
  return fetch("http://localhost:3002/api/payment/create-paypal-order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          reference_id: "65db36bd4e5e165fdc2ab5f1",
          amount: {
            currency_code: "USD",
            value: "2.00",
          },
        },
        {
          reference_id: "65e434d2632cef78a99f1f56",
          amount: {
            currency_code: "USD",
            value: "1.00",
          },
        },
      ],
    }),
  })
    .then((response) => response.json())
    .then((order) => {
      return order.data.id;
    });
}
async function onApprove(data: any) {
  console.log(data, "approve");
  return fetch("http://localhost:3002/api/payment/capture-paypal-order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      order_id: data.orderID,
    }),
  })
    .then((response) => response.json())
    .then((orderData) => {
      console.log(orderData, "approved");
    });
}

// Custom component to wrap the PayPalButtons and show loading spinner
const ButtonWrapper = ({ showSpinner }: { showSpinner: boolean }) => {
  const [{ isPending }] = usePayPalScriptReducer();

  return (
    <>
      {showSpinner && isPending && (
        <div
          className="block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      )}
      {!showSpinner && (
        <PayPalButtons
          style={{
            layout: "vertical",
          }}
          forceReRender={[style]}
          disabled={false}
          fundingSource={undefined}
          createOrder={createOrder}
          onApprove={onApprove}
        />
      )}
    </>
  );
};

export default function PaypalButtonWrapper() {
  const [clientId, setClientId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function getConfig() {
      try {
        setIsLoading(true);
        const res = await instance.get("/api/payment/config");
        setClientId(res.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    getConfig();
  }, []);
  return (
    <div className="max-w-[750px] w-full mt-[160px] min-h-[200px]">
      {clientId && !isLoading && (
        <PayPalScriptProvider
          options={{
            clientId,
            components: "buttons",
            currency: "USD",
          }}
        >
          <ButtonWrapper showSpinner={isLoading} />
        </PayPalScriptProvider>
      )}
      {isLoading && (
        <div className="flex items-center justify-center">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
