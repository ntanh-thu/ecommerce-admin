const Loader = ({ width = "50" }) => {
  return (
    <div
      className={`loader w-[${width}px] p-[${Number(
        width.toString() / 6.25
      ).toFixed()}px]`}
    ></div>
  );
};

export default Loader;
