import { useEffect, useState } from "react";
import useRpc from "../../../hooks/useRpc";

const EMPTY_VALUES = { size: "", free: "", used: "" };

export default function SdCard() {
  const { rpc } = useRpc();
  const [cardInfo, setCardInfo] = useState(EMPTY_VALUES);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hostname = window.location.hostname;
  const API_URL = `http://${hostname}:8000/sdcardStats`;

  const fetchSdcardInfo = async () => {
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        setCardInfo(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchSdcardInfo();
  }, []);

  if (loading) return <p>Loading sd card info data...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="card-ui w-[30rem]">
      <div className="flex justify-between text-gray-300 cursor-not-allowed">
        <h1 className="w-40">Status</h1>
        <p>OK</p>
      </div>
      <div className="flex justify-between my-5">
        <h1 className="w-40">Memory size</h1>
        <p>
          {cardInfo.size} GB (Used: {((cardInfo.used / cardInfo.size) * 100).toFixed(2)}%)
        </p>
      </div>

      <hr />
      <div className="flex justify-between mt-5">
        <div
          className="p-2 underline cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            rpc.call("sdcardFormat", {});
          }}
        >
          Format card
        </div>
      </div>
    </div>
  );
}
