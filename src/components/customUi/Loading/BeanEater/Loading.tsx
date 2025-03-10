import beanStyle from "./loading.module.scss";

const BeanLoading = () => {
  return (
    <div className="flex justify-center items-center w-full h-full bg-white/70">
      <div className={beanStyle.loading}>
        <div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default BeanLoading;
