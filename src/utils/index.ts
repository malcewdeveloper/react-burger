import { CookieProps } from "../types";

export async function checkResponse(response: Response) {
    if (response.ok) {
        return response.json();
    }

    if (response.status === 403 || response.status === 401) {
        const error = await response.json();

        return Promise.reject(error);
    }

    return Promise.reject(`Ошибка ${response.status}`);
}

export function getFormData<T>(formData: FormData): T {
    const result: Record<string, any> = {};

    formData.forEach((value, key) => {
        result[key] = value;
    });

    return result as T;
}

export function setCookie(
    name: string,
    value: string | null,
    props: CookieProps = {},
) {
    let exp = props.expires;

    if (typeof exp === "number" && exp) {
        const d = new Date();
        d.setTime(d.getTime() + exp * 1000);
        exp = props.expires = d;
    }

    if (exp instanceof Date && !isNaN(exp.getTime())) {
        props.expires = exp.toUTCString();
    }

    if (value) value = encodeURIComponent(value);
    let updateCookie = `${name}=${value}`;

    for (const propsName in props) {
        updateCookie += `; ${propsName}`;
        const propValue = props[propsName as keyof CookieProps];

        if (propValue !== true) {
            updateCookie += `=${propValue}`;
        }
    }

    document.cookie = updateCookie;
}

export function getCookie(name: string) {
    const matches = document.cookie.match(
        new RegExp(
            "(?:^|; )" +
                name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
                "=([^;]*)",
        ),
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(name: string) {
    setCookie(name, null, { expires: -1 });
}
