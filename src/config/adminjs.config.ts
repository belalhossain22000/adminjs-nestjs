import { AdminModuleOptions } from '@adminjs/nestjs';
import { User } from '../modules/user/entities/user.entity';
import { Admin } from '../modules/admin/entities/admin.entity';

const DEFAULT_ADMIN = {
    email: 'belalhossain22000@gmail.com',
    password: '123456',
};

export const adminJsConfig: AdminModuleOptions = {
    adminJsOptions: {
        rootPath: '/admin',
        resources: [
            {
                resource: User,
                options: {},
            },
            {
                resource: Admin,
                options: {},
            },
        ],
        branding: {
            companyName: 'Green Admin Panel',
            withMadeWithLove: false,
            theme: {
                colors: {
                    primary: '#10b981',
                    primary100: '#10b981',
                    primary80: '#059669',
                    primary60: '#047857',
                    primary40: '#065f46',
                    primary20: '#064e3b',
                    accent: '#10b981',
                    bg: '#ffffff',
                    text: '#1f2937',
                },
            },
        },
    },
    auth: {
        authenticate: async (email, password) => {
            if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
                return { email: DEFAULT_ADMIN.email };
            }
            return null;
        },
        cookieName: 'adminjs',
        cookiePassword: 'super-secret-and-very-long-password-for-adminjs-cookie',
    },
    sessionOptions: {
        resave: true,
        saveUninitialized: true,
        secret: 'super-secret-and-very-long-session-secret-for-adminjs',
    },
};
