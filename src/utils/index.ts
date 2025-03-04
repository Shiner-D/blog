// useEffect(() => {
//   const handleWheel = (e) => {
//     // 阻止默认滚动行为
//     e.preventDefault();

//     // 定义每次滚动的距离（例如一个窗口高度）
//     const scrollDistance = window.innerHeight;

//     // 判断滚轮方向
//     if (e.deltaY > 0) {
//       console.log("向下滚动", e)
//       // 向下滚动
//       window.scrollBy({
//         top: scrollDistance,
//         behavior: "smooth", // 平滑滚动
//       });
//     } else if (e.deltaY < 0) {
//       console.log("向上滚动", e);
//       // 向上滚动
//       window.scrollBy({
//         top: -scrollDistance,
//         behavior: "smooth", // 平滑滚动
//       });
//     }
//   };

//   // 监听滚轮事件
//   window.addEventListener("wheel", handleWheel, { passive: false });

//   // 清理事件监听
//   return () => {
//     window.removeEventListener("wheel", handleWheel);
//   };
// }, []);
