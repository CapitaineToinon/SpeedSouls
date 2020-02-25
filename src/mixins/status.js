export default {
  data: () => ({
    status: {
      pending: false,
      rejected: false,
      fulfilled: false,
      cancelled: false,
      error: null
    }
  })
};
