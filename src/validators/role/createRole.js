import {check} from 'express-validator';

export const createValidate = () => {
    return [
        check('name', 'name does not Empty').not().isEmpty(),
    ];
}