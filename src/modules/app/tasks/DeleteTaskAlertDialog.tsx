'use client';

import { AlertDialog } from '@/modules/shared/dialog/AlertDialog';
import { ErrorList } from '@/modules/shared/errors/ErrorList';
import { FormAction } from '@/modules/shared/form/FormAction';
import { deleteTask } from './TasksRepository';
import { RouterAction } from '@/modules/shared/router/RouterActions';
import { useRouterAction } from '@/modules/shared/router/useRouterAction';

export interface DeleteTaskAlertDialogProps {
  readonly onOpenChange?: (open: boolean) => void;
  readonly open?: boolean;
  readonly id: string;
  readonly name: string;
  readonly routerActionOnSuccess: RouterAction;
  readonly trigger?: React.ReactNode;
}

export const DeleteTaskAlertDialog = ({
  id,
  name,
  open,
  onOpenChange,
  routerActionOnSuccess,
  trigger,
}: DeleteTaskAlertDialogProps) => {
  console.log('DeleteTaskAlertDialog() - trigger: ', trigger);
  const routerAction = useRouterAction(routerActionOnSuccess);

  const onFormSubmitted = () => {
    routerAction();
  };

  return (
    <AlertDialog
      open={open}
      confirmButtonLabel="Delete"
      dialogCopy={
        <span>
          Are you sure you want to delete <span className="font-semibold">{name}</span>?
        </span>
      }
      dialogTitle="Delete Task"
      onOpenChange={onOpenChange}
      onConfirmHandler="submit"
      renderBodyWrapper={(children: React.ReactNode) => (
        <FormAction action={deleteTask} onFormSubmitted={onFormSubmitted}>
          {({ response }) => (
            <>
              <input type="hidden" name="id" value={id} />
              {children}
              {response && response.errors && <ErrorList errors={response.errors} />}
            </>
          )}
        </FormAction>
      )}
      trigger={trigger}
    />
  );
};
