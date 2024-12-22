export function checkResponse(response: Response) {
    if (response.ok) {
        return response.json();
    }

    return Promise.reject(`Ошибка ${response.status}`);
}
