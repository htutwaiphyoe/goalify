import { useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const useToastEffect = ({
  error,
  message,
  reset,
  onSuccess,
  clear,
}: {
  error?: any;
  message?: string;
  reset?: any;
  onSuccess?: any;
  clear?: any;
}) => {
  const dispatch = useDispatch<any>();

  useEffect(() => {
    if (message) {
      toast.success(message);
      onSuccess && onSuccess();
      reset && dispatch(reset());
    }
    if (error) {
      toast.error(error);
      reset && dispatch(reset());
    }

    return () => {
      clear && dispatch(clear());
    };
  }, [message, error]); // eslint-disable-line react-hooks/exhaustive-deps
};

export default useToastEffect;
