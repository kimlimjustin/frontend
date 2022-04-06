// This file was auto-generated by 'typesafe-i18n'. Any manual changes will be overwritten.
/* eslint-disable */
import type { BaseTranslation as BaseTranslationType, LocalizedString, RequiredParams } from 'typesafe-i18n'

export type BaseTranslation = BaseTranslationType & DisallowNamespaces
export type BaseLocale = 'en-US'

export type Locales =
	| 'en-GB'
	| 'en-US'
	| 'es'
	| 'owo'

export type Translation = RootTranslation & DisallowNamespaces

export type Translations = RootTranslation &
{
	main: NamespaceMainTranslation
}

type RootTranslation = {
	/**
	 * This is a development build.
	 */
	DEV_BANNER: string
	/**
	 * Year
	 */
	YEAR: string
	/**
	 * Month
	 */
	MONTH: string
	/**
	 * Day
	 */
	DAY: string
	/**
	 * Register
	 */
	REGISTER: string
	/**
	 * Login
	 */
	LOGIN: string
	/**
	 * Email Address
	 */
	EMAIL_ADDRESS: string
	/**
	 * Username
	 */
	USERNAME: string
	/**
	 * Username or Email
	 */
	USERNAME_OR_EMAIL: string
	/**
	 * Nickname
	 */
	NICKNAME: string
	/**
	 * Password
	 */
	PASSWORD: string
	/**
	 * Reset
	 */
	RESET: string
	/**
	 * Date of Birth
	 */
	DATE_OF_BIRTH: string
	/**
	 * Network Error
	 */
	NETWORK_ERROR: string
	/**
	 * Unknown Error
	 */
	UNKNOWN_ERROR: string
	/**
	 * {{Don't have|Have}} a 2FA code?
	 */
	MFA_TOGGLE_TEXT: string
	/**
	 * Click here to {{hide|show}} the input.
	 */
	MFA_TOGGLE_FLAVOR: string
	/**
	 * 2FA Code
	 */
	MFA_CODE: string
	/**
	 * Go to Login
	 */
	GOTO_LOGIN: string
	/**
	 * By registering, you agree to our... this will be filled in later.
	 */
	REGISTER_AGREE: string
	/**
	 * Password must be at least 8 characters long and contain at least one number or one special character.
	 */
	PASSWORD_REQS: string
	/**
	 * Change Theme
	 */
	CHANGE_THEME: string
	/**
	 * Change Theme Temperature
	 */
	CHANGE_THEME_TEMP: string
	/**
	 * Change Language
	 */
	CHANGE_LANG: string
	/**
	 * Loading...
	 */
	LOADING: string
	/**
	 * dddd, MMMM Do, YYYY LT
	 */
	DEFAULT_TS_FORMAT: string
	CALENDAR_FORMAT: {
		/**
		 * [Yesterday at] LT
		 */
		lastDay: string
		/**
		 * [Today at] LT
		 */
		sameDay: string
		/**
		 * [Tomorrow at] LT
		 */
		nextDay: string
		/**
		 * dddd [at] LT
		 */
		nextWeek: string
		/**
		 * [Last] dddd [at] LT
		 */
		lastWeek: string
		/**
		 * L
		 */
		sameElse: string
	}
	/**
	 * This site is protected by hCaptcha and its <@Privacy Policy> and <#Terms of Service> apply.
	 */
	hCaptcha: string
	units: {
		/**
		 * {0}px
		 * @param {unknown} 0
		 */
		PX: RequiredParams<'0'>
	}
}

export type NamespaceMainTranslation = {
	/**
	 * Channel
	 */
	CHANNEL: string
	/**
	 * Party
	 */
	PARTY: string
	/**
	 * Direct Message
	 */
	DIRECT_MESSAGE: string
	/**
	 * Create Direct Message
	 */
	CREATE_DIRECT_MESSAGE: string
	/**
	 * {{✔|}} Bot
	 */
	BOT: string
	/**
	 * Online
	 */
	ONLINE: string
	/**
	 * Offline
	 */
	OFFLINE: string
	/**
	 * Busy/Do Not Disturb
	 */
	BUSY: string
	/**
	 * Away
	 */
	AWAY: string
	/**
	 * Message
	 */
	MESSAGE: string
	/**
	 * Settings
	 */
	SETTINGS: string
	/**
	 * Mute
	 */
	MUTE: string
	/**
	 * Unmute
	 */
	UNMUTE: string
	/**
	 * Deafen
	 */
	DEAFEN: string
	/**
	 * Undeafen
	 */
	UNDEAFEN: string
	/**
	 * Edited
	 */
	EDITED: string
	/**
	 * Edited on {ts}
	 * @param {string} ts
	 */
	EDITED_ON: RequiredParams<'ts'>
	/**
	 * Pinned
	 */
	PINNED: string
	/**
	 * Message Pinned
	 */
	MESSAGE_PINNED: string
	/**
	 * Click to reveal spoiler
	 */
	SPOILER_TITLE: string
	/**
	 * Owner
	 */
	OWNER: string
	/**
	 * You're viewing older messages.
	 */
	VIEWING_OLDER: string
	/**
	 * Go to now
	 */
	GOTO_NOW: string
	USERS_TYPING: {
		/**
		 * {0} is typing...
		 * @param {string} 0
		 */
		'0': RequiredParams<'0'>
		/**
		 * {0} and {1} are typing...
		 * @param {string} 0
		 * @param {string} 1
		 */
		'1': RequiredParams<'0' | '1'>
		/**
		 * {0}, {1}, and {2} are typing...
		 * @param {string} 0
		 * @param {string} 1
		 * @param {string} 2
		 */
		'2': RequiredParams<'0' | '1' | '2'>
		/**
		 * {0}, {1}, {2}, and {3} others are typing...
		 * @param {string} 0
		 * @param {string} 1
		 * @param {string} 2
		 * @param {number} 3
		 */
		'3': RequiredParams<'0' | '1' | '2' | '3'>
	}
	menus: {
		/**
		 * Copy ID
		 */
		COPY_ID: string
		/**
		 * Mark as Read
		 */
		MARK_AS_READ: string
		/**
		 * Invite People
		 */
		INVITE_PEOPLE: string
		msg: {
			/**
			 * Delete Message
			 */
			DELETE: string
			/**
			 * Are you sure?
			 */
			CONFIRM: string
			/**
			 * Edit Message
			 */
			EDIT: string
			/**
			 * Copy Message
			 */
			COPY: string
			/**
			 * Copy Selection
			 */
			COPY_SEL: string
			/**
			 * Report Message
			 */
			REPORT: string
		}
		room: {
			/**
			 * Edit Channel
			 */
			EDIT: string
		}
		room_list: {
			/**
			 * Create Channel
			 */
			CREATE: string
		}
	}
	member_list: {
		/**
		 * {role} – {length}
		 * @param {number} length
		 * @param {string} role
		 */
		ROLE: RequiredParams<'length' | 'role'>
	}
	settings: {
		/**
		 * Account
		 */
		ACCOUNT: string
		/**
		 * Profile
		 */
		PROFILE: string
		/**
		 * Privacy
		 */
		PRIVACY: string
		/**
		 * Notifications
		 */
		NOTIFICATIONS: string
		/**
		 * Appearance
		 */
		APPEARANCE: string
		/**
		 * Accessibility
		 */
		ACCESSIBILITY: string
		/**
		 * Text & Media
		 */
		TEXT_AND_MEDIA: string
		/**
		 * Language
		 */
		LANGUAGE: string
		/**
		 * Logout
		 */
		LOGOUT: string
		/**
		 * Return
		 */
		RETURN: string
		/**
		 * Select any category to view settings
		 */
		SELECT_CATEGORY: string
		account: {
			/**
			 * {used}/{total} ({percent}) Upload Quota Used
			 * @param {string} percent
			 * @param {string} total
			 * @param {string} used
			 */
			QUOTA: RequiredParams<'percent' | 'total' | 'used'>
			/**
			 * Enable Developer Mode
			 */
			DEV_MODE: string
		}
		appearance: {
			/**
			 * Theme
			 */
			THEME: string
			/**
			 * Show Lines Between Groups
			 */
			GROUP_LINES: string
			/**
			 * Group Padding
			 */
			GROUP_PADDING: string
			/**
			 * Light Theme
			 */
			LIGHT_THEME: string
			/**
			 * Dark Theme
			 */
			DARK_THEME: string
			/**
			 * Enable OLED Dark Theme
			 */
			OLED_THEME: string
			/**
			 * Temperature
			 */
			TEMP: string
			/**
			 * View Mode
			 */
			VIEW_MODE: string
			/**
			 * Compact
			 */
			COMPACT: string
			/**
			 * Cozy
			 */
			COZY: string
			/**
			 * "The wizard quickly jinxed the gnomes before they vaporized."
			 */
			FONT_EXAMPLE: string
			/**
			 * Chat Font Size
			 */
			CHAT_FONT_SIZE: string
			/**
			 * UI Font Size
			 */
			UI_FONT_SIZE: string
			/**
			 * Chat Font Family
			 */
			CHAT_FONT_FAMILY: string
			/**
			 * UI Font Family
			 */
			UI_FONT_FAMILY: string
		}
		notifications: {
			ENABLE_DESKTOP_NOTIFICATIONS: {
				/**
				 * Enable Desktop Notifications
				 */
				'0': string
				/**
				 * Enable Desktop Notifications (May be outdated if revoked externally)
				 */
				'1': string
				/**
				 * Enable Desktop Notifications (Not Available)
				 */
				'2': string
			}
		}
		media: {
			/**
			 * Mute Media by Default
			 */
			MUTE_MEDIA: string
			/**
			 * Disable Attachments of Unknown Size
			 */
			HIDE_UNKNOWN: string
			/**
			 * Use Platform Emojis
			 */
			USE_PLATFORM_EMOJIS: string
			/**
			 * Enable Spellcheck
			 */
			ENABLE_SPELLCHECK: string
		}
		accessibility: {
			/**
			 * Reduce Motion
			 */
			REDUCE_MOTION: string
			/**
			 * Pause GIFs on Unfocus
			 */
			UNFOCUS_PAUSE: string
		}
	}
}

export type Namespaces =
	| 'main'

type DisallowNamespaces = {
	/**
	 * reserved for 'main'-namespace\
	 * you need to use the `./main/index.ts` file instead
	 */
	main?: "[typesafe-i18n] reserved for 'main'-namespace. You need to use the `./main/index.ts` file instead."
}

export type TranslationFunctions = {
	/**
	 * This is a development build.
	 */
	DEV_BANNER: () => LocalizedString
	/**
	 * Year
	 */
	YEAR: () => LocalizedString
	/**
	 * Month
	 */
	MONTH: () => LocalizedString
	/**
	 * Day
	 */
	DAY: () => LocalizedString
	/**
	 * Register
	 */
	REGISTER: () => LocalizedString
	/**
	 * Login
	 */
	LOGIN: () => LocalizedString
	/**
	 * Email Address
	 */
	EMAIL_ADDRESS: () => LocalizedString
	/**
	 * Username
	 */
	USERNAME: () => LocalizedString
	/**
	 * Username or Email
	 */
	USERNAME_OR_EMAIL: () => LocalizedString
	/**
	 * Nickname
	 */
	NICKNAME: () => LocalizedString
	/**
	 * Password
	 */
	PASSWORD: () => LocalizedString
	/**
	 * Reset
	 */
	RESET: () => LocalizedString
	/**
	 * Date of Birth
	 */
	DATE_OF_BIRTH: () => LocalizedString
	/**
	 * Network Error
	 */
	NETWORK_ERROR: () => LocalizedString
	/**
	 * Unknown Error
	 */
	UNKNOWN_ERROR: () => LocalizedString
	/**
	 * {{Don't have|Have}} a 2FA code?
	 */
	MFA_TOGGLE_TEXT: (arg: { h: string | number | boolean }) => LocalizedString
	/**
	 * Click here to {{hide|show}} the input.
	 */
	MFA_TOGGLE_FLAVOR: (arg: { h: string | number | boolean }) => LocalizedString
	/**
	 * 2FA Code
	 */
	MFA_CODE: () => LocalizedString
	/**
	 * Go to Login
	 */
	GOTO_LOGIN: () => LocalizedString
	/**
	 * By registering, you agree to our... this will be filled in later.
	 */
	REGISTER_AGREE: () => LocalizedString
	/**
	 * Password must be at least 8 characters long and contain at least one number or one special character.
	 */
	PASSWORD_REQS: () => LocalizedString
	/**
	 * Change Theme
	 */
	CHANGE_THEME: () => LocalizedString
	/**
	 * Change Theme Temperature
	 */
	CHANGE_THEME_TEMP: () => LocalizedString
	/**
	 * Change Language
	 */
	CHANGE_LANG: () => LocalizedString
	/**
	 * Loading...
	 */
	LOADING: () => LocalizedString
	/**
	 * dddd, MMMM Do, YYYY LT
	 */
	DEFAULT_TS_FORMAT: () => LocalizedString
	CALENDAR_FORMAT: {
		/**
		 * [Yesterday at] LT
		 */
		lastDay: () => LocalizedString
		/**
		 * [Today at] LT
		 */
		sameDay: () => LocalizedString
		/**
		 * [Tomorrow at] LT
		 */
		nextDay: () => LocalizedString
		/**
		 * dddd [at] LT
		 */
		nextWeek: () => LocalizedString
		/**
		 * [Last] dddd [at] LT
		 */
		lastWeek: () => LocalizedString
		/**
		 * L
		 */
		sameElse: () => LocalizedString
	}
	/**
	 * This site is protected by hCaptcha and its <@Privacy Policy> and <#Terms of Service> apply.
	 */
	hCaptcha: () => LocalizedString
	units: {
		/**
		 * {0}px
		 */
		PX: (arg0: unknown) => LocalizedString
	}
	main: {
		/**
		 * Channel
		 */
		CHANNEL: () => LocalizedString
		/**
		 * Party
		 */
		PARTY: () => LocalizedString
		/**
		 * Direct Message
		 */
		DIRECT_MESSAGE: () => LocalizedString
		/**
		 * Create Direct Message
		 */
		CREATE_DIRECT_MESSAGE: () => LocalizedString
		/**
		 * {{✔|}} Bot
		 */
		BOT: (arg: { verified: string | number | boolean }) => LocalizedString
		/**
		 * Online
		 */
		ONLINE: () => LocalizedString
		/**
		 * Offline
		 */
		OFFLINE: () => LocalizedString
		/**
		 * Busy/Do Not Disturb
		 */
		BUSY: () => LocalizedString
		/**
		 * Away
		 */
		AWAY: () => LocalizedString
		/**
		 * Message
		 */
		MESSAGE: () => LocalizedString
		/**
		 * Settings
		 */
		SETTINGS: () => LocalizedString
		/**
		 * Mute
		 */
		MUTE: () => LocalizedString
		/**
		 * Unmute
		 */
		UNMUTE: () => LocalizedString
		/**
		 * Deafen
		 */
		DEAFEN: () => LocalizedString
		/**
		 * Undeafen
		 */
		UNDEAFEN: () => LocalizedString
		/**
		 * Edited
		 */
		EDITED: () => LocalizedString
		/**
		 * Edited on {ts}
		 */
		EDITED_ON: (arg: { ts: string }) => LocalizedString
		/**
		 * Pinned
		 */
		PINNED: () => LocalizedString
		/**
		 * Message Pinned
		 */
		MESSAGE_PINNED: () => LocalizedString
		/**
		 * Click to reveal spoiler
		 */
		SPOILER_TITLE: () => LocalizedString
		/**
		 * Owner
		 */
		OWNER: () => LocalizedString
		/**
		 * You're viewing older messages.
		 */
		VIEWING_OLDER: () => LocalizedString
		/**
		 * Go to now
		 */
		GOTO_NOW: () => LocalizedString
		USERS_TYPING: {
			/**
			 * {0} is typing...
			 */
			'0': (arg0: string) => LocalizedString
			/**
			 * {0} and {1} are typing...
			 */
			'1': (arg0: string, arg1: string) => LocalizedString
			/**
			 * {0}, {1}, and {2} are typing...
			 */
			'2': (arg0: string, arg1: string, arg2: string) => LocalizedString
			/**
			 * {0}, {1}, {2}, and {3} others are typing...
			 */
			'3': (arg0: string, arg1: string, arg2: string, arg3: number) => LocalizedString
		}
		menus: {
			/**
			 * Copy ID
			 */
			COPY_ID: () => LocalizedString
			/**
			 * Mark as Read
			 */
			MARK_AS_READ: () => LocalizedString
			/**
			 * Invite People
			 */
			INVITE_PEOPLE: () => LocalizedString
			msg: {
				/**
				 * Delete Message
				 */
				DELETE: () => LocalizedString
				/**
				 * Are you sure?
				 */
				CONFIRM: () => LocalizedString
				/**
				 * Edit Message
				 */
				EDIT: () => LocalizedString
				/**
				 * Copy Message
				 */
				COPY: () => LocalizedString
				/**
				 * Copy Selection
				 */
				COPY_SEL: () => LocalizedString
				/**
				 * Report Message
				 */
				REPORT: () => LocalizedString
			}
			room: {
				/**
				 * Edit Channel
				 */
				EDIT: () => LocalizedString
			}
			room_list: {
				/**
				 * Create Channel
				 */
				CREATE: () => LocalizedString
			}
		}
		member_list: {
			/**
			 * {role} – {length}
			 */
			ROLE: (arg: { length: number, role: string }) => LocalizedString
		}
		settings: {
			/**
			 * Account
			 */
			ACCOUNT: () => LocalizedString
			/**
			 * Profile
			 */
			PROFILE: () => LocalizedString
			/**
			 * Privacy
			 */
			PRIVACY: () => LocalizedString
			/**
			 * Notifications
			 */
			NOTIFICATIONS: () => LocalizedString
			/**
			 * Appearance
			 */
			APPEARANCE: () => LocalizedString
			/**
			 * Accessibility
			 */
			ACCESSIBILITY: () => LocalizedString
			/**
			 * Text & Media
			 */
			TEXT_AND_MEDIA: () => LocalizedString
			/**
			 * Language
			 */
			LANGUAGE: () => LocalizedString
			/**
			 * Logout
			 */
			LOGOUT: () => LocalizedString
			/**
			 * Return
			 */
			RETURN: () => LocalizedString
			/**
			 * Select any category to view settings
			 */
			SELECT_CATEGORY: () => LocalizedString
			account: {
				/**
				 * {used}/{total} ({percent}) Upload Quota Used
				 */
				QUOTA: (arg: { percent: string, total: string, used: string }) => LocalizedString
				/**
				 * Enable Developer Mode
				 */
				DEV_MODE: () => LocalizedString
			}
			appearance: {
				/**
				 * Theme
				 */
				THEME: () => LocalizedString
				/**
				 * Show Lines Between Groups
				 */
				GROUP_LINES: () => LocalizedString
				/**
				 * Group Padding
				 */
				GROUP_PADDING: () => LocalizedString
				/**
				 * Light Theme
				 */
				LIGHT_THEME: () => LocalizedString
				/**
				 * Dark Theme
				 */
				DARK_THEME: () => LocalizedString
				/**
				 * Enable OLED Dark Theme
				 */
				OLED_THEME: () => LocalizedString
				/**
				 * Temperature
				 */
				TEMP: () => LocalizedString
				/**
				 * View Mode
				 */
				VIEW_MODE: () => LocalizedString
				/**
				 * Compact
				 */
				COMPACT: () => LocalizedString
				/**
				 * Cozy
				 */
				COZY: () => LocalizedString
				/**
				 * "The wizard quickly jinxed the gnomes before they vaporized."
				 */
				FONT_EXAMPLE: () => LocalizedString
				/**
				 * Chat Font Size
				 */
				CHAT_FONT_SIZE: () => LocalizedString
				/**
				 * UI Font Size
				 */
				UI_FONT_SIZE: () => LocalizedString
				/**
				 * Chat Font Family
				 */
				CHAT_FONT_FAMILY: () => LocalizedString
				/**
				 * UI Font Family
				 */
				UI_FONT_FAMILY: () => LocalizedString
			}
			notifications: {
				ENABLE_DESKTOP_NOTIFICATIONS: {
					/**
					 * Enable Desktop Notifications
					 */
					'0': () => LocalizedString
					/**
					 * Enable Desktop Notifications (May be outdated if revoked externally)
					 */
					'1': () => LocalizedString
					/**
					 * Enable Desktop Notifications (Not Available)
					 */
					'2': () => LocalizedString
				}
			}
			media: {
				/**
				 * Mute Media by Default
				 */
				MUTE_MEDIA: () => LocalizedString
				/**
				 * Disable Attachments of Unknown Size
				 */
				HIDE_UNKNOWN: () => LocalizedString
				/**
				 * Use Platform Emojis
				 */
				USE_PLATFORM_EMOJIS: () => LocalizedString
				/**
				 * Enable Spellcheck
				 */
				ENABLE_SPELLCHECK: () => LocalizedString
			}
			accessibility: {
				/**
				 * Reduce Motion
				 */
				REDUCE_MOTION: () => LocalizedString
				/**
				 * Pause GIFs on Unfocus
				 */
				UNFOCUS_PAUSE: () => LocalizedString
			}
		}
	}
}

export type Formatters = {}
