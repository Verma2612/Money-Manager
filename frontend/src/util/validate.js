export const validateEmail =(email) =>{
if(email.trim()){
    const emailregex =/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailregex.test(email);
}
return false;
}