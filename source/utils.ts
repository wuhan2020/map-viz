// 宽屏模式（通常是 PC）
export const isLandscape = () => {
  return (
    (window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth) >
    (window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight) *
      0.8
  );
};
