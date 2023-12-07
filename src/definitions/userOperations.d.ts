declare interface NewUser {
    name: string
    address: string
    number: string
    cep: string
    adjunct: string
    email: string
    whatsapp: string
}

declare interface Referral {
    name: string
    email: string
    whatsapp: string
}

declare interface ReferralForm {
    referrals: Referral[]
    referree_id: number
}

declare interface VerifyForm {
    id: number
    code: string
}

declare interface ChooseDateForm {
    date: string

    user_id: number
}
