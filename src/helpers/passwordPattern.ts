import passwordValidator from "password-validator";

export const passwordPattern = (min: number, max: number, uppercase: number, lowercase: number, digits: number, symbols?: number) => {
    try {
        const schema = new passwordValidator();

        schema
            .is().min(min)
            .is().max(max)
            .has().uppercase(uppercase)
            .has().lowercase(lowercase)
            .has().digits(digits)
            .has().not().spaces()
        symbols && schema.has().symbols(symbols);

        return schema;
    } catch (error: any) {
        throw new Error(error.message);
    }
}