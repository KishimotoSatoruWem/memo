/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Memo } from '../models/Memo';
import type { StoreMemo } from '../models/StoreMemo';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class MemosService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * メモリスト取得
     * メモリストを絞り込みなしで取得します。
     * @param cacheControl
     * @returns Memo メモリストを正常に取得しました。
     * @throws ApiError
     */
    public listupMemos(
        cacheControl?: string,
    ): CancelablePromise<Array<Memo>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/memos',
            headers: {
                'Cache-Control': cacheControl,
            },
        });
    }
    /**
     * メモ登録
     * メモを登録し登録後のメモを取得します。
     * @param cacheControl
     * @param requestBody StoreMemo
     * @returns Memo メモを正常に登録しました。
     * @throws ApiError
     */
    public createMemo(
        cacheControl?: string,
        requestBody?: StoreMemo,
    ): CancelablePromise<Memo> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/memos',
            headers: {
                'Cache-Control': cacheControl,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * メモ削除
     * メモを削除します。
     * @param id
     * @returns any メモを正常に削除しました。
     * @throws ApiError
     */
    public deleteMemo(
        id: number,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/memos/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `削除対象のメモが存在しません。`,
            },
        });
    }
    /**
     * メモ更新
     * メモを更新し更新後のメモを取得します。
     * @param id
     * @param requestBody StoreMemo
     * @returns Memo メモを正常に更新しました。
     * @throws ApiError
     */
    public updateMemo(
        id: number,
        requestBody?: StoreMemo,
    ): CancelablePromise<Array<Memo>> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/memos/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `更新対象のメモが存在しません。`,
            },
        });
    }
    /**
     * メモの検索
     * メモリストを検索ワードで絞り込みして取得します。
     * @param cacheControl
     * @returns Memo メモリストを正常に取得しました。
     * @throws ApiError
     */
    public searchMemos(
        word: string,
        cacheControl?: string,
    ): CancelablePromise<Array<Memo>> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/memos/search',
            headers: {
                'Cache-Control': cacheControl,
            },
            body: {word: word},
            mediaType: 'application/json',
        });
    }
}
