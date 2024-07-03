const { body, validationResult } = require("express-validator");

const photoInsertValidation = () => {
    return [
        body("title")
            .notEmpty()
            .withMessage("O título é obrigatório")
            .isString()
            .withMessage("O título deve ser uma string")
            .isLength({ min: 3 })
            .withMessage("O título deve ter no mínimo 3 caracteres"),

        body("image").custom((value, { req }) => {
            if (!req.file) {
                throw new Error("A imagem é obrigatória");
            }
            return true;
        }),
    ];
};

const photoUpdateValidation = () => {
    return [
        body("title")
            .optional()
            .isString()
            .withMessage("O titulo é obrigatorio")
            .isLength({ min: 3 })
            .withMessage("O título deve ter no mínimo 3 caracteres"),
    ];
};

const photoCommentValidation = () => {
    return [
        body("comment")
            .isString()
            .withMessage("O comentario é obrigatorio")
    ];
};

module.exports = {
    photoInsertValidation, 
    photoUpdateValidation, 
    photoCommentValidation,
};
