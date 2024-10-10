import { useEffect, useState } from "react";
import useRpc from "../../../hooks/useRpc";

const EMPTY_VALUES = { size: "", free: "", used: "" };

export default function SdCard() {
  const { rpc } = useRpc();
  const [cardInfo, setCardInfo] = useState(EMPTY_VALUES);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSdcardInfo = async () => {
    try {
      const params = {};
      const response = await rpc.call("getSdcardStats", params);
      console.log("received 'getSdcardStats' rpc response :>> ", response);
      // setCardInfo(response)
      setLoading(false);
    } catch (err) {
      console.log("err :>> ", err);
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (rpc) fetchSdcardInfo();
  }, [rpc]);

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
