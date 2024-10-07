export default function SdCard() {
  return (
    <div className="card-ui w-[30rem]">
      <div className="flex justify-between">
        <h1 className="w-40">Status</h1>
        <p>OK</p>
      </div>
      <div className="flex justify-between my-5">
        <h1 className="w-40">Memory size</h1>
        <p>32.0 GB (Used: 84.38%)</p>
      </div>

      <hr />
      <div className="flex justify-between mt-5">
        <h1 className="w-40 underline cursor-pointer">Format card</h1>
      </div>
    </div>
  );
}
