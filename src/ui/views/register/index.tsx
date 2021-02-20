import React, { useState, useMemo, useReducer, useEffect, useContext } from "react";
import dayjs from "client/time";

import * as i18n from "ui/i18n";
import { I18N, Translation } from "ui/i18n";


import { Link, Redirect } from "react-router-dom";

import { timeout } from "client/util";
import { fetch, XHRMethod } from "client/fetch";

import { Glyphicon } from "ui/components/common/glyphicon";
import { Modal } from "ui/components/modal";
import { Tooltip } from "ui/components/common/tooltip";
import { Spinner } from "ui/components/common/spinners/spinner";
import { FormGroup, FormLabel, FormInput, FormText, FormSelect, FormSelectOption, FormSelectGroup } from "ui/components/form";

import { validateUsername, validatePass, validateEmail } from "client/validation";

//import { calcPasswordStrength } from "./password";

type zxcvbn_fn = (input: string) => zxcvbn.ZXCVBNResult;

var zxcvbn: zxcvbn_fn | Promise<{ default: zxcvbn_fn }> = import('zxcvbn');

import { useTitle } from "ui/hooks/useTitle";

var PRELOADED: boolean = false;
function preloadLogin() {
    if(!PRELOADED) {
        import(/* webpackChunkName: 'LoginView' */ "../login");
        PRELOADED = true;
    }
}


/*
function chunkString(str: string, length: number) {
    return str.match(new RegExp('.{1,' + length + '}', 'g'));
}

const PASSWORDS = require("../../../../data/filter.json");

const fingerprint_length = PASSWORDS._fingerprintLength;
const chars_per_entry = fingerprint_length * PASSWORDS._element_size;
PASSWORDS._filter = chunkString(PASSWORDS._filter, chars_per_entry)?.map((e) => {
    let _elements = chunkString(e, fingerprint_length)?.map((f) => f.charAt(0) === '.' ? null : f);
    return {
        type: "Bucket",
        _size: PASSWORDS._element_size,
        _elements,
    }
});

import { CuckooFilter } from "bloom-filters";
const PASSWORD_FILTER: CuckooFilter = (CuckooFilter as any).fromJSON(PASSWORDS);
*/

const YEARS: string[] = [];
const CURRENT_YEAR = dayjs().year();
for(let i = 0; i < 100; i++) {
    YEARS.push((CURRENT_YEAR - 13 - i).toString());
}

interface IDob {
    y?: number,
    m?: number,
    d?: number | null,
}

interface RegisterState {
    dob: IDob,
    days: number,
    email: string,
    user: string,
    pass: string,
    pass_strength: number,
    valid_email: boolean | null,
    valid_user: boolean | null,
    valid_pass: boolean | null,
    is_registering: boolean,
}

const DEFAULT_REGISTER_STATE: RegisterState = {
    email: "",
    user: "",
    pass: "",
    dob: {},
    days: 31,
    pass_strength: 0,
    valid_email: null,
    valid_user: null,
    valid_pass: null,
    is_registering: false,
}

enum RegisterActionType {
    UpdateEmail,
    UpdateUser,
    UpdatePass,
    UpdatePassStrength,
    UpdateYear,
    UpdateMonth,
    UpdateDay,
    Register,
    NoRegister,
}

interface RegisterAction {
    value: string,
    type: RegisterActionType,
}

function calculateDays(dob: IDob): number {
    let num_days = dayjs(0).year(dob.y || 1970).month(dob.m || 11).daysInMonth();
    dob.d = (dob.d == null || num_days <= dob.d) ? null : dob.d;
    return num_days;
}

function calc_pass_strength(pwd: string): number {
    return typeof zxcvbn === 'function' ? Math.max(zxcvbn(pwd).score, 1) : 0;
}

function register_state_reducer(state: RegisterState, { value, type }: RegisterAction): RegisterState {
    switch(type) {
        case RegisterActionType.UpdateEmail: {
            return { ...state, email: value, valid_email: validateEmail(value) };
        }
        case RegisterActionType.UpdateUser: {
            value = value.trimStart();
            return { ...state, user: value, valid_user: validateUsername(value) };
        }
        case RegisterActionType.UpdatePass: {
            let valid_pass = validatePass(value);

            return {
                ...state,
                pass: value,
                valid_pass,
                pass_strength: valid_pass ? calc_pass_strength(value) : 0,
            };
        }
        case RegisterActionType.UpdatePassStrength: {
            return { ...state, pass_strength: state.pass && state.valid_pass ? calc_pass_strength(state.pass) : 0 };
        }
        case RegisterActionType.UpdateYear: {
            let dob = { ...state.dob, y: parseInt(value) };
            return { ...state, dob, days: calculateDays(dob) };
        }
        case RegisterActionType.UpdateMonth: {
            let dob = { ...state.dob, m: parseInt(value) };
            return { ...state, dob, days: calculateDays(dob) };
        }
        case RegisterActionType.UpdateDay: {
            let dob = { ...state.dob, d: parseInt(value) };
            return { ...state, dob };
        }
        case RegisterActionType.Register: {
            return { ...state, is_registering: true };
        }
        case RegisterActionType.NoRegister: {
            return { ...state, is_registering: false };
        }
        default: return state;
    }
}

import CircleEmptyInfo from "icons/glyphicons-pro/glyphicons-basic-2-4/svg/individual-svg/glyphicons-basic-196-circle-empty-info.svg";

import { Session } from "client/session";

var SETUP_THEN = false;

import "../login/login.scss";
import "./register.scss";
export default function RegisterView() {
    useTitle("Register");

    let [state, dispatch] = useReducer(register_state_reducer, DEFAULT_REGISTER_STATE);
    let [errorMsg, setErrorMsg] = useState<string | null>(null);
    let [redirect, setRedirect] = useState(false);
    let session = useContext(Session);

    useEffect(() => {
        if(!SETUP_THEN && typeof zxcvbn !== 'function') {
            zxcvbn.then(mod => {
                zxcvbn = mod.default;
                dispatch({ type: RegisterActionType.UpdatePassStrength, value: "" });
            });
            SETUP_THEN = true;
        }
    }, []);

    let passwordClass = useMemo(() => {
        let passwordClass: string = 'ln-password-';
        switch(state.pass_strength) {
            case 1: { passwordClass += 'weak'; break; }
            case 2: { passwordClass += 'mid'; break; }
            case 3: { passwordClass += 'strong'; break; }
            case 4: { passwordClass += 'vstrong'; break; }
            default: passwordClass += 'none';
        }
        return passwordClass;
    }, [state.pass_strength]);

    if(redirect) {
        return <Redirect to="/channels/0/0" />;
    }

    let on_submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch({ type: RegisterActionType.Register, value: '' });

        // start preloading
        let main = timeout(import("../main"), 4000).catch(() => { });

        let on_error = (err: string) => {
            setErrorMsg(err);
            dispatch({ type: RegisterActionType.NoRegister, value: '' });
        }

        fetch.submitFormUrlEncoded({
            url: "/api/v1/users",
            method: XHRMethod.POST,
            body: new FormData(e.currentTarget),
        }).then((req) => {
            if(req.status === 200 && req.response.auth != null) {
                main.then(() => {
                    session.setSession(req.response);
                    setRedirect(true);
                });
            } else {
                on_error("Unknown Error");
            }
        }).catch((e: XMLHttpRequest) => {
            on_error(e.response.message);
        });
    };

    let errorModal;

    if(errorMsg != null) {
        errorModal = (
            <Modal>
                <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, zIndex: 'inherit', backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
                    <div className="ln-center-standalone" style={{ color: 'white' }}>
                        {errorMsg}
                        <button onClick={() => setErrorMsg(null)}>Close</button>
                    </div>
                </div>
            </Modal>
        );
    }

    return (
        <form className="ln-form ln-login-form ln-register-form" onSubmit={on_submit}>
            <div id="title">
                <h2><I18N t={Translation.REGISTER} /></h2>
            </div>

            {errorModal}

            <FormGroup>
                <FormLabel htmlFor="email"><I18N t={Translation.EMAIL_ADDRESS} /></FormLabel>
                <FormInput value={state.email} type="email" name="email" placeholder="example@example.com" required isValid={state.valid_email}
                    onChange={e => dispatch({ type: RegisterActionType.UpdateEmail, value: e.currentTarget.value })} />
            </FormGroup>

            <FormGroup>
                <FormLabel htmlFor="username"><I18N t={Translation.USERNAME} /></FormLabel>
                <FormInput value={state.user} type="text" name="username" placeholder="username" required isValid={state.valid_user}
                    onChange={e => dispatch({ type: RegisterActionType.UpdateUser, value: e.currentTarget.value })} />
            </FormGroup>

            <FormGroup>
                <FormLabel htmlFor="password">
                    <I18N t={Translation.PASSWORD} />
                    <span className="ln-tooltip" style={{ marginLeft: '0.2em' }}>
                        <Glyphicon src={CircleEmptyInfo} />
                        <Tooltip x={1} y={0}>
                            <div style={{ width: 'min(100vw, 20em)', fontSize: '0.7em' }}>
                                <p>Password strength is judged by length, complexity and resemblance to common English words.</p>
                            </div>
                        </Tooltip>
                    </span>
                </FormLabel>
                <FormInput type="password" name="password" placeholder="password" required isValid={state.valid_pass}
                    className={passwordClass} onChange={e => dispatch({ type: RegisterActionType.UpdatePass, value: e.currentTarget.value })} />
                <FormText>
                    Password must be at least 8 characters long and contain at least one number or one special character.
                </FormText>
            </FormGroup>

            <FormGroup>
                <FormLabel><I18N t={Translation.DATE_OF_BIRTH} /></FormLabel>
                <FormSelectGroup>
                    <FormSelect name="year" required value={state.dob.y || ""} onChange={e => dispatch({ type: RegisterActionType.UpdateYear, value: e.currentTarget.value })}>
                        <I18N t={Translation.YEAR} render={(value: string) => <option disabled hidden value="">{value}</option>} />
                        {useMemo(() => YEARS.map((year, i) => <option value={year} key={i}>{year}</option>), [])}
                    </FormSelect>

                    <FormSelect name="month" required value={state.dob.m != null ? state.dob.m : ""} onChange={e => dispatch({ type: RegisterActionType.UpdateMonth, value: e.currentTarget.value })}>
                        <I18N t={Translation.MONTH} render={(value: string) => <option disabled hidden value="">{value}</option>} />
                        {useMemo(() => dayjs.months().map((month: string, i: number) => <option value={i} key={i}>{month}</option>), [dayjs.locale()])}
                    </FormSelect>

                    <FormSelect name="day" required onChange={e => dispatch({ type: RegisterActionType.UpdateDay, value: e.currentTarget.value })}
                        value={state.dob.d == null ? "" : state.dob.d}>
                        <I18N t={Translation.DAY} render={(value: string) => <option disabled hidden value="">{value}</option>} />
                        {useMemo(() => (new Array(state.days)).fill(undefined).map((_, i) => (
                            <option value={i} key={i}>{(i + 1).toString()}</option>
                        )), [state.days])}
                    </FormSelect>
                </FormSelectGroup>
            </FormGroup>

            <hr />

            <FormGroup>
                <div style={{ display: 'flex', padding: '0 1em' }}>
                    <button className={state.is_registering ? 'ln-btn ln-btn--loading-icon' : 'ln-btn'} style={{ marginRight: 'auto' }}>
                        {state.is_registering ? <Spinner size="2em" /> : "Register"}
                    </button>
                    <Link to={"/login"} className="ln-btn" onMouseOver={() => preloadLogin()} >Go to Login</Link>
                </div>
            </FormGroup>

            <FormGroup>
                <FormText>
                    By registering, you agree to our
                </FormText>
            </FormGroup>
        </form>
    );
}

if(process.env.NODE_ENV !== 'production') {
    RegisterView.displayName = "RegisterView";
}