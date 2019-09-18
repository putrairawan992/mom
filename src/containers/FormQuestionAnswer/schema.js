import * as yup from "yup";
import strings from "../../localization";


export const schema = yup.object().shape({
    question: yup.string().required(strings.validation_required_address_name),
    answer: yup.string().required(strings.validation_required_receiver)
})