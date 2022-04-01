import type { BaseTranslation } from '../i18n-types';

import 'dayjs/locale/es';

export default {
    CHANNEL: "Habitación",
    PARTY: "Fiesta",
    DIRECT_MESSAGE: "Mensaje Directo",
    CREATE_DIRECT_MESSAGE: "Crear Mensaje Directo",
    YEAR: "Año",
    MONTH: "Mes",
    DAY: "Día",
    MONTHS: "Enero,Febrero,Marzo,Abril,Mayo,Junio,Julio,Agosto,Septiembre,Octubre,Noviembre,Diciembre",
    REGISTER: "Registro",
    LOGIN: "Acceso",
    EMAIL_ADDRESS: "Dirección de correo electrónico",
    USERNAME: "Nombre de usuario",
    USERNAME_OR_EMAIL: "Nombre de usuario o correo electrónico",
    NICKNAME: "Apodo",
    PASSWORD: "Clave",
    RESET: "Reiniciar",
    DATE_OF_BIRTH: "Fecha de nacimiento",
    NETWORK_ERROR: "Error de red",
    UNKNOWN_ERROR: "Error desconocido",
    MFA_TOGGLE_TEXT: "¿{h|{true: No tienes, false: Tiene}} un código 2FA?",
    MFA_TOGGLE_FLAVOR: "Haga clic aquí para {h|{true: ocultar, false: mostrar}} a entrada.",
    MFA_CODE: "Código 2FA",
    GOTO_LOGIN: "Ir a Iniciar sesión",
    REGISTER_AGREE: "Al registrarse, acepta nuestros... esto se completará más adelante.",
    PASSWORD_REQS: "La contraseña debe tener al menos 8 caracteres y contener al menos un número o un carácter especial."
} as BaseTranslation;
