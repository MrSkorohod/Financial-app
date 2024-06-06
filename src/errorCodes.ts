export enum CommonErrorCode {
  UnexpectedErr = 'unexpected-error',
}
export enum FirebaseErrorCode {
  InvalidCredential = 'auth/invalid-credential',
  ErrorInUse = 'auth/email-already-in-use',
  TooManyRequests = 'auth/too-many-requests',
}

export const errorMessageByCode: {
  [key in FirebaseErrorCode]: string;
} & {
  [key in CommonErrorCode]: string;
} = {
  [FirebaseErrorCode.InvalidCredential]: 'ErrorMessages.InvalidCredential',
  [FirebaseErrorCode.ErrorInUse]: 'ErrorMessages.ErrorInUse',
  [FirebaseErrorCode.TooManyRequests]: 'ErrorMessages.TooManyRequests',
  [CommonErrorCode.UnexpectedErr]: 'ErrorMessages.UnexpectedErr',
};

type ErrorCode = FirebaseErrorCode | CommonErrorCode | undefined;

export const getErrorMessageByCode = (code: ErrorCode): string =>
  code ? errorMessageByCode[code] : CommonErrorCode.UnexpectedErr;
