export interface UserCredentials {
    username: string;
    password: string;
    description?: string; // Optional field for test case descriptions
}

export interface User {
    standard: UserCredentials;
    locked: UserCredentials;
    invalid: UserCredentials;
    empty: UserCredentials;
    whitespace: UserCredentials;
}

export const users: User = {
    standard: {
        username: process.env.STANDARD_USER || 'standard_user',
        password: process.env.STANDARD_PASSWORD || 'secret_sauce',
        description: 'A standard user with valid credentials'
    },
    locked: {
        username: process.env.LOCKED_USER || 'locked_out_user',
        password: process.env.LOCKED_PASSWORD || 'secret_sauce',
        description: 'A locked out user who cannot log in'
    },
    invalid: {
        username: process.env.INVALID_USER || 'invalid_user',
        password: process.env.INVALID_PASSWORD || 'wrong_password',
        description: 'An invalid user with incorrect credentials'
    },
    empty: {
        username: process.env.EMPTY_USER || '',
        password: process.env.EMPTY_PASSWORD || '',
        description: 'A user with empty credentials'
    },
    whitespace: {
        username: ' standard_user ',
        password: ' secret_sauce ',
        description: 'A user with leading/trailing whitespace in credentials'
    }
};