import type { BaseTranslation } from "../i18n-types";

// @stringify
const enUS: BaseTranslation = {
	DEV_BANNER: "This is a development build.",
	YEAR: "Year",
	MONTH: "Month",
	DAY: "Day",
	REGISTER: "Register",
	LOGIN: "Login",
	EMAIL_ADDRESS: "Email Address",
	USERNAME: "Username",
	USERNAME_OR_EMAIL: "Username or Email",
	NICKNAME: "Nickname",
	PASSWORD: "Password",
	RESET: "Reset",
	DATE_OF_BIRTH: "Date of Birth",
	NETWORK_ERROR: "Network Error",
	UNKNOWN_ERROR: "Unknown Error",
	MFA_TOGGLE_TEXT: "{{h:Don't have|Have}} a 2FA code?",
	MFA_TOGGLE_FLAVOR: "Click here to {{h:hide|show}} the input.",
	MFA_CODE: "2FA Code",
	GOTO_LOGIN: "Go to Login",
	REGISTER_AGREE: "By registering, you agree to our... this will be filled in later.",
	PASSWORD_REQS: "Password must be at least 8 characters long and contain at least one number or one special character.",
	CHANGE_THEME: "Change Theme",
	CHANGE_THEME_TEMP: "Change Theme Temperature",
	CHANGE_LANG: "Change Language",
	LOADING: "Loading...",

	DEFAULT_TS_FORMAT: "dddd, MMMM Do, YYYY LT",
	CALENDAR_FORMAT: {
		lastDay: "[Yesterday at] LT",
		sameDay: "[Today at] LT",
		nextDay: "[Tomorrow at] LT",
		nextWeek: "dddd [at] LT",
		lastWeek: "[Last] dddd [at] LT",
		sameElse: "L"
	},
	// this is one sentence, split by HTML
	hCaptcha: "This site is protected by hCaptcha and its <@Privacy Policy> and <#Terms of Service> apply.",

	// units/dimensions
	units: {
		PX: "{0}px",
	}
};

export default enUS;
