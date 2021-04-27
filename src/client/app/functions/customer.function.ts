import { ICustomerSearchConditions } from '../models/customer/search';


/**
 * 入力データを検索条件へ変換
 */
export function input2CustomerSearchCondition(params: {
    input: ICustomerSearchConditions;
    page?: number;
    limit?: number;
}) {
    const input = params.input;
    const page = params.page;
    const limit = params.limit;
    const result: {
        limit?: number;
        page?: number;
        name?: {
            $regex?: string;
        };
    } = {
        name: (input.name === '') ? undefined : { $regex: input.name },
        limit,
        page,
    };
    return result;
}
