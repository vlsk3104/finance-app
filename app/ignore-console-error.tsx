'use client';

const IgnoreConsoleError = () => {
  const error = console.error;
  console.error = (...args: any) => {
    if (/defaultProps/.test(args[0])) return;
    error(...args);
  };
  return <></>;
};

export default IgnoreConsoleError;
