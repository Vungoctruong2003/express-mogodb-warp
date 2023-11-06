import {check} from 'express-validator';

export const createValidate = () => {
    return [
        check('user_id', 'user_id does not Empty').not().isEmpty(),
        check('roles', 'roles does not Empty').not().isEmpty(),
    ];
}