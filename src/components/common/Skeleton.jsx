const Skeleton = () => {
  let skeletonLen = 10;

  return (
    <div className='media-grid-skeleton'>
      {Array.from({ length: skeletonLen }, (_, index) => {
        return <div key={index} className='skeleton'></div>;
      })}
    </div>
  );
};
export default Skeleton;
