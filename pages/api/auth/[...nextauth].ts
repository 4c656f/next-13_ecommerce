import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Sign in',
            // generate a suitable form on the sign in page.
            credentials: {
                username: {
                    label: 'Email',
                    type: 'email',
                    placeholder: 'hello@example.com'
                },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials, req) {


                return {id: '1', name: 'someNickname'}

            }
        })
    ]
};

export default NextAuth(authOptions);