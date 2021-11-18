import circularProgressGif from "../../assets/circular-progress.gif";

export function CircularProgress() {
  return (
    <img src={circularProgressGif} alt="Loading" className="flex-grow-0" />
  );
}
