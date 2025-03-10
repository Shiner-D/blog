import loadStyle from './loading.module.scss';
const Loading = () => {

  return (
    <div className="flex justify-center items-center h-screen">
      <div className={loadStyle.loading}>
        {
          Array.from({ length: 36 }).map((_, index) => (
            <div key={index} className={loadStyle.dot} ></div>
          ))
        }
      </div>
    </div>
  );
};

export default Loading;
