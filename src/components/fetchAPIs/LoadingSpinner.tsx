const LoadingSpinner = () => {
  return (
    <div className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-red-600"></div>
  );
};

export default LoadingSpinner;
