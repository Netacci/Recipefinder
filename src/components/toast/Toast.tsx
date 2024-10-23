import toast from 'react-hot-toast';

export const showToastMessage = (message: string) => {
  toast.success(message, {
    position: 'top-right',
  });
};

export const showErrorMessage = (message: string) => {
  toast.error(message, {
    position: 'top-right',
  });
};

