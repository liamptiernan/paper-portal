import { NotificationProps } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useCallback } from "react";

export function useTryToast<T>(
  success?:
    | Partial<NotificationProps>
    | ((result: T) => Partial<NotificationProps>)
    | null,
  error?:
    | Partial<NotificationProps>
    | ((err: unknown) => Partial<NotificationProps>)
) {
  return useCallback(
    async (fn: () => Promise<T>) => {
      try {
        const result = await fn();
        if (!success) return result;

        const options = Object.assign(
          {
            title: "Success",
            icon: <IconCheck />,
            autoClose: 3500,
            message: null,
            radius: "xl",
          },
          success instanceof Function ? success(result) : success
        );
        notifications.show(options);
        return result;
      } catch (err: unknown) {
        const options = Object.assign(
          {
            title: "Error",
            icon: <IconX />,
            autoClose: 3500,
            message: null,
          },
          error instanceof Function ? error(err) : error
        );
        notifications.show(options);
      }
    },
    [error, success]
  );
}
