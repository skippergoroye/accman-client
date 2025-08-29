const parseError = (err) => {
  if (err?.response?.data?.errors) {
    const message = Object.values(err.response.data.errors)[0];
    // return message;
    return { errorMessage: message, id: 'error_0' };
  } else if (err?.response?.data?.error?.message) {
    return { errorMessage: err.response.data.error.message, id: 'error_1' };
    // return err.response.data.error.message;
  } else if (err?.response?.data?.message) {
    return { errorMessage: err.response.data.message, id: 'error_2' };
    // return err.response.data.message;
  } else if (err?.response?.data) {
    return { errorMessage: err.response.data, id: 'error_3' };
    // return err.response.data;
  } else if (err.message) {
    return { errorMessage: err.message, id: 'error_4' };
    // return err.message;
  } else {
    return { errorMessage: 'Error Occured', id: 'error_other' };
    // return 'Error Occured';
  }
};

export default parseError;
