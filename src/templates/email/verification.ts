export const verification_email = (code: string) => `
<p>ative seu cadastro com esse código</p>
<br />
<p>${code}</p>
`;

export const verification_sms = (code: string) => `${code}`;
