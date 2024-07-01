const Skeleton = () => {
  let skeletonLen = 10;

  return (
    <>
      {Array.from({ length: skeletonLen }, (_, index) => {
        return <div key={index} className='skeleton'></div>;
      })}
    </>
  );
};
export default Skeleton;
