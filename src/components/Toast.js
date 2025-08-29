import { toast, Slide } from 'react-toastify';

const options = {
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  transition: Slide
};

function toastSuccess(title) {
  toast.success(title, options);
}

function toastError(title) {
  toast.error(title, options);
}

function toastInfo(title) {
  toast.info(title, options);
}
function toastWarning(title) {
  toast.warn(title, options);
}

export { toastSuccess, toastError, toastInfo, toastWarning };
