const getHost = () => {
  const HOSTNAME = window.location.hostname;
  const PORT = window.location.port;
  const HOST =
    !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
      ? `ws://${HOSTNAME}:8000/`
      : `wss://${HOSTNAME}:${PORT}/`;
  return HOST;
};

export default getHost;
