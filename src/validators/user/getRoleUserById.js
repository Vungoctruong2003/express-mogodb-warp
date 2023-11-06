import {check} from 'express-validator';

export const getRoleUserByIdValidate = () => {
    return [
        check('user_id', 'id does not Empty').not().isEmpty(),
    ];
}