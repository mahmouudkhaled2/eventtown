import {
  CustomDialog,
  CustomDialogContent,
  CustomDialogFooter,
  CustomDialogHeader,
  CustomDialogTitle,
  CustomDialogTrigger,
} from '@/components/shared/CustomDialog';
import { EditIcon } from '@/components/shared/Icons';
import MyTooltip from '@/components/shared/MyTooltip';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import CategoriesApi from '@/services/CategoriesApi';
import { Category } from '@/types/categories.types';
import { ValidationError } from '@/types/global.types';
import { AxiosError } from 'axios';
import { FC, useCallback, useEffect, useId, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

type EditCategoryDialogProps = {
  category: Category;
};

const EditCategoryDialog: FC<EditCategoryDialogProps> = ({ category }) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(category.title);
  const [error, setError] = useState('');
  const { mutate, isLoading } = useMutation(CategoriesApi.update, {
    onSuccess(data) {
      queryClient.invalidateQueries('categories');
      setOpen(false);
      setTitle(
        (data.data as unknown as { data: { title: string } }).data.title,
      );
      setError('');
    },
    onError(error) {
      const err = error as AxiosError<ValidationError>;
      setError(err.response?.data.errors[0].msg ?? 'Something went wrong');
    },
  });
  const [isValid, setIsValid] = useState(false);

  const isButtonDisabled =
    !isValid || isLoading || error.length > 0 || title === category.title;

  const validateName = (title: string) => {
    const trimmedName = title.trim();
    return trimmedName.length > 2 && trimmedName.length <= 30;
  };

  const reset = useCallback(() => {
    setTitle(category.title);
    setError('');
  }, [category.title]);

  const handleSubmit = () => {
    mutate({ data: { title }, id: category._id });
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value.slice(0, 30));
  };

  useEffect(() => {
    setIsValid(validateName(title));
    setError('');
  }, [title]);

  useEffect(() => {
    reset();
  }, [reset]);

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [reset, open]);

  return (
    <CustomDialog open={open} onOpenChange={setOpen}>
      <CustomDialogTrigger>
        <MyTooltip content="Edit" side="top" delayDuration={500}>
          <Button variant={'ghost'} size={'icon'}>
            <EditIcon className="size-5" />
          </Button>
        </MyTooltip>
      </CustomDialogTrigger>
      <CustomDialogContent className="sm:max-w-[425px]">
        <CustomDialogHeader>
          <CustomDialogTitle>Edit Category</CustomDialogTitle>
        </CustomDialogHeader>
        <Form title={title} error={error} handleOnChange={handleOnChange} />
        <CustomDialogFooter>
          <Button onClick={handleSubmit} disabled={isButtonDisabled}>
            {isLoading ? 'Editing...' : 'Edit'}
          </Button>
        </CustomDialogFooter>
      </CustomDialogContent>
    </CustomDialog>
  );
};

type FormProps = {
  title: string;
  error: string;
  // eslint-disable-next-line no-unused-vars
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Form: FC<FormProps> = ({ title, error, handleOnChange }) => {
  const id = useId();
  return (
    <div className="flex w-full items-center gap-4 p-4">
      <Label htmlFor={id} className="text-right">
        Name
      </Label>
      <div className="flex w-full flex-col gap-1">
        <Input
          id={id}
          defaultValue="New Category"
          onChange={handleOnChange}
          value={title}
        />
        {error && <span className="text-xs text-destructive">{error}</span>}
      </div>
    </div>
  );
};

export default EditCategoryDialog;
