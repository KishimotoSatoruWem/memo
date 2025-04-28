/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * ユーザID、メモ本文、背景色IDをもつクラス
 */
export type Memo = {
    /**
     * id
     */
    id?: number;
    /**
     * ユーザID
     */
    user_id: number;
    /**
     * メモ本文
     */
    body: string;
    /**
     * 背景色ID
     */
    bg_color_id: number;
    /**
     * created_at
     */
    created_at?: string;
    /**
     * updated_at
     */
    updated_at?: string;
    /**
     * メモ本文省略版
     */
    body_limit: string;
};

