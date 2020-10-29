import { getDisplayName } from '../display';

it('test getDisplayName', () => {
  const OPERATION_TYPE_LOAN = 'loan';
  const OPERATION_TYPES_LOAN_OBJ = {
    value: OPERATION_TYPE_LOAN,
    label: 'Loan',
  };
  const OPERATION_TYPES = [OPERATION_TYPES_LOAN_OBJ];
  expect(getDisplayName(OPERATION_TYPES, OPERATION_TYPE_LOAN)).toEqual(
    OPERATION_TYPES_LOAN_OBJ['label'],
  );
});
