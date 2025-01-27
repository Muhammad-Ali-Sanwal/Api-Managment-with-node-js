import { FC, MouseEvent } from "react";
interface ModalDialogProps {
  title?: string;
  description?: string;
  loading?: boolean;
  onCancel?: () => void;
  onClose?: (
    event: MouseEvent<Element, MouseEvent>,
    reason: "backdropClick" | "escapeKeyDown"
  ) => void;
  width?: string;
  children?: React.ReactNode;
  open?: boolean;
}

const ModalDialog: FC<ModalDialogProps> = ({
  title,
  description,
  loading = false,
  onCancel,
  onClose,
  children,
  width,
  open,
  ...props
}) => {
  const handleClose = (event: any) => {
    if (!loading) {
      onClose?.(event, "backdropClick");
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 transition-opacity  ${
        open ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      onClick={handleClose}
      {...props}
    >
      <div
        className={`bg-white rounded-lg  p-6 relative mx-32 sm:mx-0`}
        onClick={(e) => e.stopPropagation()}
      >
        {onClose && (
          <button
            className="absolute top-4 right-4 border border-gray-800 rounded-sm p-1 flex items-center justify-center hover:bg-gray-200 "
            disabled={loading}
            onClick={handleClose}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}

        <div className="flex flex-col items-center md:mt-10 mt-0">
          {title && (
            <h2 className="text-xl font-semibold text-center">{title}</h2>
          )}
          {description && (
            <p className="mt-3 text-gray-600 px-[4%] text-center">
              {description}
            </p>
          )}
        </div>
        <div className=" py-8 flex flex-col items-center ">{children}</div>
      </div>
    </div>
  );
};

export default ModalDialog;
