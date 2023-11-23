'use client';

import 'client-only';
import { useContext } from 'react';
import { ErrorList } from '@/modules/shared/errors/ErrorList';
import { FormContext } from './Form';

export const FormErrorList = () => {
  const { response } = useContext(FormContext);
  if (!response || !response.errors) return null;

  return <ErrorList errors={response.errors} />;
};
