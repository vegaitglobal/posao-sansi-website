export interface Faq{
    id: number,
    created: string,
    modified: string,
    question: string,
    question_en: string,
    question_sr_latn: string,
    answer: string,
    answer_en: string,
    answer_sr_latn: string,
    display_to_anonymous: boolean,
    display_to_employers: boolean,
    display_to_applicants: boolean
}