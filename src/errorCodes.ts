export enum FirebaseErrorCode {
  InvalidCredential = 'auth/invalid-credential',
  ErrorInUse = 'auth/email-already-in-use',
  TooManyRequests = 'auth/too-many-requests',
}

export const errorMessageByCode: {
  [key in FirebaseErrorCode]: string;
} = {
  [FirebaseErrorCode.InvalidCredential]:
    'Invalid credential. Please try again late',
  [FirebaseErrorCode.ErrorInUse]:
    'The provided email is already in use by an existing user',
  [FirebaseErrorCode.TooManyRequests]:
    'The number of requests exceeds the maximum allowed. Please try again late',
};

type ErrorCode = FirebaseErrorCode | undefined;

export const getErrorMessageByCode = (code: ErrorCode): string =>
  code ? errorMessageByCode[code] : 'Unexpected error';
