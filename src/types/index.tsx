export type ItemType = {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
};

export type ApiStateType<T = unknown> = {
    isLoading: boolean;
    hasError: boolean;
    data: T;
};

export type ApiResponseDataType<T = unknown> = {
    data: T;
    success: string;
};
