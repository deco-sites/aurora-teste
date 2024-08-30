export const PhoneMask = (phone: string): string => {
  phone = phone.replace(/\D/g, "");

  if (phone.length > 11) {
    phone = phone.substring(0, 11);
  }

  phone = phone.replace(/^(\d{2})(\d)/, "($1) $2");
  phone = phone.replace(/^(\(\d{2}\))(\d)/, "$1 $2");
  phone = phone.replace(/^(\(\d{2}\) \d)(\d{4})(\d)/, "$1 $2-$3");

  return phone;
};
